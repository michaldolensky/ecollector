import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { CreateParameterInput } from './dto/create-parameter.input';
import { UpdateParameterInput } from './dto/update-parameter.input';
import { ParameterToItem } from './entities/parameter-item.entity';
import { Parameter } from './entities/parameter.entity';

@Injectable()
export class ParametersService {
  constructor(
    @InjectRepository(Parameter)
    private parameterRepository: Repository<Parameter>,
    @InjectRepository(ParameterToItem)
    private parameterToItemRepository: Repository<ParameterToItem>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createParameterInput: CreateParameterInput) {
    const parameter = new Parameter();

    parameter.name = createParameterInput.name;
    parameter.type = createParameterInput.type;
    parameter.categories = await this.categoriesService.findByIds(
      createParameterInput.categories,
    );

    return this.parameterRepository.save(parameter);
  }

  findAll() {
    return this.parameterRepository.find({ relations: ['categories'] });
  }

  async findAllByItemId(itemId: number) {
    const parames = await this.parameterToItemRepository.find({
      relations: ['parameter', 'item'],
    });
    console.log(parames);

    return [] as Parameter[];
  }

  findOne(id: number) {
    return `This action returns a #${id} parameter`;
  }

  update(id: number, updateParameterInput: UpdateParameterInput) {
    return `This action updates a #${id} parameter`;
  }

  remove(id: number) {
    return `This action removes a #${id} parameter`;
  }
}
