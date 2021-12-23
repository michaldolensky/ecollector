import { Field, InputType } from '@nestjs/graphql';
import { ParameterType } from '../parameter-type.enum';

@InputType()
export class CreateParameterInput {
  @Field(() => ParameterType)
  type: ParameterType;

  name: string;
}
