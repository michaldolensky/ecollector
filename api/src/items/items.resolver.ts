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
import { GetImagesArgs } from '../images/dto/get-images.args';
import { Image } from '../images/entities/image.entity';
import { ImagesService } from '../images/images.service';
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
  ) {}

  @UseGuards(GqlAuthGuard, RoleGuard)
  @Mutation(() => Item)
  createItem(@Args() { createItemInput, siteId }: CreateItemArgs) {
    return this.itemsService.create(createItemInput, siteId);
  }

  @Query(() => [Item], { name: 'items' })
  findAll(@Args() args: GetItemsArgs) {
    return this.itemsService.findAll(args);
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemsService.findOne(id);
  }

  @Mutation(() => Item)
  updateItem(@Args() { updateItemInput }: UpdateItemArgs) {
    return this.itemsService.update(updateItemInput.id, updateItemInput);
  }

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
}
