import { CreateItemInput } from './create-item.input';
import { ArgsType, Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { SiteIdArgs } from '../../common/args/siteId.args';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
@ArgsType()
export class UpdateItemArgs extends SiteIdArgs {
  @Field(() => UpdateItemInput)
  updateItemInput: UpdateItemInput;
}
