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
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  verifyPassword: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @Field()
  firstName: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @Field()
  lastName: string;
}
