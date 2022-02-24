import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateImageInput {
  @Field(() => Int)
  id: number;
  main: boolean;
}
