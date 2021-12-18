import { Module } from '@nestjs/common';
import { ParametersService } from './parameters.service';
import { ParametersResolver } from './parameters.resolver';

@Module({
  providers: [ParametersResolver, ParametersService],
})
export class ParametersModule {}
