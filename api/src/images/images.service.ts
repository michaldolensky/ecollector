import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'graphql-upload';
import { Repository } from 'typeorm';
import { FilesService } from '../files/files.service';
import { Item } from '../items/entities/item.entity';
import { GetImagesArgs } from './dto/get-images.args';
import { Image } from './entities/image.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);

  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private filesService: FilesService,
  ) {}

  private generateS3Key(
    itemId: number,
    siteId: number,
    filename: string,
  ): string {
    return `${siteId}/${itemId}/${uuid()}-${filename}`;
  }

  async create(
    file: FileUpload,
    itemId: number,
    siteId: number,
  ): Promise<Image> {
    const key = this.generateS3Key(itemId, siteId, file.filename);
    const savedFile = await this.filesService.uploadFile(file, key);

    const main = (await this.getCountOfImagesOfItem(itemId)) === 0;

    const newImage = this.imagesRepository.create({
      itemId,
      originalName: file.filename,
      main: main,
      file: {
        id: savedFile.id,
      },
    });
    const saved = await this.imagesRepository.save(newImage);
    saved.file.url = savedFile.url;
    return saved;
  }

  async getCountOfImagesOfItem(itemId: number) {
    return this.imagesRepository.count({
      where: {
        itemId,
      },
    });
  }

  async createMultiple(
    files: FileUpload[],
    itemId: number,
    siteId: number,
  ): Promise<Image[]> {
    const images: Image[] = [];
    for (const file of files) {
      const image = await this.create(file, itemId, siteId);
      images.push(image);
    }
    return images;
  }

  async findAll({ itemId, main }: GetImagesArgs, parent?: Item) {
    return await this.imagesRepository.find({
      relations: ['file'],
      where: {
        ...(itemId && { itemId }),
        ...(parent?.id && { itemId: parent.id }),
        ...(main && { main }),
      },
      order: {
        main: 'DESC',
        id: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const image = await this.imagesRepository.findOne({ id });
    if (image) {
      return image;
    }
    throw new NotFoundException('Item with this id does not exist');
  }

  async remove(id: number) {
    const image = await this.imagesRepository.findOne({ where: { id } });
    if (!image) throw new NotFoundException('Image not found!');
    await this.filesService.deleteFile(image.file.id);
    await this.imagesRepository.delete(id);
    return image;
  }
}
