import { InputType, Field, Int } from '@nestjs/graphql';
import { ParameterType } from '../parameter-type.enum';

@InputType()
export class CreateParameterInput {
  @Field(() => [ParameterType], { nullable: true })
  type: ParameterType;

  name: string;

  @Field(() => [Int], { nullable: true })
  categories: number[];
}
