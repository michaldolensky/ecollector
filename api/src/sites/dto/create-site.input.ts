import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSiteInput {
  @Field()
  urlString!: string;
  @Field()
  name!: string;

  @Field(() => Int)
  userId: number;
}
