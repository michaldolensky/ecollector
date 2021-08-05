import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sanitizeHTML } from '../common/utils/sanitize-html';
import { CreateItemInput } from './dto/create-item.input';
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
    item.longDesc = sanitizeHTML(createItemInput.longDesc);
    item.shortDesc = createItemInput.shortDesc;
    item.numberInCollection = createItemInput.numberInCollection;
    item.numberForExchange = createItemInput.numberForExchange;
    item.internalNumber = createItemInput.internalNumber;

    return await this.itemsRepository.save(item);
  }

  async findAll() {
    return await this.itemsRepository.find();
  }

  async findOne(id: number) {
    const item = await this.itemsRepository.findOneOrFail({ id });
    if (item) {
      return item;
    }
    throw new NotFoundException('Item with this id does not exist');
  }

  async update(id: number, updateItemInput: Partial<UpdateItemInput>) {
    const item = await this.findOne(id);
    if (!item) throw new BadRequestException('Invalid item');
    updateItemInput.longDesc = sanitizeHTML(updateItemInput.longDesc);
    Object.assign(item, updateItemInput);
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
