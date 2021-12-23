import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';
import { ItemParameter } from './entities/ItemParameter.entity';
import { Parameter } from './entities/parameter.entity';
import { ParametersResolver } from './parameters.resolver';
import { ParametersService } from './parameters.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parameter, ItemParameter]),
    forwardRef(() => CategoriesModule),
  ],
  providers: [ParametersResolver, ParametersService],
  exports: [ParametersService],
})
export class ParametersModule {}
