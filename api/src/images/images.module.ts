import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../files/files.module';
import { ItemsModule } from '../items/items.module';
import { Image } from './entities/image.entity';
import { ImagesResolver } from './images.resolver';
import { ImagesService } from './images.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    forwardRef(() => ItemsModule),
    FilesModule,
  ],
  providers: [ImagesResolver, ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
