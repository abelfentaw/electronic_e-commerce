/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Upload } from 'src/entities/upload.entity';
import { ProductEntity } from 'src/entities/product.entity';
// import { Upload } from 'src/entities/upload.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join('Users/abelf/Desktop/ecomerce internship/e-commerce/src', '..', 'uploads'),
      serveRoot: '/files',
    }),
    TypeOrmModule.forFeature([Upload]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}-${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports:[UploadService]
})
export class UploadModule {}
