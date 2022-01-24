import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import { Item } from '../items/entities/item.entity';
import { CreateImageInput } from './dto/create-image.input';
import { GetImagesArgs } from './dto/get-images.args';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);

  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  async create(createImageInput: CreateImageInput) {
    let image = new Image();
    image = Object.assign(image, createImageInput);

    return await this.imagesRepository.save(image);
  }

  async getCountOfImagesOfItem(itemId: number) {
    return this.imagesRepository.count({
      where: {
        itemId,
      },
    });
  }

  async findAll({ itemId, main }: GetImagesArgs, parent?: Item) {
    return await this.imagesRepository.find({
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
    await this.imagesRepository.delete(id);
    fs.rmSync(image.path, { force: true });
    return image;
  }
}
