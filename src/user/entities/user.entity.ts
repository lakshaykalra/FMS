import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

import { UserStatus } from '../../constants/enums/user-status.enum';

@Table({
  timestamps: true, // Automatically adds createdAt and updatedAt columns
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({
    type: DataTypes.ENUM,
    values: Object.values(UserStatus),
    defaultValue: UserStatus.ACTIVE,
  })
  status: UserStatus;
}
