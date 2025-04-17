import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';


import { Seat } from './seat.entity';
import { HasMany } from 'sequelize-typescript';
import { FlightStatus } from '../../constants/enums/flight-status.enum';

@Table({
  timestamps: true, // Automatically adds createdAt and updatedAt columns
})
export class Flight extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  origin: string;

  @Column
  destination: string;

  @Column
  departureTime: Date;

  @Column({
    type: DataTypes.ENUM,
    values: Object.values(FlightStatus),
    defaultValue: FlightStatus.ON_TIME,
  })
  status: FlightStatus;

  @Column
  economySeats: number;

  @Column
  businessSeats: number;

  @Column
  firstClassSeats: number;

  @HasMany(() => Seat)
  seats: Seat[];
}
