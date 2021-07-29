import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { SiteIdArgs } from '../../common/args/siteId.args';

@InputType()
export class DeleteItemInput {
  @Field(() => Int)
  itemId: number;
}

@ArgsType()
export class DeleteItemArgs extends SiteIdArgs {
  @Field(() => DeleteItemInput)
  deleteItemInput: DeleteItemInput;
}
