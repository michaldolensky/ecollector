import { Field, InputType, Int } from '@nestjs/graphql';
import { S3File } from '../../files/file.entity';

@InputType()
export class CreateImageInput {
  originalName: string;

  file: S3File;

  @Field(() => Int)
  itemId: number;

  main: boolean;
}
