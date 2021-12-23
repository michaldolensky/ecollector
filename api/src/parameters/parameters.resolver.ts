import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateParameterInput } from './dto/create-parameter.input';
import { UpdateParameterInput } from './dto/update-parameter.input';
import { Parameter } from './entities/parameter.entity';
import { ParametersService } from './parameters.service';

@Resolver(() => Parameter)
export class ParametersResolver {
  constructor(private readonly parametersService: ParametersService) {}

  @Mutation(() => Parameter)
  createParameter(
    @Args('createParameterInput') createParameterInput: CreateParameterInput,
  ) {
    return this.parametersService.create(createParameterInput);
  }

  @Query(() => [Parameter], { name: 'parameters' })
  findAll() {
    return this.parametersService.findAll();
  }

  @Query(() => Parameter, { name: 'parameter' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.parametersService.findOne(id);
  }

  @Mutation(() => Parameter)
  updateParameter(
    @Args('updateParameterInput') updateParameterInput: UpdateParameterInput,
  ) {
    return this.parametersService.update(
      updateParameterInput.id,
      updateParameterInput,
    );
  }

  @Mutation(() => Parameter)
  removeParameter(@Args('id', { type: () => Int }) id: number) {
    return this.parametersService.remove(id);
  }
}
