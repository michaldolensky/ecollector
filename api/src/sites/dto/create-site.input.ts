import { Field, InputType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@InputType()
export class CreateSiteInput {
  @Field()
  urlString!: string;
  @Field()
  name!: string;

  @Field(() => User)
  owner: User;
}
