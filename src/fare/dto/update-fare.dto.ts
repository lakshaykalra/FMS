import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { SeatType } from '../../constants/enums/seat-type.enum';

export class UpdateFareDto {
  @ApiPropertyOptional({ description: 'Class of the seat for the fare', enum: SeatType })
  @IsString()
  @IsOptional()
  seatClass?: SeatType;

  @ApiPropertyOptional({ description: 'Price of the fare' })
  @IsNumber()
  @IsOptional()
  price?: number;
}
