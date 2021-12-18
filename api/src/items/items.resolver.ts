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
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';
import { Roles } from '../common/decoratos/roles.decorator';
import { GuardRoles } from '../common/enums/role.enum';
import { GetImagesArgs } from '../images/dto/get-images.args';
import { Image } from '../images/entities/image.entity';
import { ImagesService } from '../images/images.service';
import { Parameter } from '../parameters/entities/parameter.entity';
import { ParametersService } from '../parameters/parameters.service';
import { CreateItemArgs } from './dto/create-item.input';
import { DeleteItemArgs } from './dto/delete-item.input';
import { GetItemsArgs } from './dto/getItems.args';
import { UpdateItemArgs } from './dto/update-item.input';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly categoriesService: CategoriesService,
    private readonly imagesService: ImagesService,
    private readonly parametersService: ParametersService,
  ) {}

  @UseGuards(GqlAuthGuard, RoleGuard)
  @Roles(GuardRoles.Owner)
  @Mutation(() => Item)
  createItem(@Args() { createItemInput, siteId }: CreateItemArgs) {
    return this.itemsService.create(createItemInput, siteId);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => [Item], { name: 'items' })
  findAll(@Args() args: GetItemsArgs) {
    return this.itemsService.findAll(args);
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemsService.findOne(id);
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @Roles(GuardRoles.Owner)
  @Mutation(() => Item)
  updateItem(@Args() { updateItemInput }: UpdateItemArgs) {
    return this.itemsService.update(updateItemInput.id, updateItemInput);
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @Roles(GuardRoles.Owner)
  @Mutation(() => Item)
  removeItem(@Args() { deleteItemInput: { itemId } }: DeleteItemArgs) {
    return this.itemsService.remove(itemId);
  }

  @ResolveField()
  async category(@Parent() item: Item): Promise<Category> {
    return this.categoriesService.findOne(item.categoryId);
  }
  @ResolveField()
  async images(
    @Parent() item: Item,
    @Args() args: GetImagesArgs,
  ): Promise<Image[]> {
    return this.imagesService.findAll(args, item);
  }
  @ResolveField()
  async parameters(@Parent() item: Item): Promise<Parameter[]> {
    return this.parametersService.findAllByItemId(item.id);
  }
}
