import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { FlightRepository } from './flight.repository';
import { Flight } from './entities/flight.entity';
import { Seat } from './entities/seat.entity';

@Module({
  imports: [SequelizeModule.forFeature([Flight, Seat])],
  providers: [FlightService, FlightRepository],
  controllers: [FlightController],
  exports:[FlightService],
})
export class FlightModule {}
