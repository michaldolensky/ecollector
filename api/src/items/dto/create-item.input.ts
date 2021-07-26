import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  categoryId: number;
  @Field(() => Int)
  siteId: number;
}
