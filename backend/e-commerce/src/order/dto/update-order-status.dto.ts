/* eslint-disable prettier/prettier */
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { orderStatus } from '../enums/order-status.enum';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateOrderStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn([orderStatus.SHIPPED, orderStatus.DELIVERED,orderStatus.CANCELED])
  status: orderStatus;
  @ApiProperty()
  @IsNumber()
  userId: number;
}
