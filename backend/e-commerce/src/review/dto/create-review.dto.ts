/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  Rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  comment: string;
}
