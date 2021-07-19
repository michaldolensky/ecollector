import { CreateCategoryInput } from './create-category.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

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

  @Field(() => Int)
  siteId: number;
}
