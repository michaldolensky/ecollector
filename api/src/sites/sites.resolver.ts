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
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';
import { Roles } from '../common/decoratos/roles.decorator';
import { GuardRoles } from '../common/enums/role.enum';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateSiteInput } from './dto/create-site.input';
import { UpdateSiteArgs } from './dto/update-site.input';
import { Site } from './entities/site.entity';
import { SiteStats } from './entities/siteStats';
import { SitesService } from './sites.service';

@Resolver(() => Site)
export class SitesResolver {
  constructor(
    private readonly sitesService: SitesService,
    private readonly userService: UsersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Site)
  createSite(
    @Args('createSiteInput') createSiteInput: CreateSiteInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.sitesService.create(createSiteInput, currentUser);
  }

  @Query(() => [Site], { name: 'sites' })
  getAllSites() {
    return this.sitesService.findAll();
  }

  @Query(() => Site, { name: 'site' })
  getSiteById(@Args('id', { type: () => Int }) id: number) {
    return this.sitesService.findOne(id);
  }
  @UseGuards(GqlAuthGuard, RoleGuard)
  @Roles(GuardRoles.Owner)
  @Mutation(() => Site)
  updateSite(@Args() args: UpdateSiteArgs) {
    return this.sitesService.update(args.siteId, args.updateSiteInput);
  }
  @UseGuards(GqlAuthGuard, RoleGuard)
  @Roles(GuardRoles.Owner)
  @Mutation(() => Site)
  removeSite(@Args('id', { type: () => Int }) id: number) {
    return this.sitesService.remove(id);
  }

  @ResolveField(() => User)
  owner(@Parent() site: Site): Promise<User> {
    return this.userService.findOne(site.ownerId);
  }

  @ResolveField()
  async categories(@Parent() site: Site): Promise<Category[]> {
    return this.categoriesService.findAll({ siteId: site.id });
  }
  @ResolveField()
  async stats(@Parent() site: Site): Promise<SiteStats> {
    return this.sitesService.getSiteStats(site.id);
  }
}
