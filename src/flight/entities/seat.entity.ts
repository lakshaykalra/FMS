import { Table, Column, Model, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

import { Flight } from './flight.entity';
import { SeatType } from '../../constants/enums/seat-type.enum';
import { DataTypes } from 'sequelize';

@Table({
  timestamps: true, // Automatically adds createdAt and updatedAt columns
})
export class Seat extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Flight)
  @Column
  flightId: number;

  @Column
  seatNumber: string;

  @Column({
    type: DataTypes.ENUM,
    values: Object.values(SeatType),
  })
  seatType: SeatType;

  @Column
  price: number;
}
