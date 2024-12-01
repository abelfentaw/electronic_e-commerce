/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class UpdateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  Rating: number;
  @IsNotEmpty()
  @IsString()
  comment: string;
}
