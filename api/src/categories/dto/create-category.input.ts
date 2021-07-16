import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  perex: string;

  @Field(() => Int, { nullable: true })
  parent: number;

  @Field(() => Int)
  site: number;
}
