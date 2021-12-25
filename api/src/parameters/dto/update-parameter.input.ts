import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { SiteIdArgs } from '../../common/args/siteId.args';
import { CreateParameterInput } from './create-parameter.input';

@InputType()
export class UpdateParameterInput extends CreateParameterInput {
  @Field(() => Int)
  id: number;
}

@ArgsType()
export class UpdateParameterArgs extends SiteIdArgs {
  @Field(() => UpdateParameterInput)
  updateParameterInput: UpdateParameterInput;
}
