import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateParameterInput } from './dto/create-parameter.input';
import { ParameterFilterInput } from './dto/get-parameters.args';
import { UpdateParameterInput } from './dto/update-parameter.input';
import { Parameter } from './entities/parameter.entity';

@Injectable()
export class ParametersService {
  constructor(
    @InjectRepository(Parameter)
    private parameterRepository: Repository<Parameter>,
  ) {}

  async create(createParameterInput: CreateParameterInput, siteId: number) {
    const parameter = new Parameter();
    parameter.name = createParameterInput.name;
    parameter.type = createParameterInput.type;
    parameter.siteId = siteId;
    return this.parameterRepository.save(parameter);
  }

  findAllBySiteId(filter: ParameterFilterInput, siteId: number) {
    return this.parameterRepository.find({
      where: {
        siteId,
        ...(filter?.name && { name: ILike(`%${filter.name}%`) }),
      },
    });
  }

  findOne(id: number) {
    const parameter = this.parameterRepository.findOneOrFail({ id });
    if (parameter) {
      return parameter;
    }
    throw new NotFoundException('Parameter with this id does not exist');
  }

  async update(id: number, updateParameterInput: UpdateParameterInput) {
    const parameter = await this.findOne(id);
    if (!parameter) throw new BadRequestException('Invalid parameter id');
    Object.assign(parameter, updateParameterInput);
    await this.parameterRepository.update(id, parameter);
    return parameter;
  }

  async remove(id: number): Promise<void> {
    const parameter = await this.parameterRepository.findOne({ where: { id } });
    if (!parameter) throw new NotFoundException('Parameter not found!');
    await this.parameterRepository.delete(id);
  }
}
