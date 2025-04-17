import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Seat } from '../flight/entities/seat.entity';
import { CreateSeatDto } from '../flight/dto/create-seat.dto';
import { plainToClass } from 'class-transformer';
import { Fare } from './entities/fare.entity';

@Injectable()
export class FareRepository {
  constructor(@InjectModel(Seat) private seatModel: typeof Seat) {}

  async findAll(filter?: { flightId?: number }): Promise<Seat[]> {
    const whereClause = filter?.flightId ? { where: { flightId: filter.flightId } } : {};
    return this.seatModel.findAll(whereClause);
  }

  async findOne(id: number): Promise<Fare> {
    return this.seatModel.findByPk(id) as unknown as Fare;
  }

  async create(createSeatDto: CreateSeatDto): Promise<Seat> {
    const seat = plainToClass(Seat, createSeatDto);
    return this.seatModel.create(seat.get({ plain: true }));
  }
}
