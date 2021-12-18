import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';
import { ParameterToItem } from './entities/parameter-item.entity';
import { Parameter } from './entities/parameter.entity';
import { ParametersResolver } from './parameters.resolver';
import { ParametersService } from './parameters.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parameter, ParameterToItem]),
    forwardRef(() => CategoriesModule),
  ],
  providers: [ParametersResolver, ParametersService],
  exports: [ParametersService],
})
export class ParametersModule {}
