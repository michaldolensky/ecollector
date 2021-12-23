import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemParameter } from './entities/ItemParameter.entity';
import { Parameter } from './entities/parameter.entity';
import { ParametersResolver } from './parameters.resolver';
import { ParametersService } from './parameters.service';

@Module({
  imports: [TypeOrmModule.forFeature([Parameter, ItemParameter])],
  providers: [ParametersResolver, ParametersService],
  exports: [ParametersService],
})
export class ParametersModule {}
