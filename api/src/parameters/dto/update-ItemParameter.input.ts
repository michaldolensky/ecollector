import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { SiteIdArgs } from '../../common/args/siteId.args';
import { CreateItemParameterInput } from './create-ItemParameter.input';

@InputType()
export class UpdateItemParameterInput extends CreateItemParameterInput {
  @Field(() => Int)
  id: number;
}

@ArgsType()
export class UpdateItemParameterArgs extends SiteIdArgs {
  @Field(() => UpdateItemParameterInput)
  updateItemParameterInput: UpdateItemParameterInput;
}
