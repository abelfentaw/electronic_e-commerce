/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';


@ApiTags('Upload')
@Controller('file')
export class UploadController {
  constructor(private uploadService: UploadService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.handleFileUpload(file);
  }

  @Get('get-image')
  getFile(@Param('id') id: string){
    return this.uploadService.getImage(+id)
  }

  @Get('get-image/:id')
  async getImageById(@Param('id') id:string, @Res() res:Response){
    const filePath= await this.uploadService.getImage(+id)
    res.sendFile(filePath,{root:'files'})
  }
}
