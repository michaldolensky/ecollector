import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { SiteIdArgs } from '../../common/args/siteId.args';

@InputType()
export class DeleteCategoryInput {
  @Field(() => Int)
  categoryId: number;
}

@ArgsType()
export class DeleteCategoryArgs extends SiteIdArgs {
  @Field(() => DeleteCategoryInput)
  deleteCategoryInput: DeleteCategoryInput;
}
