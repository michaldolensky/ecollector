import { ArgsType, Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNumber, MaxLength } from 'class-validator';
import { SiteIdArgs } from '../../common/args/siteId.args';
import { UpdateImageInput } from '../../images/dto/update-image.input';
import { Image } from '../../images/entities/image.entity';
import { ItemParameter } from '../../parameters/entities/item-parameter.entity';
import { CreateItemInput } from './create-item.input';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => Int)
  id: number;

  @Field()
  @MaxLength(100)
  name: string;

  @MaxLength(250)
  shortDesc: string;

  @MaxLength(15000)
  longDesc: string;

  @MaxLength(50)
  internalNumber: string;
  @IsNumber()
  @Field(() => Int)
  numberForExchange: number;
  @IsNumber()
  @Field(() => Int)
  numberInCollection: number;

  @Field(() => Int)
  categoryId: number;

  @Field(() => [UpdateImageInput], { nullable: 'itemsAndList' })
  images?: Image[];

  @Field(() => [ItemParameter], { nullable: 'itemsAndList' })
  itemParameters?: ItemParameter[];
}
@ArgsType()
export class UpdateItemArgs extends SiteIdArgs {
  @Field(() => UpdateItemInput)
  updateItemInput: UpdateItemInput;
}
