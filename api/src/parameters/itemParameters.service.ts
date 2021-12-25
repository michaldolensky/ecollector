import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemParameterInput } from './dto/create-ItemParameter.input';
import { UpdateItemParameterInput } from './dto/update-ItemParameter.input';
import { ItemParameter } from './entities/item-parameter.entity';

@Injectable()
export class ItemParametersService {
  constructor(
    @InjectRepository(ItemParameter)
    private itemParameterRepository: Repository<ItemParameter>,
  ) {}

  async findAllParametersForItem(itemId: number) {
    return await this.itemParameterRepository.find({
      relations: ['item', 'parameter'],
      loadEagerRelations: true,
    });
  }

  create(createItemParameterInput: CreateItemParameterInput) {
    const itemParameter = new ItemParameter();
    Object.assign(itemParameter, createItemParameterInput);
    return this.itemParameterRepository.save(itemParameter);
  }

  async update(updateItemParameterInput: UpdateItemParameterInput) {
    const itemParameter = await this.findOne(updateItemParameterInput.id);
    itemParameter.value = updateItemParameterInput.value;
    return this.itemParameterRepository.save(itemParameter);
  }

  findOne(id: number) {
    return this.itemParameterRepository.findOne(id);
  }

  remove(ItemParameterId: number) {
    return this.itemParameterRepository.delete(ItemParameterId);
  }
}
