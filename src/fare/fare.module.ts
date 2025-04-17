import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { FareService } from './fare.service';
import { FareController } from './fare.controller';
import { FareRepository } from './fare.repository';
import { Seat } from '../flight/entities/seat.entity';
import { FlightModule } from '../flight/flight.module';

@Module({
  imports: [SequelizeModule.forFeature([Seat]), FlightModule],
  providers: [FareService, FareRepository],
  controllers: [FareController],
})
export class FareModule {}
