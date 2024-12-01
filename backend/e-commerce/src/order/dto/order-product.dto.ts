/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class OrderProductDto {
  @ApiProperty()
  @IsNotEmpty()
  productId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  product_quantity: number;

}
