import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

@ArgsType()
export class GetItemsArgs {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Field(() => Int)
  siteId?: number;
}
