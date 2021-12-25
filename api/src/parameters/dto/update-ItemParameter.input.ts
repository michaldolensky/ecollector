import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { SiteIdArgs } from '../../common/args/siteId.args';
import { UpdateParameterInput } from './update-parameter.input';

@InputType()
export class UpdateItemParameterInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  value: string;

  @Field(() => UpdateParameterInput, { nullable: true })
  parameter: UpdateParameterInput;
}

@ArgsType()
export class UpdateItemParameterArgs extends SiteIdArgs {
  @Field(() => UpdateItemParameterInput)
  updateItemParameterInput: UpdateItemParameterInput;
}
