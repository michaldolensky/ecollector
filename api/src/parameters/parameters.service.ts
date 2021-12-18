import { Injectable } from '@nestjs/common';
import { CreateParameterInput } from './dto/create-parameter.input';
import { UpdateParameterInput } from './dto/update-parameter.input';

@Injectable()
export class ParametersService {
  create(createParameterInput: CreateParameterInput) {
    return 'This action adds a new parameter';
  }

  findAll() {
    return `This action returns all parameters`;
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
