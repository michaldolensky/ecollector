import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemParameter } from './entities/item-parameter.entity';
import { Parameter } from './entities/parameter.entity';
import { ItemParameterResolver } from './itemParameters.resolver';
import { ItemParametersService } from './itemParameters.service';
import { ParametersResolver } from './parameters.resolver';
import { ParametersService } from './parameters.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parameter]),
    TypeOrmModule.forFeature([ItemParameter]),
  ],
  providers: [
    ParametersResolver,
    ParametersService,
    ItemParametersService,
    ItemParameterResolver,
  ],
  exports: [ParametersService, ItemParametersService],
})
export class ParametersModule {}
