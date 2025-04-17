import { Table, Column, Model, ForeignKey, PrimaryKey, AutoIncrement, BelongsTo, DataType } from 'sequelize-typescript';


import { User } from '../../user/entities/user.entity';
import { Flight } from '../../flight/entities/flight.entity';

@Table({
  timestamps: true, // Automatically adds createdAt and updatedAt columns
})
export class Booking extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Flight)
  @Column
  flightId: number;

  @BelongsTo(() => Flight)
  flight: Flight;

  @Column
  pricePaid: number;

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: false,
  })
  seats: number[];

  @Column({
    type: DataType.ENUM('pending', 'confirmed', 'canceled'),
    allowNull: false,
    defaultValue: 'pending',
  })
  status: 'pending' | 'confirmed' | 'canceled';
}
