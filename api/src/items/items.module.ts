import { forwardRef, Module } from '@nestjs/common';
import { ImagesModule } from '../images/images.module';
import { ParametersModule } from '../parameters/parameters.module';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { CategoriesModule } from '../categories/categories.module';

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
