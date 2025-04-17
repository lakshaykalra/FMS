import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { FlightRepository } from './flight.repository';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Flight } from './entities/flight.entity';
import { Op } from 'sequelize';
import { Seat } from './entities/seat.entity';
import logger from '../utils/logger.util';
import { MESSAGES } from '../constants/message-constants';

export interface FlightFilter {
  origin?: string;
  destination?: string;
  date?: string;
  minPrice?: number;
  maxPrice?: number;
}

@Injectable()
export class FlightService {
  constructor(private flightRepository: FlightRepository) {}

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    try {
      return await this.flightRepository.create(createFlightDto);
    } catch (error) {
      logger.error(MESSAGES.FLIGHT.CREATE_FAILURE, { error });
      throw error;
    }
  }

  async findAll(
    filters: FlightFilter,
    limit: number = 50,
    offset: number = 0
  ): Promise<{ flights: Flight[]; minPrice: number; maxPrice: number }> {
    try {
      const where: any = {};

      if (filters.origin) {
        where.origin = filters.origin;
      }

      if (filters.destination) {
        where.destination = filters.destination;
      }

      if (filters.date) {
        const startOfDay = new Date(filters.date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(filters.date);
        endOfDay.setHours(23, 59, 59, 999);

        where.departureTime = {
          [Op.between]: [startOfDay, endOfDay],
        };
      }

      const priceFilter: any = {};
      if (filters.minPrice) {
        priceFilter[Op.gte] = filters.minPrice;
      }
      if (filters.maxPrice) {
        priceFilter[Op.lte] = filters.maxPrice;
      }

      if (Object.keys(priceFilter).length > 0) {
        where['$seats.price$'] = priceFilter;
      }

      const flights = await this.flightRepository.findAll({
        where,
        include: [{ model: Seat }],
        limit,
        offset,
      });
      return { flights, minPrice: 0, maxPrice: 0 }; // Placeholder for minPrice and maxPrice
    } catch (error) {
      logger.error(MESSAGES.FLIGHT.FETCH_FAILURE, { error });
      throw error;
    }
  }

  async findOne(id: number): Promise<Flight> {
    try {
      return await this.flightRepository.findOne(id);
    } catch (error) {
      logger.error(MESSAGES.FLIGHT.FETCH_ONE_FAILURE, { id, error });
      throw error;
    }
  }

  async update(id: number, updateFlightDto: UpdateFlightDto): Promise<Flight> {
    const flight = await this.findOne(id);
    if (!flight) {
      throw new HttpException(MESSAGES.FLIGHT.NOT_FOUND.replace('{id}', id.toString()), HttpStatus.NOT_FOUND);
    }
    Object.assign(flight, updateFlightDto);
    return flight.save();
  }

  async remove(id: number): Promise<void> {
    const flight = await this.findOne(id);
    if (!flight) {
      throw new HttpException(MESSAGES.FLIGHT.NOT_FOUND.replace('{id}', id.toString()), HttpStatus.NOT_FOUND);
    }
    await flight.destroy();
  }
}
