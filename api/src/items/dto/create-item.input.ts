import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  categoryId: number;
}