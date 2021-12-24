import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { SiteIdArgs } from '../../common/args/siteId.args';

@InputType()
export class CreateItemParameterInput {
  value: string;
}

@ArgsType()
export class CreateItemParameterArgs extends SiteIdArgs {
  @Field(() => CreateItemParameterInput)
  createItemParameterInput: CreateItemParameterInput;
}
