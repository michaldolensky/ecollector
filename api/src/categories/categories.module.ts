import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { SitesModule } from '../sites/sites.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), SitesModule],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
