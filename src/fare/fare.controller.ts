import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

import { FareService } from './fare.service';
import { CreateSeatDto } from '../flight/dto/create-seat.dto';
import { successResponse, failureResponse } from '../utils/response.util';
import { MESSAGES } from '../constants/message-constants';
import logger from '../utils/logger.util';
import { UpdateFareDto } from './dto/update-fare.dto';

@ApiTags('Fare')
@Controller('fare')
export class FareController {
  constructor(private readonly fareService: FareService) {}

  @ApiOperation({ summary: 'Create a new seat' })
  @ApiBody({ type: CreateSeatDto })
  @Post()
  async create(@Body() createSeatDto: CreateSeatDto): Promise<any> {
    try {
      const seat = await this.fareService.create(createSeatDto);
      logger.info(MESSAGES.FARE.CREATE_SUCCESS, { seat });
      return successResponse(seat, MESSAGES.FARE.CREATE_SUCCESS);
    } catch (error) {
      const statusCode = error.status || 500;
      logger.error('Error creating seat', { error });
      return failureResponse(MESSAGES.FARE.CREATE_FAILURE, statusCode, error);
    }
  }

  @ApiOperation({ summary: 'Get all fares' })
  @Get()
  async findAll(@Query('flightId') flightId: number): Promise<any> {
    try {
      const fares = await this.fareService.findAll(flightId);
      logger.info(MESSAGES.FARE.FETCH_SUCCESS, { fares });
      return successResponse(fares, MESSAGES.FARE.FETCH_SUCCESS);
    } catch (error) {
      const statusCode = error.status || 500;
      logger.error('Error fetching fares', { error });
      return failureResponse(MESSAGES.FARE.FETCH_FAILURE, statusCode, error);
    }
  }

  @ApiOperation({ summary: 'Get a fare by ID' })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    try {
      const fare = await this.fareService.findOne(id);
      return successResponse(fare, MESSAGES.FARE.FETCH_ONE_SUCCESS);
    } catch (error) {
      const statusCode = error.status || 500;
      logger.error(MESSAGES.FARE.FETCH_ONE_FAILURE, { id, error });
      return failureResponse(MESSAGES.FARE.FETCH_ONE_FAILURE, statusCode, error);
    }
  }

  @ApiOperation({ summary: 'Update a fare by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateFareDto })
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateFareDto: UpdateFareDto): Promise<any> {
    try {
      const updatedFare = await this.fareService.update(id, updateFareDto);
      return successResponse(updatedFare, MESSAGES.FARE.UPDATE_SUCCESS);
    } catch (error) {
      const statusCode = error.status || 500;
      logger.error(MESSAGES.FARE.UPDATE_FAILURE, { id, error });
      return failureResponse(MESSAGES.FARE.UPDATE_FAILURE, statusCode, error);
    }
  }

  @ApiOperation({ summary: 'Delete a fare by ID' })
  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    try {
      await this.fareService.remove(id);
      return successResponse(null, MESSAGES.FARE.DELETE_SUCCESS);
    } catch (error) {
      const statusCode = error.status || 500;
      logger.error(MESSAGES.FARE.DELETE_FAILURE, { id, error });
      return failureResponse(MESSAGES.FARE.DELETE_FAILURE, statusCode, error);
    }
  }
}
