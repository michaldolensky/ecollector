import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  RelationId,
  Unique,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Item } from '../../items/entities/item.entity';
import { Parameter } from './parameter.entity';

@ObjectType()
@InputType('ItemParameterInput')
@Unique(['itemId', 'parameterId'])
@Entity()
export class ItemParameter extends BaseEntity {
  @RelationId((parameterToItem: ItemParameter) => parameterToItem.item)
  @Column()
  itemId: number;

  @RelationId((parameterToItem: ItemParameter) => parameterToItem.parameter)
  @Column()
  parameterId: number;

  @Field(() => Item)
  @ManyToOne(() => Item, (item) => item.itemParameters, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  item: Item;

  @Field(() => Parameter)
  @ManyToOne(() => Parameter, (parameter) => parameter.itemParameters, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  parameter: Parameter;

  @Column()
  value: string;
}
