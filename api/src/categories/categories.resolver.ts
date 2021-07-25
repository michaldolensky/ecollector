import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Site } from '../sites/entities/site.entity';
import { SitesService } from '../sites/sites.service';
import { ItemsService } from '../items/items.service';
import { Item } from '../items/entities/item.entity';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
    private readonly categoryService: CategoriesService,
    private readonly siteService: SitesService,
    private readonly itemService: ItemsService,
  ) {}

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.remove(id);
  }

  @ResolveField()
  async site(@Parent() category: Category): Promise<Site> {
    return this.siteService.findOne(category.siteId);
  }

  @ResolveField()
  async subCategory(@Parent() category: Category): Promise<Category[]> {
    return this.categoryService.getChildrenOfParentOfId(category.id);
  }

  @ResolveField()
  async items(@Parent() category: Category): Promise<Item[]> {
    return this.itemService.getItemsOfCategory(category.id);
  }
}
