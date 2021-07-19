import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Site } from '../sites/entities/site.entity';
import { SitesService } from '../sites/sites.service';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
    private readonly categoryService: CategoriesService,
    private readonly siteService: SitesService,
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

  @ResolveProperty()
  async site(@Parent() category: Category): Promise<Site> {
    return this.siteService.findOne(category.siteId);
  }
  @ResolveProperty()
  async parent(@Parent() parent: Category): Promise<Category> {
    return this.categoryService.findOne(parent.parentId);
  }
}
