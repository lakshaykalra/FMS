import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { SeatType } from '../../constants/enums/seat-type.enum';

export class CreateSeatDto {
  @ApiProperty({ description: 'ID of the flight associated with the seat' })
  @IsNumber()
  flightId: number;

  @ApiProperty({ description: 'Seat number' })
  @IsString()
  seatNumber: string;

  @ApiProperty({ description: 'Type of the seat (economy, business, first class)', enum: SeatType })
  @IsString()
  seatType: SeatType;

  @ApiProperty({ description: 'Price of the seat' })
  @IsNumber()
  price: number;
}
