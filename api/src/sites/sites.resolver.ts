import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { SitesService } from './sites.service';
import { Site } from './entities/site.entity';
import { CreateSiteInput } from './dto/create-site.input';
import { UpdateSiteInput } from './dto/update-site.input';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Resolver(() => Site)
export class SitesResolver {
  constructor(
    private readonly sitesService: SitesService,
    private readonly userService: UsersService,
  ) {}

  @Mutation(() => Site)
  createSite(@Args('createSiteInput') createSiteInput: CreateSiteInput) {
    return this.sitesService.create(createSiteInput);
  }

  @Query(() => [Site], { name: 'sites' })
  getAllSites() {
    return this.sitesService.findAll();
  }

  @Query(() => Site, { name: 'site' })
  getSiteById(@Args('id', { type: () => Int }) id: number) {
    return this.sitesService.findOne(id);
  }

  @Mutation(() => Site)
  updateSite(@Args('updateSiteInput') updateSiteInput: UpdateSiteInput) {
    return this.sitesService.update(updateSiteInput.id, updateSiteInput);
  }

  @Mutation(() => Site)
  removeSite(@Args('id', { type: () => Int }) id: number) {
    return this.sitesService.remove(id);
  }

  @ResolveField(() => User)
  owner(@Parent() user: User): Promise<User> {
    return this.userService.findOne(user.id);
  }
}
