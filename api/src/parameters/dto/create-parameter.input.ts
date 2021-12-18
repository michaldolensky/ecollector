import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateParameterInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
