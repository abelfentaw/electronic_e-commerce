/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateShippingDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    lastName:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    city:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email:string


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    state:string

    @ApiProperty()
    @IsString()
    @IsOptional()
    additionalDirection:string

}