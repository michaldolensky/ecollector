import { CreateParameterInput } from './create-parameter.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateParameterInput extends PartialType(CreateParameterInput) {
  @Field(() => Int)
  id: number;
}
