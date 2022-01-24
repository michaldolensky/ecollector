import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, MaxLength } from 'class-validator';
import { SiteIdArgs } from '../../common/args/siteId.args';

@InputType()
export class CreateItemInput {
  @MaxLength(100)
  name: string;

  @MaxLength(250)
  shortDesc: string;
  @MaxLength(15000)
  longDesc: string;

  @MaxLength(50)
  internalNumber: string;

  @IsNumber()
  @Field(() => Int)
  numberForExchange: number;

  @IsNumber()
  @Field(() => Int)
  numberInCollection: number;

  @Field(() => Int)
  categoryId: number;
}

@ArgsType()
export class CreateItemArgs extends SiteIdArgs {
  @Field(() => CreateItemInput)
  createItemInput: CreateItemInput;
}
