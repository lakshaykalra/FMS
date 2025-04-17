import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Flight } from './entities/flight.entity';
import { CreateFlightDto } from './dto/create-flight.dto';
import { plainToClass } from 'class-transformer';
import { Op } from 'sequelize';
import { Seat } from './entities/seat.entity';
import { Sequelize } from 'sequelize';

export interface FlightFilter {
  origin?: string;
  destination?: string;
  date?: string;
  minPrice?: number;
  maxPrice?: number;
}

@Injectable()
export class FlightRepository {
  constructor(@InjectModel(Flight) private flightModel: typeof Flight) {}

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    const flight = plainToClass(Flight, createFlightDto);
    return this.flightModel.create(flight.get({ plain: true }));
  }

  async findAll(filters: any): Promise<Flight[]> {
    const { where, include } = filters;
    return this.flightModel.findAll({ where, include });
  }

  async findOne(id: number): Promise<Flight> {
    return this.flightModel.findOne({
      where: { id },
      include: [{ model: Seat }],
    });
  }

  async getMinPrice(filters: FlightFilter): Promise<number> {
    const where: any = this.buildWhereClause(filters);
    const result = await this.flightModel.findOne({
      attributes: [[Sequelize.fn('MIN', Sequelize.col('price')), 'minPrice']],
      where,
      include: [{ model: Seat }],
    });
    return Number(result?.get('minPrice')) || 0;
  }

  async getMaxPrice(filters: FlightFilter): Promise<number> {
    const where: any = this.buildWhereClause(filters);
    const result = await this.flightModel.findOne({
      attributes: [[Sequelize.fn('MAX', Sequelize.col('price')), 'maxPrice']],
      where,
      include: [{ model: Seat }],
    });
    return Number(result?.get('maxPrice')) || 0;
  }

  private buildWhereClause(filters: FlightFilter): any {
    const where: any = {};
    if (filters.origin) where.origin = filters.origin;
    if (filters.destination) where.destination = filters.destination;
    if (filters.date) where.departureTime = { [Op.eq]: new Date(filters.date) };
    return where;
  }
}
