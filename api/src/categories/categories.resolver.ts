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
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../common/decoratos/roles.decorator';
import { GuardRoles } from '../common/enums/role.enum';
import { GetItemsArgs } from '../items/dto/getItems.args';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryArgs } from './dto/create-category.input';
import { UpdateCategoryArgs } from './dto/update-category.input';
import { Site } from '../sites/entities/site.entity';
import { SitesService } from '../sites/sites.service';
import { ItemsService } from '../items/items.service';
import { Item } from '../items/entities/item.entity';
import { DeleteCategoryArgs } from './dto/delete-category.input';
import { SiteIdArgs } from '../common/args/siteId.args';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
    private readonly categoryService: CategoriesService,
    private readonly siteService: SitesService,
    private readonly itemService: ItemsService,
  ) {}
  @UseGuards(GqlAuthGuard, RoleGuard)
  @Roles(GuardRoles.Owner)
  @Mutation(() => Category)
  createCategory(@Args() { siteId, createCategoryInput }: CreateCategoryArgs) {
    return this.categoryService.create(createCategoryInput, siteId);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll(@Args() { siteId }: SiteIdArgs) {
    if (siteId) {
      return this.categoryService.getCategoriesWithSiteId(siteId);
    }
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(id);
  }
  @UseGuards(GqlAuthGuard, RoleGuard)
  @Roles(GuardRoles.Owner)
  @Mutation(() => Category)
  updateCategory(@Args() { updateCategoryInput }: UpdateCategoryArgs) {
    return this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }
  @UseGuards(GqlAuthGuard, RoleGuard)
  @Roles(GuardRoles.Owner)
  @Mutation(() => Category)
  removeCategory(
    @Args() { deleteCategoryInput: { categoryId } }: DeleteCategoryArgs,
  ) {
    return this.categoryService.remove(categoryId);
  }

  @ResolveField()
  async site(@Parent() category: Category): Promise<Site> {
    return this.siteService.findOne(category.siteId);
  }

  @ResolveField()
  async items(
    @Parent() category: Category,
    @Args() args: GetItemsArgs,
  ): Promise<Item[]> {
    return this.itemService.findAll(args, category);
  }
}
