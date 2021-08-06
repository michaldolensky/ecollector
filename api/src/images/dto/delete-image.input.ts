import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { SiteIdArgs } from '../../common/args/siteId.args';

@InputType()
export class DeleteImageInput {
  @Field(() => Int)
  id: number;
}

@ArgsType()
export class DeleteImageArgs extends SiteIdArgs {
  @Field(() => DeleteImageInput)
  deleteImageInput: DeleteImageInput;
}
