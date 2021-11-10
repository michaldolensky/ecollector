import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { SiteIdArgs } from '../../common/args/siteId.args';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  perex: string;
}

@ArgsType()
export class CreateCategoryArgs extends SiteIdArgs {
  @Field(() => CreateCategoryInput)
  createCategoryInput: CreateCategoryInput;
}
