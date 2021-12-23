import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParameterInput } from './dto/create-parameter.input';
import { UpdateParameterInput } from './dto/update-parameter.input';
import { ItemParameter } from './entities/ItemParameter.entity';
import { Parameter } from './entities/parameter.entity';

@Injectable()
export class ParametersService {
  constructor(
    @InjectRepository(Parameter)
    private parameterRepository: Repository<Parameter>,
    @InjectRepository(ItemParameter)
    private parameterToItemRepository: Repository<ItemParameter>,
  ) {}

  async create(createParameterInput: CreateParameterInput) {
    const parameter = new Parameter();

    parameter.name = createParameterInput.name;
    parameter.type = createParameterInput.type;

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
