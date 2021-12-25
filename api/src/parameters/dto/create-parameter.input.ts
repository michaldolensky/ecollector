import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { SiteIdArgs } from '../../common/args/siteId.args';
import { ParameterType } from '../parameter-type.enum';

@InputType()
export class CreateParameterInput {
  @Field(() => ParameterType)
  type: ParameterType;

  name: string;
}

@ArgsType()
export class CreateParameterArgs extends SiteIdArgs {
  @Field(() => CreateParameterInput)
  createParameterInput: CreateParameterInput;
}
