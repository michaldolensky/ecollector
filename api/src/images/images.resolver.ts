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
import * as fs from 'fs';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import * as path from 'path';
import { getRepository } from 'typeorm';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../common/decoratos/roles.decorator';
import { GuardRoles } from '../common/enums/role.enum';
import { Item } from '../items/entities/item.entity';
import { DeleteImageArgs } from './dto/delete-image.input';
import { GetImagesArgs } from './dto/get-images.args';
import { Image } from './entities/image.entity';
import { ImagesService } from './images.service';

@Resolver(() => Image)
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(GqlAuthGuard, RoleGuard)
  @Roles(GuardRoles.Admin)
  @Query(() => [Image], { name: 'images' })
  findAll(@Args() args: GetImagesArgs) {
    return this.imagesService.findAll(args);
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @Roles(GuardRoles.Admin)
  @Query(() => Image, { name: 'image' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.imagesService.findOne(id);
  }
  @UseGuards(GqlAuthGuard, RoleGuard)
  @Roles(GuardRoles.Owner)
  @Mutation(() => Image)
  removeImage(@Args() { deleteImageInput: { id } }: DeleteImageArgs) {
    return this.imagesService.remove(id);
  }

  @ResolveField()
  async item(@Parent() image: Image): Promise<Item[]> {
    console.log(await getRepository(Item).find({ where: { id: image.id } }));
    return await getRepository(Item).find({ where: { id: image.id } });
  }

  // @UseGuards(GqlAuthGuard, RoleGuard)
  // @Roles(GuardRoles.Owner)
  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'files', type: () => [GraphQLUpload] })
    files: FileUpload[],
  ) {
    for (const value of files) {
      const val = await value;
      const { filename, createReadStream } = val;

      const stream = createReadStream();
      const filePath = path.join('uploads', filename);
      const file = fs.createWriteStream(filePath);
      stream.pipe(file);
    }
    return true;
  }
}
