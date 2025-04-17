import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class GetFlightsDto {
  @ApiProperty({ description: 'Origin of the flight', required: true })
  @IsString()
  origin?: string;

  @ApiProperty({ description: 'Destination of the flight', required: true })
  @IsString()
  destination?: string;

  @ApiProperty({ description: 'Date of the flight', required: true })
  @IsString()
  date?: string;

  @ApiProperty({ description: 'Minimum price of the flight', required: false })
  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @ApiProperty({ description: 'Maximum price of the flight', required: false })
  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @ApiProperty({ description: 'Limit for pagination', required: false, default: 50 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  limit: number = 50;

  @ApiProperty({ description: 'Offset for pagination', required: false, default: 0 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  offset: number = 0;
}
