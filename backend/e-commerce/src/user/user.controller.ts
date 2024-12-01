import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/utitlity/auth-guard/authentication.guard';
import { Roles } from 'src/utitlity/roles/user-role.enum';
import { AuthorizeGuard } from 'src/utitlity/auth-guard/authorization.guard';


@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  // @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post()
  @ApiOperation({
    summary: 'to create a user  ',
  })
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get('profile')
  @ApiOperation({
    summary: 'to get a user in repository  ',
  })
  findAll(@Req() req:any): Promise<UserEntity[]> {
    console.log(req);
    return this.userService.findAll();
  }


  @UseGuards(AuthorizeGuard([Roles.ADMIN]))
  @Delete(':id')
  @ApiOperation({
    summary: 'to delete a user in repository',
  })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.remove(+id);
  }
}
