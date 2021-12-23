import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Item } from '../../items/entities/item.entity';
import { Parameter } from './parameter.entity';

@ObjectType()
@InputType('ItemParameterInput')
@Entity()
export class ItemParameter extends BaseEntity {
  @RelationId((parameterToItem: ItemParameter) => parameterToItem.item)
  itemId: number;

  @RelationId((parameterToItem: ItemParameter) => parameterToItem.parameter)
  parameterId: number;

  @Field(() => Item)
  @ManyToOne(() => Item, (item) => item.parameterToItems)
  item: Item;

  @Field(() => Parameter)
  @ManyToOne(() => Parameter, (parameter) => parameter.parameterToItems)
  parameter: Parameter;

  @Column()
  value: string;
}
