/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Transform(({value})=> parseFloat(value))
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({value})=> parseInt(value, 10))
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  files: any;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty()
  @Transform(({value})=> parseInt(value, 10))
  @IsNumber()
  categoryId: number;
}