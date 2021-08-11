import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Item } from '../items/entities/item.entity';
import { CreateImageInput } from './dto/create-image.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import * as fs from 'fs';
import { GetImagesArgs } from './dto/get-images.args';

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

  async findAll({ itemId, main }: GetImagesArgs, parent?: Item) {
    return await this.imagesRepository.find({
      where: {
        ...(itemId && { itemId }),
        ...(parent.id && { itemId: parent.id }),
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

  update(id: number, updateImageInput: UpdateImageInput) {
    return `This action updates a #${id} image`;
  }

  async remove(id: number) {
    const image = await this.imagesRepository.findOne({ where: { id } });
    if (!image) throw new NotFoundException('Image not found!');
    await this.imagesRepository.delete(id);
    fs.unlink(image.path, (err) => {
      if (err) {
        this.logger.error(err);
        return;
      }
    });
    return image;
  }
}
