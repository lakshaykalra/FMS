import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';


import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingRepository {
  constructor(@InjectModel(Booking) private bookingModel: typeof Booking) {}

  async create(createBookingDto: CreateBookingDto & { pricePaid: number }): Promise<Booking> {
    const { userId, flightId, seats, pricePaid } = createBookingDto; // Include pricePaid
    const booking = await this.bookingModel.create({
      userId,
      flightId,
      seats,
      pricePaid, // Set the pricePaid field
    });
    return booking;
  }

  async findAll(options?: { where?: any; limit?: number; offset?: number; include?: any[] }): Promise<Booking[]> {
    return this.bookingModel.findAll(options);
  }

  async findOne(id: number): Promise<Booking> {
    return this.bookingModel.findByPk(id);
  }

  async startTransaction() {
    return this.bookingModel.sequelize.transaction();
  }
}
