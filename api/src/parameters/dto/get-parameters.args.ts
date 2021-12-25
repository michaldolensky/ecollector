import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { SiteIdArgs } from '../../common/args/siteId.args';

@InputType()
export class ParameterFilterInput {
  name?: string;
}

@ArgsType()
export class GetParametersArgs extends SiteIdArgs {
  @IsOptional()
  @Field(() => ParameterFilterInput)
  filter?: ParameterFilterInput;
}
