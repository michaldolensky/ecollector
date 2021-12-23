import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateParameterInput } from './dto/create-parameter.input';
import { UpdateParameterInput } from './dto/update-parameter.input';
import { ItemParameter } from './entities/ItemParameter.entity';
import { ParametersService } from './parameters.service';

@Resolver(() => ItemParameter)
export class ItemParametersResolver {
  constructor(private readonly parametersService: ParametersService) {}

  @Mutation(() => ItemParameter)
  createParameter(
    @Args('createParameterInput') createParameterInput: CreateParameterInput,
  ) {
    return this.parametersService.create(createParameterInput);
  }

  @Query(() => [ItemParameter], { name: 'itemParameters' })
  findAll() {
    return this.parametersService.findAll();
  }

  @Query(() => ItemParameter, { name: 'itemParameter' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.parametersService.findOne(id);
  }

  @Mutation(() => ItemParameter)
  updateItemParameter(
    @Args('updateParameterInput') updateParameterInput: UpdateParameterInput,
  ) {
    return this.parametersService.update(
      updateParameterInput.id,
      updateParameterInput,
    );
  }

  @Mutation(() => ItemParameter)
  removeItemParameter(@Args('id', { type: () => Int }) id: number) {
    return this.parametersService.remove(id);
  }
}
