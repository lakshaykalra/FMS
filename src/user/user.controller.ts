import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { DEFAULT_USER_LIMIT } from '../constants/app.constants';
import { successResponse, failureResponse } from '../utils/response.util';
import { MESSAGES } from '../constants/message-constants';
import logger from '../utils/logger.util';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.userService.create(createUserDto);
      logger.info(MESSAGES.USER.CREATE_SUCCESS, { user });
      return successResponse(user, MESSAGES.USER.CREATE_SUCCESS);
    } catch (error) {
      const statusCode = error.status || 500;
      logger.error(MESSAGES.USER.CREATE_FAILURE, { error });
      return failureResponse(MESSAGES.USER.CREATE_FAILURE, statusCode, error);
    }
  }

  @ApiOperation({ summary: 'Get all users with optional limit and offset' })
  @Get()
  async findAll(@Query() query: GetUsersDto): Promise<any> {
    try {
      const limit = query.limit || DEFAULT_USER_LIMIT;
      const offset = query.offset || 0;
      const users = await this.userService.findAll({ limit, offset });
      logger.info(MESSAGES.USER.FETCH_SUCCESS, { limit, offset, users });
      return successResponse(users, MESSAGES.USER.FETCH_SUCCESS);
    } catch (error) {
      const statusCode = error.status || 500;
      logger.error(MESSAGES.USER.FETCH_FAILURE, { error });
      return failureResponse(MESSAGES.USER.FETCH_FAILURE, statusCode, error);
    }
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    try {
      const user = await this.userService.findOne(id);
      logger.info(`${MESSAGES.USER.FETCH_ONE_SUCCESS} with ID ${id}`, { user });
      return successResponse(user, MESSAGES.USER.FETCH_ONE_SUCCESS);
    } catch (error) {
      const statusCode = error.status || 500;
      logger.error(`${MESSAGES.USER.FETCH_ONE_FAILURE} with ID ${id}`, { error });
      return failureResponse(MESSAGES.USER.FETCH_ONE_FAILURE, statusCode, error);
    }
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateUserDto })
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const updatedUser = await this.userService.update(id, updateUserDto);
      logger.info(`${MESSAGES.USER.UPDATE_SUCCESS} with ID ${id}`, { updatedUser });
      return successResponse(updatedUser, MESSAGES.USER.UPDATE_SUCCESS);
    } catch (error) {
      const statusCode = error.status || 500;
      logger.error(`${MESSAGES.USER.UPDATE_FAILURE} with ID ${id}`, { error });
      return failureResponse(MESSAGES.USER.UPDATE_FAILURE, statusCode, error);
    }
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    try {
      await this.userService.remove(id);
      logger.info(`${MESSAGES.USER.DELETE_SUCCESS} with ID ${id}`);
      return successResponse(null, MESSAGES.USER.DELETE_SUCCESS);
    } catch (error) {
      const statusCode = error.status || 500;
      logger.error(`${MESSAGES.USER.DELETE_FAILURE} with ID ${id}`, { error });
      return failureResponse(MESSAGES.USER.DELETE_FAILURE, statusCode, error);
    }
  }
}
