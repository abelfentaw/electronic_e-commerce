import { UploadService } from 'src/upload/upload.service';
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { orderStatus } from 'src/order/enums/order-status.enum';
import { UserEntity } from 'src/entities/user.entity';
import { v2 as cloudinary} from 'cloudinary'
import * as fs from 'fs';
import * as path from 'path';
import { CurrentUser } from 'src/utitlity/current-user.decorator';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoriesService
  ) { { cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:  process.env.CLOUDINARY_API_KEY,    
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });}}

  async create(
    createProductDto: CreateProductDto,
    currentUser: UserEntity,
  ): Promise<ProductEntity> {
  const getCategory=await this.categoryService.findOne(createProductDto.categoryId)
  if(!getCategory){
    throw new NotFoundException('category not found ')
  }
    const products = this.productRepository.create({ ...createProductDto });
    products.category=getCategory
    products.user = currentUser;
    const getProduct = await this.productRepository.save(products);
    return getProduct;
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find({
      relations: { category: true,files:true },
      select: {
        category: {
          title: true,
        },
        files:{
          filepath:true
        }
      },
    });
  }

  async findOne(id: number): Promise<ProductEntity> {
    if (isNaN(id)) {
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }
  
    // Query the product from the database
    const getProduct = await this.productRepository.findOne({
      where: { id },
      relations: { category: true, files: true },
      select: {
        category: {
          title: true,
        },
        files: {
          filepath: true,
        },
      },
    });
  
    // Check if the product was not found
    if (!getProduct) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  
    return getProduct;
  }
  
  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }
  async updateStock(id: number, stock: number, status: string) {
    let product = await this.findOne(id);
    if (status === orderStatus.DELIVERED) {
      product.stock -= stock;
    } else {
      product.stock += stock;
    }
    product = await this.productRepository.save(product);
    return product;
  }

  async uploadProductImage(file: any): Promise<{ imageUrl: string }> {
    try {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: process.env.CLOUDINARY_FOLDER,
      });
  
      const imageUrl = cloudinary.url(uploadResult.public_id, {
        width: 500,
        height: 500,
        crop: 'limit',
        quality: 'auto:good',
        fetchFormat: 'auto',
      });
  
      if (!imageUrl) {
        throw new BadRequestException('Image does not match requirements');
      }
  
      // Clean up the local file after upload
      fs.unlinkSync(file.path);
  
      return { imageUrl };
    } catch (error) {
      console.error('Error uploading product image:', error);
      throw new BadRequestException('Failed to upload product image');
    }
  }
}
