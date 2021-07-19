import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/entities/base.entity';

@ObjectType()
export class Item extends BaseEntity {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
