import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';
import { SiteIdArgs } from '../../common/args/siteId.args';

@InputType()
export class CategoryFilterInput {
  @MaxLength(100)
  name?: string;
}

@ArgsType()
export class GetCategoriesArgs extends SiteIdArgs {
  @IsOptional()
  @Field(() => CategoryFilterInput)
  filter?: CategoryFilterInput;
}
