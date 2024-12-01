/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { CategoryEntity } from '../entities/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { CurrentUser } from 'src/utitlity/current-user.decorator';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepositry: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private userService: UserService,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    currentUser: UserEntity,
  ): Promise<CategoryEntity> {
    const category = this.categoryRepositry.create(createCategoryDto);
    category.user = currentUser;
    return await this.categoryRepositry.save(category);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepositry.find({
      relations: { products: true },
    });
  }
  async findOne(user: any): Promise<CategoryEntity> {
    const getCategory = await this.categoryRepositry.findOne({
      where: {
        user: user.id,
      },
      relations: { products: true },
    });
    if (!getCategory) throw new NotFoundException('category not found');
    return getCategory;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return await this.categoryRepositry.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    const deleteCategory = await this.categoryRepositry.findOneBy({ id });

    if (!deleteCategory)
      throw new NotFoundException('there is no category by this id');

    await this.categoryRepositry.delete(id);
    return id;
  }
}
