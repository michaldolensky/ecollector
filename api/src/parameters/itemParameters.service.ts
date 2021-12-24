import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemParameter } from './entities/item-parameter.entity';

@Injectable()
export class ItemParametersService {
  constructor(
    @InjectRepository(ItemParameter)
    private itemParameterRepository: Repository<ItemParameter>,
  ) {}
}
