import { Injectable, HttpException, HttpStatus } from '@nestjs/common';


import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';
import { Seat } from '../flight/entities/seat.entity';
import { User } from '../user/entities/user.entity';
import { Flight } from '../flight/entities/flight.entity';
import { Op } from 'sequelize';
import { GetAllBookingsDto } from './dto/get-all-bookings.dto';
import { CancelBookingDto } from './dto/cancel-booking.dto';
import { MESSAGES } from '../constants/message-constants';

@Injectable()
export class BookingService {
  constructor(private bookingRepository: BookingRepository) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { userId, flightId, seats } = createBookingDto;

    // Start a transaction using the repository method
    const transaction = await this.bookingRepository.startTransaction();
    try {
      // Validate user
      const user = await User.findByPk(userId);
      if (!user) {
        throw new HttpException(MESSAGES.BOOKING.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      // Validate flight
      const flight = await Flight.findByPk(flightId);
      if (!flight) {
        throw new HttpException(MESSAGES.BOOKING.FLIGHT_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      // Validate and lock seats
      const seatEntities = await Seat.findAll({
        where: { id: seats, flightId },
        lock: transaction.LOCK.UPDATE, // Apply row-level lock
        transaction,
      });
      if (seatEntities.length !== seats.length) {
        throw new HttpException(MESSAGES.BOOKING.SEATS_INVALID, HttpStatus.BAD_REQUEST);
      }

      // Re-check seat availability after acquiring the lock
      const alreadyBookedSeats = await Booking.findAll({
        where: {
          flightId,
          seats: { [Op.overlap]: seats },
        },
        lock: transaction.LOCK.UPDATE, // Apply row-level lock
        transaction,
      });
      if (alreadyBookedSeats.length > 0) {
        throw new HttpException(MESSAGES.BOOKING.SEATS_ALREADY_BOOKED, HttpStatus.CONFLICT);
      }

      // Calculate price based on seats
      const totalPrice = seatEntities.reduce((sum, seat) => sum + seat.price, 0); // Sum up seat prices

      // Create booking
      const booking = await this.bookingRepository.create({
        userId,
        flightId,
        seats,
        pricePaid: totalPrice, // Set the calculated price
      });

      // Commit the transaction
      await transaction.commit();
      return booking;
    } catch (error) {
      // Rollback the transaction in case of error
      await transaction.rollback();
      throw error;
    }
  }

  async findAll(query: GetAllBookingsDto): Promise<Booking[]> {
    const { userId, limit, offset } = query;
    const whereClause = userId ? { userId } : {};
    try {
      return this.bookingRepository.findAll({
        where: whereClause,
        limit,
        offset,
        include: [
          { model: Flight, as: 'flight' },
        ],
      });
    } catch (error) {
      throw new HttpException(MESSAGES.BOOKING.FETCH_FAILURE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne(id);
    if (!booking) {
      throw new HttpException(MESSAGES.BOOKING.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return booking;
  }

  async cancelBooking(cancelBookingDto: CancelBookingDto): Promise<Booking> {
    const { userId, bookingId } = cancelBookingDto;

    // Validate booking
    const booking = await this.findOne(bookingId);
    if (!booking) {
      throw new HttpException(MESSAGES.BOOKING.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    // Validate user
    if (booking.userId !== userId) {
      throw new HttpException(MESSAGES.BOOKING.UNAUTHORIZED, HttpStatus.FORBIDDEN);
    }

    // Check if already canceled
    if (booking.status === 'canceled') {
      throw new HttpException(MESSAGES.BOOKING.ALREADY_CANCELED, HttpStatus.BAD_REQUEST);
    }

    // Update status to canceled
    booking.status = 'canceled';
    await booking.save();

    return booking;
  }
}
