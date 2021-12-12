import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class UploadImageDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  siteId: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  itemId: number;
}
