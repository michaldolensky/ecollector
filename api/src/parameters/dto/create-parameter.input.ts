import { Field, InputType } from '@nestjs/graphql';
import { ParameterType } from '../parameter-type.enum';

@InputType()
export class CreateParameterInput {
  @Field(() => [ParameterType], { nullable: true })
  type: ParameterType;

  name: string;
}
