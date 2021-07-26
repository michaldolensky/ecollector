import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ImagesService } from './images.service';
import { Item } from '../items/entities/item.entity';
import { GetImagesArgs } from './dto/getImages.args';
import { Image } from './entities/image.entity';
import { getRepository } from 'typeorm';

@Resolver(() => Image)
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Query(() => [Image], { name: 'images' })
  findAll(@Args() args: GetImagesArgs) {
    if (args.itemId) {
      return this.imagesService.getAllImagesFromItem(args);
    }
    return this.imagesService.findAll();
  }

  @Query(() => Image, { name: 'image' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.imagesService.findOne(id);
  }

  @Mutation(() => Image)
  removeImage(@Args('imageId', { type: () => Int }) id: number) {
    return this.imagesService.remove(id);
  }

  @ResolveField()
  async item(@Parent() image: Image): Promise<Item[]> {
    console.log(await getRepository(Item).find({ where: { id: image.id } }));
    return await getRepository(Item).find({ where: { id: image.id } });
  }
}
