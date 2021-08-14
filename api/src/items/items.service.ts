import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { sanitizeHtmlUtils } from '../common/utils/sanitize-html.utils';
import { CreateItemInput } from './dto/create-item.input';
import { GetItemsArgs } from './dto/getItems.args';
import { UpdateItemInput } from './dto/update-item.input';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async create(createItemInput: CreateItemInput, siteId: number) {
    const item = new Item();

    item.name = createItemInput.name;
    item.categoryId = createItemInput.categoryId;
    item.siteId = siteId;
    item.longDesc = sanitizeHtmlUtils(createItemInput.longDesc);
    item.shortDesc = createItemInput.shortDesc;
    item.numberInCollection = createItemInput.numberInCollection;
    item.numberForExchange = createItemInput.numberForExchange;
    item.internalNumber = createItemInput.internalNumber;

    return await this.itemsRepository.save(item);
  }

  async findAll({ categoryId, siteId }: GetItemsArgs, parent?: Category) {
    console.log(parent);
    return await this.itemsRepository.find({
      where: {
        ...(categoryId && { categoryId }),
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
      relations: ['images'],
    });
    if (!item) throw new BadRequestException('Invalid item');

    updateItemInput.longDesc = sanitizeHtmlUtils(updateItemInput.longDesc);
    Object.assign(item, updateItemInput);

    item.images = item.images.map((image) => {
      const updatingImage = updateItemInput.images.find(
        (x) => image.id === x.id,
      );
      image.path = updatingImage.path;
      image.main = updatingImage.main;
      return image;
    });
    await this.itemsRepository.save(item);
    return item;
  }

  async remove(itemId: number) {
    const item = await this.itemsRepository.findOne({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Item not found!');
    await this.itemsRepository.delete(itemId);
    return item;
  }

  async getItemsOfCategory(categoryId: number) {
    return await this.itemsRepository.find({
      where: { categoryId },
    });
  }

  async getAllItemsFromSite(siteId: number) {
    return await this.itemsRepository.find({
      where: { siteId },
    });
  }
}
