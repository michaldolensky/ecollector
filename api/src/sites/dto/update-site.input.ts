import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateSiteInput {
  @Field(() => Int)
  id!: number;
  @Field()
  name!: string;
}
