import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

    @ApiProperty({ description: 'Name of the user', required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ description: 'Email of the user', maxLength: 255, required: false })
    @IsOptional()
    @IsEmail()
    email?: string;
}
