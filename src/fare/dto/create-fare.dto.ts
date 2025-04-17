import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { SeatType } from '../../constants/enums/seat-type.enum';

export class CreateFareDto {
  @ApiProperty({ description: 'ID of the flight associated with the fare' })
  @IsNumber()
  flightId: number;

  @ApiProperty({ description: 'Class of the seat for the fare', enum: SeatType })
  @IsString()
  seatClass: SeatType;

  @ApiProperty({ description: 'Price of the fare' })
  @IsNumber()
  price: number;
}
