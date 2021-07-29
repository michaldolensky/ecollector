import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemArgs } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { GetItemsArgs } from './dto/getItems.args';
import { Category } from '../categories/entities/category.entity';
import { CategoriesService } from '../categories/categories.service';
import { getRepository } from 'typeorm';
import { Image } from '../images/entities/image.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { DeleteItemArgs } from './dto/delete-item.input';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @UseGuards(GqlAuthGuard, RoleGuard)
  @Mutation(() => Item)
  createItem(@Args() { createItemInput, siteId }: CreateItemArgs) {
    return this.itemsService.create(createItemInput, siteId);
  }

  @Query(() => [Item], { name: 'items' })
  findAll(@Args() args: GetItemsArgs) {
    if (args.siteId) {
      return this.itemsService.getAllItemsFromSite(args);
    }
    return this.itemsService.findAll();
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemsService.findOne(id);
  }

  @Mutation(() => Item)
  updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput) {
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
  async images(@Parent() item: Item): Promise<Image[]> {
    return await getRepository(Image).find({ where: { id: item.id } });
  }
}
