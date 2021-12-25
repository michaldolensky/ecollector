import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { SiteIdArgs } from '../../common/args/siteId.args';

@InputType()
export class DeleteParameterInput {
  @Field(() => Int)
  parameterId: number;
}

@ArgsType()
export class DeleteParameterArgs extends SiteIdArgs {
  @Field(() => DeleteParameterInput)
  deleteParameterInput: DeleteParameterInput;
}
