import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';


import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { GetAllBookingsDto } from './dto/get-all-bookings.dto';
import { CancelBookingDto } from './dto/cancel-booking.dto';
import { successResponse, failureResponse } from '../utils/response.util';
import { MESSAGES } from '../constants/message-constants';
import logger from '../utils/logger.util';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @ApiOperation({ summary: 'Create a new booking' })
  @ApiBody({ type: CreateBookingDto })
  @Post()
  async create(@Body() createBookingDto: CreateBookingDto): Promise<any> {
    try {
      const booking = await this.bookingService.create(createBookingDto);
      logger.info(MESSAGES.BOOKING.CREATE_SUCCESS, { booking });
      return successResponse(booking, MESSAGES.BOOKING.CREATE_SUCCESS);
    } catch (error) {
      const statusCode = error.status || 500;
      logger.error(MESSAGES.BOOKING.CREATE_FAILURE, { error });
      return failureResponse(MESSAGES.BOOKING.CREATE_FAILURE, statusCode, error);
    }
  }

  @ApiOperation({ summary: 'Get all bookings' })
  @Get()
  async findAll(@Query() query: GetAllBookingsDto): Promise<any> {
    try {
      const bookings = await this.bookingService.findAll(query);
      logger.info(MESSAGES.BOOKING.FETCH_SUCCESS, { query, bookings });
      return successResponse(bookings, MESSAGES.BOOKING.FETCH_SUCCESS);
    } catch (error) {
      const statusCode = error.status || 500;
      logger.error(MESSAGES.BOOKING.FETCH_FAILURE, { query, error });
      return failureResponse(MESSAGES.BOOKING.FETCH_FAILURE, statusCode, error);
    }
  }

  @ApiOperation({ summary: 'Cancel a booking by ID' })
  @ApiBody({ type: CancelBookingDto })
  @Put('cancel')
  async cancelBooking(@Body() cancelBookingDto: CancelBookingDto): Promise<any> {
    try {
      const booking = await this.bookingService.cancelBooking(cancelBookingDto);
      logger.info(MESSAGES.BOOKING.CANCEL_SUCCESS, { cancelBookingDto, booking });
      return successResponse(booking, MESSAGES.BOOKING.CANCEL_SUCCESS);
    } catch (error) {
      const statusCode = error.status || 500;
      logger.error(MESSAGES.BOOKING.CANCEL_FAILURE, { cancelBookingDto, error });
      return failureResponse(MESSAGES.BOOKING.CANCEL_FAILURE, statusCode, error);
    }
  }
}
