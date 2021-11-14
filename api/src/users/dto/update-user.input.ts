import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
}
