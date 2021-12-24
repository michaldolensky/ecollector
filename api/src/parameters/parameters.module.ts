import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemParameter } from './entities/itemParameter.entity';
import { Parameter } from './entities/parameter.entity';
import { ItemParametersResolver } from './itemParameters.resolver';
import { ParametersResolver } from './parameters.resolver';
import { ParametersService } from './parameters.service';

@Module({
  imports: [TypeOrmModule.forFeature([Parameter, ItemParameter])],
  providers: [ParametersResolver, ItemParametersResolver, ParametersService],
  exports: [ParametersService],
})
export class ParametersModule {}
