import { forwardRef, Module } from '@nestjs/common';
import { ItemsModule } from '../items/items.module';
import { ImagesService } from './images.service';
import { ImagesResolver } from './images.resolver';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), forwardRef(() => ItemsModule)],
  providers: [ImagesResolver, ImagesService],
  controllers: [ImagesController],
  exports: [ImagesService],
})
export class ImagesModule {}
