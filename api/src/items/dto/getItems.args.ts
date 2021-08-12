import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { SiteIdArgs } from '../../common/args/siteId.args';

@ArgsType()
export class GetItemsArgs extends SiteIdArgs {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Field(() => Int)
  categoryId?: number;
}
@ArgsType()
export class GetItemsArgsWithout {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Field(() => Int)
  categoryId?: number;
}
