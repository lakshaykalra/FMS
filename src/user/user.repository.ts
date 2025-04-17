import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { plainToClass } from 'class-transformer';
import { WhereOptions } from 'sequelize';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = plainToClass(User, createUserDto);
    return this.userModel.create(user.get({ plain: true }));
  }

  async findAll({ limit, offset, where = {}, attributes }: { limit: number; offset: number; where?: WhereOptions<User>; attributes?: string[] }): Promise<User[]> {
    return this.userModel.findAll({ limit, offset, where, attributes });
  }

  async findOne({ id, attributes }: { id: number; attributes?: string[] }): Promise<User> {
    return this.userModel.findByPk(id, { attributes });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }
}
