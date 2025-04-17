import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CancelBookingDto {
  @ApiProperty({ description: 'ID of the user making the cancellation' })
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  userId: number;

  @ApiProperty({ description: 'ID of the booking to cancel' })
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  bookingId: number;
}