import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAllBookingsDto {
  @ApiProperty({ description: 'ID of the user to fetch bookings for', required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  userId?: number;

  @ApiProperty({ description: 'Number of records to fetch', default: 50 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limit?: number = 50;

  @ApiProperty({ description: 'Number of records to skip', default: 0 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  offset?: number = 0;
}
