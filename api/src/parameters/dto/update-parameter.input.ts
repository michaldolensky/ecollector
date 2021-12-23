import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateParameterInput } from './create-parameter.input';

@InputType()
export class UpdateParameterInput extends PartialType(CreateParameterInput) {
  @Field(() => Int)
  id: number;
}
