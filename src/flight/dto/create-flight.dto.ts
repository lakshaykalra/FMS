import { IsString, IsDate, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import { FlightStatus } from '../../constants/enums/flight-status.enum';

export class CreateFlightDto {
  @ApiProperty({ description: 'Origin of the flight' })
  @IsString()
  origin: string;

  @ApiProperty({ description: 'Destination of the flight' })
  @IsString()
  destination: string;

  @ApiProperty({ description: 'Departure time of the flight' })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  departureTime: Date;

  @ApiProperty({ description: 'Number of economy seats available' })
  @IsNumber()
  economySeats: number;

  @ApiProperty({ description: 'Number of business seats available' })
  @IsNumber()
  businessSeats: number;

  @ApiProperty({ description: 'Number of first-class seats available' })
  @IsNumber()
  firstClassSeats: number;

  @ApiProperty({
    description: 'Status of the flight',
    enum: FlightStatus,
    required: false,
    default: FlightStatus.ON_TIME,
  })
  @IsOptional()
  @IsEnum(FlightStatus)
  status?: FlightStatus;
}
