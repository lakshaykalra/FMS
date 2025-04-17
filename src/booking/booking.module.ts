import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingRepository } from './booking.repository';
import { Booking } from './entities/booking.entity';

@Module({
  imports: [SequelizeModule.forFeature([Booking])],
  providers: [BookingService, BookingRepository],
  controllers: [BookingController],
})
export class BookingModule {}
