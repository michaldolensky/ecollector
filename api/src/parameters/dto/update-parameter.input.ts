import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateParameterInput } from './create-parameter.input';

@InputType()
export class UpdateParameterInput extends CreateParameterInput {
  @Field(() => Int)
  id: number;
}
