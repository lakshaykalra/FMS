import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

import { FlightService, FlightFilter } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { GetFlightsDto } from './dto/get-flights.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { successResponse, failureResponse } from '../utils/response.util';
import { MESSAGES } from '../constants/message-constants';
import logger from '../utils/logger.util';

@ApiTags('Flight')
@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @ApiOperation({ summary: 'Create a new flight' })
  @ApiBody({ type: CreateFlightDto })
  @Post()
  async create(@Body() createFlightDto: CreateFlightDto): Promise<any> {
    try {
      const flight = await this.flightService.create(createFlightDto);
      return successResponse(flight, MESSAGES.FLIGHT.CREATE_SUCCESS);
    } catch (error) {
      logger.error(MESSAGES.FLIGHT.CREATE_FAILURE, { error });
      const statusCode = error.status || 500;
      return failureResponse(MESSAGES.FLIGHT.CREATE_FAILURE, statusCode, error);
    }
  }

  @ApiOperation({ summary: 'Get all flights' })
  @Get()
  async findAll(@Query() query: GetFlightsDto): Promise<any> {
    try {
      const filters: FlightFilter = {
        origin: query.origin,
        destination: query.destination,
        date: query.date,
        minPrice: query.minPrice,
        maxPrice: query.maxPrice,
      };

      const result = await this.flightService.findAll(filters, query.limit, query.offset);
      return successResponse(result, MESSAGES.FLIGHT.FETCH_SUCCESS);
    } catch (error) {
      logger.error(MESSAGES.FLIGHT.FETCH_FAILURE, { error });
      const statusCode = error.status || 500;
      return failureResponse(MESSAGES.FLIGHT.FETCH_FAILURE, statusCode, error);
    }
  }

  @ApiOperation({ summary: 'Get a flight by ID' })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    try {
      const flight = await this.flightService.findOne(id);
      return successResponse(flight, MESSAGES.FLIGHT.FETCH_ONE_SUCCESS);
    } catch (error) {
      logger.error(MESSAGES.FLIGHT.FETCH_ONE_FAILURE, { id, error });
      const statusCode = error.status || 500;
      return failureResponse(MESSAGES.FLIGHT.FETCH_ONE_FAILURE, statusCode, error);
    }
  }

  @ApiOperation({ summary: 'Update a flight by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateFlightDto })
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateFlightDto: UpdateFlightDto): Promise<any> {
    try {
      const updatedFlight = await this.flightService.update(id, updateFlightDto);
      return successResponse(updatedFlight, MESSAGES.FLIGHT.UPDATE_SUCCESS);
    } catch (error) {
      logger.error(MESSAGES.FLIGHT.UPDATE_FAILURE, { id, error });
      const statusCode = error.status || 500;
      return failureResponse(MESSAGES.FLIGHT.UPDATE_FAILURE, statusCode, error);
    }
  }

  @ApiOperation({ summary: 'Delete a flight by ID' })
  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    try {
      await this.flightService.remove(id);
      return successResponse(null, MESSAGES.FLIGHT.DELETE_SUCCESS);
    } catch (error) {
      logger.error(MESSAGES.FLIGHT.DELETE_FAILURE, { id, error });
      const statusCode = error.status || 500;
      return failureResponse(MESSAGES.FLIGHT.DELETE_FAILURE, statusCode, error);
    }
  }
}
