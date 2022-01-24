import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';
import { ImagesModule } from '../images/images.module';
import { ParametersModule } from '../parameters/parameters.module';
import { Item } from './entities/item.entity';
import { ItemsResolver } from './items.resolver';
import { ItemsService } from './items.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    forwardRef(() => CategoriesModule),
    forwardRef(() => ImagesModule),
    forwardRef(() => ParametersModule),
  ],
  providers: [ItemsResolver, ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}
