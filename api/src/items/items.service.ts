import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { FilesService } from '../files/files.service';
import { ItemParametersService } from '../parameters/itemParameters.service';
import { CreateItemInput } from './dto/create-item.input';
import { GetItemsArgs } from './dto/getItems.args';
import { UpdateItemInput } from './dto/update-item.input';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    private readonly itemParametersService: ItemParametersService,
    private readonly filesService: FilesService,
  ) {}

  async create(createItemInput: CreateItemInput, siteId: number) {
    const item = new Item();

    Object.assign(item, createItemInput);
    item.siteId = siteId;
    return await this.itemsRepository.save(item);
  }

  async findAll({ filter, siteId }: GetItemsArgs, parent?: Category) {
    return await this.itemsRepository.find({
      where: {
        ...(filter?.categoryId && { categoryId: filter.categoryId }),
        ...(filter?.name && { name: ILike(`%${filter.name}%`) }),
        ...(parent?.id && { categoryId: parent.id }),
        ...(siteId && { siteId }),
      },
    });
  }

  async findOne(id: number) {
    const item = await this.itemsRepository.findOneOrFail({ id });
    if (item) {
      return item;
    }
    throw new NotFoundException('Item with this id does not exist');
  }

  async update(id: number, updateItemInput: Partial<UpdateItemInput>) {
    const item = await this.itemsRepository.findOne({
      where: { id },
      relations: ['images', 'itemParameters'],
    });
    if (!item) throw new BadRequestException('Invalid item');

    Object.assign(item, updateItemInput);

    item.images = item.images.map((image) => {
      const updatingImage = updateItemInput.images.find(
        (x) => image.id === x.id,
      );
      image.main = updatingImage.main;
      return image;
    });

    item.itemParameters.forEach((parameter) => {
      if (parameter.id) {
        this.itemParametersService.update(parameter);
      } else {
        this.itemParametersService.create({
          value: parameter.value,
          parameterId: parameter.parameter.id,
          itemId: item.id,
        });
      }
    });
    delete item.itemParameters;

    await this.itemsRepository.save(item);
    return item;
  }

  async remove(itemId: number) {
    const item = await this.itemsRepository.findOne({
      where: { id: itemId },
      relations: ['images', 'images.file'],
    });
    if (!item) throw new NotFoundException('Item not found!');

    //fixme: find better way to delete files in s3
    item.images.forEach((image) => {
      if (image.file) {
        this.filesService.deleteFile(image.file.id);
      }
    });
    await this.itemsRepository.delete(itemId);

    return item;
  }
}
