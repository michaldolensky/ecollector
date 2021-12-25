import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { SiteIdArgs } from '../../common/args/siteId.args';

@InputType()
export class CreateItemParameterInput {
  value: string;

  @Field(() => Int)
  itemId: number;
  @Field(() => Int)
  parameterId: number;
}

@ArgsType()
export class CreateItemParameterArgs extends SiteIdArgs {
  @Field(() => CreateItemParameterInput)
  createItemParameterInput: CreateItemParameterInput;
}
