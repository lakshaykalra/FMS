import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserStatus } from 'src/constants/enums/user-status.enum';
import { MESSAGES } from '../constants/message-constants';
import logger from '../utils/logger.util';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Check for email duplication
      const existingUser = await this.userRepository.findByEmail(createUserDto.email);
      if (existingUser) {
        logger.error(MESSAGES.USER.CREATE_FAILURE_DUPLICATE_EMAIL);
        throw new HttpException(MESSAGES.USER.CREATE_FAILURE_DUPLICATE_EMAIL, HttpStatus.BAD_REQUEST);
      }

      const salt = await bcrypt.genSalt();
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
      return await this.userRepository.create(createUserDto);
    } catch (error) {
      logger.error(MESSAGES.USER.CREATE_FAILURE, error);
      throw error;
    }
  }

  async findAll({ limit, offset }: { limit: number; offset: number }): Promise<User[]> {
    try {
      const where = {
        status: UserStatus.ACTIVE
      };
      return await this.userRepository.findAll({
        limit,
        offset,
        where,
        attributes: ['id', 'name', 'email', 'status'] // Explicitly include fields to exclude password
      });
    } catch (error) {
      logger.error(MESSAGES.USER.FETCH_FAILURE, error);
      throw error;
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOne({
        id,
        attributes: ['id', 'name', 'email', 'status'] // Explicitly include fields to exclude password
      });
    } catch (error) {
      logger.error(`${MESSAGES.USER.FETCH_ONE_FAILURE} ID: ${id}`, error);
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      logger.error(`${MESSAGES.USER.UPDATE_FAILURE} ID: ${id}`);
      throw new HttpException(`${MESSAGES.USER.UPDATE_FAILURE} ID: ${id}`, HttpStatus.NOT_FOUND);
    }

    if (updateUserDto.email) {
      const existingUser = await this.userRepository.findByEmail(updateUserDto.email);
      if (existingUser && existingUser.id !== id) {
        logger.error(MESSAGES.USER.UPDATE_FAILURE_DUPLICATE_EMAIL);
        throw new HttpException(MESSAGES.USER.UPDATE_FAILURE_DUPLICATE_EMAIL, HttpStatus.BAD_REQUEST);
      }
    }

    Object.assign(user, updateUserDto);
    return user.save();
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      logger.error(`${MESSAGES.USER.DELETE_FAILURE} ID: ${id}`);
      throw new HttpException(`${MESSAGES.USER.DELETE_FAILURE} ID: ${id}`, HttpStatus.NOT_FOUND);
    }
    await user.destroy();
  }
}
