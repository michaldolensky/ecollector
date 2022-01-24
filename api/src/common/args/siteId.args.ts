import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

@ArgsType()
export class SiteIdArgs {
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @Field(() => Int)
  siteId: number;
}
