import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  filename: string;
  originalName: string;
  path: string;
  size: number;

  @Field(() => Int)
  itemId: number;
}
