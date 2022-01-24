import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

@ArgsType()
export class GetImagesArgs {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Field(() => Int)
  itemId?: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @Field(() => Boolean)
  main?: boolean;
}
