import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../common/decoratos/roles.decorator';
import { GuardRoles } from '../common/enums/role.enum';
import { Site } from '../sites/entities/site.entity';
import { SitesService } from '../sites/sites.service';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly sitesService: SitesService,
  ) {}

  @UseGuards(GqlAuthGuard, RoleGuard)
  @Roles(GuardRoles.Admin)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(GqlAuthGuard, RoleGuard)
  @Roles(GuardRoles.Admin)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.usersService.update(currentUser.id, updateUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  removeUser(@CurrentUser() currentUser: User) {
    return this.usersService.remove(currentUser.id);
  }

  @ResolveField()
  async sites(@Parent() user: User): Promise<Site[]> {
    return this.sitesService.getSitesWithOwnerId(user.id);
  }
}
