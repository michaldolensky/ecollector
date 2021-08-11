import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { getRepository } from 'typeorm';
import { Item } from '../items/entities/item.entity';
import { DeleteImageArgs } from './dto/delete-image.input';
import { GetImagesArgs } from './dto/get-images.args';
import { Image } from './entities/image.entity';
import { ImagesService } from './images.service';

@Resolver(() => Image)
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Query(() => [Image], { name: 'images' })
  findAll(@Args() args: GetImagesArgs) {
    return this.imagesService.findAll(args);
  }

  @Query(() => Image, { name: 'image' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.imagesService.findOne(id);
  }

  @Mutation(() => Image)
  removeImage(@Args() { deleteImageInput: { id } }: DeleteImageArgs) {
    return this.imagesService.remove(id);
  }

  @ResolveField()
  async item(@Parent() image: Image): Promise<Item[]> {
    console.log(await getRepository(Item).find({ where: { id: image.id } }));
    return await getRepository(Item).find({ where: { id: image.id } });
  }
}
