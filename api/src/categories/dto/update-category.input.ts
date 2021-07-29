import { CreateCategoryInput } from './create-category.input';
import { ArgsType, Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { SiteIdArgs } from '../../common/args/siteId.args';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  perex: string;

  @Field(() => Int, { nullable: true })
  parentId: number;
}

@ArgsType()
export class UpdateCategoryArgs extends SiteIdArgs {
  @Field(() => UpdateCategoryInput)
  updateCategoryInput: UpdateCategoryInput;
}
