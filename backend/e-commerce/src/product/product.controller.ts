/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
import { AuthenticationGuard } from 'src/utitlity/auth-guard/authentication.guard';
import { AuthorizeGuard } from 'src/utitlity/auth-guard/authorization.guard';
import { Roles } from 'src/utitlity/roles/user-role.enum';
import { CurrentUser } from 'src/utitlity/current-user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/upload/upload.service';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService,
              ) {}

  
  @Post('create')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @UseInterceptors(FilesInterceptor('files', 5, { // allows up to 5 images
    dest: './uploads',
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
  }))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser() currentUser: UserEntity,
  ) {
    if (files && files.length) {
      const imageUrls = await Promise.all(
        files.map(async file => {
          const { imageUrl } = await this.productService.uploadProductImage(file);
          return imageUrl;
        }),
      );
  
      // Assign the image URLs array to the createProductDto images property
      createProductDto.images = imageUrls;
    }
    
    const product = await this.productService.create(createProductDto, currentUser);
    return product;
  }

  @Get('list')
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const productId = +id; // Convert the id to a number
  
    // Validate if the id is a valid number
    if (isNaN(productId)) {
      throw new HttpException('Invalid product ID', HttpStatus.BAD_REQUEST);
    }
  
    return await this.productService.findOne(productId); // Pass the valid number to the service
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(+id);
  }

  // @Post(':id/image')
  // @UseInterceptors(
  //   FileInterceptor('file', { 
  //     dest: './uploads',
  //     // limits: {
  //     //   fileSize: 3145728, 
  //     // },
  //   }),
  // )
  // @ApiOperation({
  //    summary: 'Upload a product image' })
  // async uploadProductImage(
  //   @Param('id') id: number, 
  //   @UploadedFile() file: Express.Multer.File) {
  //   return await this.productService.uploadProductImage(id, file);
  // }

//   @Post(':id/pictures')
// @UseInterceptors(FileInterceptor('file'))
// async uploadProImage(
//   @Param('id') id: number,
//   @UploadedFile() file: Express.Multer.File,
// ) {
//   return await this.productService.uploadProImage(id, file);
// }
  }

