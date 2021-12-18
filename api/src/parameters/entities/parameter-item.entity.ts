import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Item } from '../../items/entities/item.entity';
import { Parameter } from './parameter.entity';

@ObjectType()
@Entity()
export class ParameterToItem extends BaseEntity {
  @Column()
  itemId: number;

  @Column()
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
