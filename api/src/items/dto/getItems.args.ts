import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, MaxLength, Min } from 'class-validator';
import { SiteIdArgs } from '../../common/args/siteId.args';

@InputType()
export class ItemFilterInput {
  @MaxLength(100)
  name?: string;

  @MaxLength(50)
  internalNumber?: string;

  @IsNumber()
  @Field(() => Int)
  numberForExchange?: number;

  @IsNumber()
  @Field(() => Int)
  numberInCollection?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Field(() => Int)
  categoryId?: number;
}

@ArgsType()
export class GetItemsArgs extends SiteIdArgs {
  @IsOptional()
  @Field(() => ItemFilterInput)
  filter?: ItemFilterInput;
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
