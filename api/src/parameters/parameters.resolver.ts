import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../common/decoratos/roles.decorator';
import { GuardRoles } from '../common/enums/role.enum';
import { CreateParameterArgs } from './dto/create-parameter.input';
import { DeleteParameterArgs } from './dto/delete-parameter.input';
import { GetParametersArgs } from './dto/get-parameters.args';
import { UpdateParameterArgs } from './dto/update-parameter.input';
import { Parameter } from './entities/parameter.entity';
import { ParametersService } from './parameters.service';

@Resolver(() => Parameter)
export class ParametersResolver {
  constructor(private readonly parametersService: ParametersService) {}

  @UseGuards(GqlAuthGuard, RoleGuard)
  @Roles(GuardRoles.Owner)
  @Mutation(() => Parameter)
  createParameter(
    @Args() { siteId, createParameterInput }: CreateParameterArgs,
  ) {
    return this.parametersService.create(createParameterInput, siteId);
  }

  @Query(() => [Parameter], { name: 'parameters' })
  findAll(@Args() args: GetParametersArgs): Promise<Parameter[]> {
    return this.parametersService.findAllBySiteId(args.filter, args.siteId);
  }

  @Query(() => Parameter, { name: 'parameter' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.parametersService.findOne(id);
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @Roles(GuardRoles.Owner)
  @Mutation(() => Parameter)
  updateParameter(@Args() { updateParameterInput }: UpdateParameterArgs) {
    return this.parametersService.update(
      updateParameterInput.id,
      updateParameterInput,
    );
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @Roles(GuardRoles.Owner)
  @Mutation(() => Parameter)
  removeParameter(
    @Args() { deleteParameterInput: { parameterId } }: DeleteParameterArgs,
  ) {
    return this.parametersService.remove(parameterId);
  }
}
