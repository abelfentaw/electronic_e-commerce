/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
