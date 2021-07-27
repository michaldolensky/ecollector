import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import express from 'express';
import 'multer';
import { diskStorage } from 'multer';
import {
  editFileName,
  imageFileFilter,
} from '../common/utils/image-upload.utils';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body('itemId') itemId: number,
  ) {
    const response: Image[] = [];
    for (const file of files) {
      console.log(file);
      const image = await this.imagesService.create({
        filename: file.filename,
        itemId,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
      });
      response.push(image);
    }
    return response;
  }

  @Get(':imgpath')
  seeUploadedFile(
    @Param('imgpath') image: string,
    @Res() res: express.Response,
  ) {
    return res.sendFile(image, { root: './uploads' });
  }
}