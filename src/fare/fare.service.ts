import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { FareRepository } from './fare.repository';
import { Seat } from '../flight/entities/seat.entity';
import { CreateSeatDto } from '../flight/dto/create-seat.dto';
import { UpdateFareDto } from './dto/update-fare.dto';
import { Fare } from './entities/fare.entity';
import logger from '../utils/logger.util';
import { MESSAGES } from '../constants/message-constants';
import { FlightService } from '../flight/flight.service';

@Injectable()
export class FareService {
  constructor(private fareRepository: FareRepository, private flightService: FlightService) { }

  async validateFlight(flightId: number): Promise<boolean> {
    try {
      const flight = await this.flightService.findOne(flightId);
      return !!flight;
    } catch (error) {
      return false;
    }
  }

  async findAll(flightId?: number): Promise<Seat[]> {
    try {
      if (flightId) {
        const isFlightValid = await this.validateFlight(flightId);
        if (!isFlightValid) {
          throw new HttpException(MESSAGES.FLIGHT.NOT_FOUND.replace('{id}', flightId.toString()), HttpStatus.NOT_FOUND);
        }
      }
      return await this.fareRepository.findAll({ flightId: flightId });
    } catch (error) {
      logger.error(MESSAGES.FARE.FETCH_FAILURE, { error });
      throw error;
    }
  }

  async findOne(id: number): Promise<Fare> {
    try {
      return await this.fareRepository.findOne(id) as Fare;
    } catch (error) {
      logger.error(MESSAGES.FARE.FETCH_ONE_FAILURE, { id, error });
      throw error;
    }
  }

  async create(createSeatDto: CreateSeatDto): Promise<Seat> {
    try {
      const flight = await this.flightService.findOne(createSeatDto.flightId);
      if (!flight) {
        throw new HttpException(MESSAGES.FLIGHT.NOT_FOUND.replace('{id}', createSeatDto.flightId.toString()), HttpStatus.NOT_FOUND);
      }
      return await this.fareRepository.create(createSeatDto);
    } catch (error) {
      logger.error(MESSAGES.FARE.CREATE_FAILURE, { error });
      throw error;
    }
  }

  async update(id: number, updateFareDto: UpdateFareDto): Promise<Fare> {
    const fare = await this.findOne(id);
    if (!fare) {
      throw new HttpException(MESSAGES.FARE.NOT_FOUND.replace('{id}', id.toString()), HttpStatus.NOT_FOUND);
    }
    Object.assign(fare, updateFareDto);
    return fare.save();
  }

  async remove(id: number): Promise<void> {
    const fare = await this.findOne(id);
    if (!fare) {
      throw new HttpException(MESSAGES.FARE.NOT_FOUND.replace('{id}', id.toString()), HttpStatus.NOT_FOUND);
    }
    await fare.destroy();
  }
}
