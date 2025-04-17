import { IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ description: 'ID of the user making the booking' })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'ID of the flight being booked' })
  @IsNumber()
  flightId: number;

  @ApiProperty({ description: 'Array of seat IDs being booked' })
  @IsArray()
  @IsNumber({}, { each: true })
  seats: number[];
}
