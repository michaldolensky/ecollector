import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(3)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @MaxLength(50)
  @Field({ nullable: true })
  firstName?: string;

  @IsString()
  @MaxLength(50)
  @Field({ nullable: true })
  lastName?: string;
}
