/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Express } from 'express';
import { ProductEntity } from 'src/entities/product.entity';
import { Upload } from 'src/entities/upload.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
  ) {}
  async handleFileUpload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('there is no file');
    }

    const allowedMimeType = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'appllication/pdf',
    ];

    if (!allowedMimeType.includes(file.mimetype)) {
      throw new BadRequestException('invalid file type');
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      throw new BadRequestException('file size is too large');
    }
    // const fileData = new ProductEntity();
  }

  async getImage(id: number): Promise<string> {
    const upload = await this.uploadRepository.findOne({ where: { id } });
    if (!upload) {
      throw new NotFoundException('image not found');
    }
    return upload.filepath;
  }
}
