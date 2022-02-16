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
import { UploadImageDto } from './dto/upload-image.dto';
import { Image } from './entities/image.entity';
import { ImagesService } from './images.service';

@Controller()
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('api/uploads')
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
    @Body() body: UploadImageDto,
  ) {
    const response: Image[] = [];
    const { itemId } = body;

    for (const file of files) {
      const image = await this.imagesService.create({
        filename: file.filename,
        itemId,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
        main: (await this.imagesService.getCountOfImagesOfItem(itemId)) === 0,
      });
      response.push(image);
    }
    return response;
  }

  @Get('uploads/:imgpath')
  seeUploadedFile(
    @Param('imgpath') image: string,
    @Res() res: express.Response,
  ) {
    return res.sendFile(image, { root: './uploads' });
  }
}