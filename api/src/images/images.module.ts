import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from '../items/items.module';
import { Image } from './entities/image.entity';
import { ImagesController } from './images.controller';
import { ImagesResolver } from './images.resolver';
import { ImagesService } from './images.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), forwardRef(() => ItemsModule)],
  providers: [ImagesResolver, ImagesService],
  controllers: [ImagesController],
  exports: [ImagesService],
})
export class ImagesModule {}
