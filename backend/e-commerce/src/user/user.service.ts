/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.create(createUserDto);
    await this.userRepository.insert(user);
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      select:{firstName:true,
        email:true,
        roles:true,
        id:true
      }
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    const oneUser = await this.userRepository.findOne({ where: { id } });
    if (!oneUser) {
      throw new NotFoundException('user not found');
    }
    return oneUser;
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete({ id });
  }
}
