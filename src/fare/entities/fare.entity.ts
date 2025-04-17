import { Table, Column, Model, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

import { Flight } from '../../flight/entities/flight.entity';

@Table({
  timestamps: true, // Automatically adds createdAt and updatedAt columns
})
export class Fare extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Flight)
  @Column
  flightId: number;

  @Column({
    allowNull: false,
  })
  seatClass: string;

  @Column({
    allowNull: false,
  })
  price: number;
}
