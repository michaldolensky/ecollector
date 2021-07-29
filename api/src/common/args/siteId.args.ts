import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { Expose, Type } from 'class-transformer';

@ArgsType()
export class SiteIdArgs {
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @Field(() => Int)
  siteId: number;
}
