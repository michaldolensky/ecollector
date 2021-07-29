import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { SiteIdArgs } from '../../common/args/siteId.args';

@InputType()
export class CreateItemInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  categoryId: number;
}

@ArgsType()
export class CreateItemArgs extends SiteIdArgs {
  @Field(() => CreateItemInput)
  createItemInput: CreateItemInput;
}
