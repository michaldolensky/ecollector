import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { SiteIdArgs } from '../../common/args/siteId.args';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  perex: string;

  @Field(() => Int, { nullable: true })
  parentId: number;
}

@ArgsType()
export class CreateCategoryArgs extends SiteIdArgs {
  @Field(() => CreateCategoryInput)
  createCategoryInput: CreateCategoryInput;
}
