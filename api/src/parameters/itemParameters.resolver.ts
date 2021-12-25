import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../common/decoratos/roles.decorator';
import { GuardRoles } from '../common/enums/role.enum';
import { CreateItemParameterArgs } from './dto/create-ItemParameter.input';
import { ItemParameter } from './entities/item-parameter.entity';
import { ItemParametersService } from './itemParameters.service';

@Resolver(() => ItemParameter)
export class ItemParameterResolver {
  constructor(private readonly itemParametersService: ItemParametersService) {}

  @UseGuards(GqlAuthGuard, RoleGuard)
  @Roles(GuardRoles.Owner)
  @Mutation(() => ItemParameter)
  createItemParameter(
    @Args() { createItemParameterInput }: CreateItemParameterArgs,
  ) {
    return this.itemParametersService.create(createItemParameterInput);
  }

  @Query(() => ItemParameter, { name: 'itemParameter' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemParametersService.findOne(id);
  }
}
