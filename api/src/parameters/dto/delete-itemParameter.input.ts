import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { SiteIdArgs } from '../../common/args/siteId.args';

@InputType()
export class DeleteItemParameterInput {
  @Field(() => Int)
  ItemParameterId: number;
}

@ArgsType()
export class DeleteItemParameterArgs extends SiteIdArgs {
  @Field(() => DeleteItemParameterInput)
  deleteItemParameterInput: DeleteItemParameterInput;
}
