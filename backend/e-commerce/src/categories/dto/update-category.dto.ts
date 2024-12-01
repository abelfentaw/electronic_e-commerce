import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import {IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto{
@ApiProperty()
@IsString()
title:string

@ApiProperty()
@ValidateNested()
@Type(()=>CreateCategoryDto)
updateCategoryDto:CreateCategoryDto

}
