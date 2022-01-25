import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { SiteIdArgs } from '../../common/args/siteId.args';

@InputType()
export class UploadImageDto {
  @Field(() => Int)
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  itemId: number;

  @Field(() => [GraphQLUpload])
  files: FileUpload[];
}

@ArgsType()
export class UploadImageArgs extends SiteIdArgs {
  @Field(() => UploadImageDto)
  uploadImageInput: UploadImageDto;
}
