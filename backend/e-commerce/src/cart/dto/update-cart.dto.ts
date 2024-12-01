/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
