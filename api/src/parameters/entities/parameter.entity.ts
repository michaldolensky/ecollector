import { HideField, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { ParameterType } from '../parameter-type.enum';
import { ParameterToItem } from './parameter-item.entity';

@ObjectType()
@Entity({ name: 'parameters' })
export class Parameter extends BaseEntity {
  @ManyToMany(() => Category)
  @JoinTable()
  category: Category[];

  @Column()
  name: string;
  @Column()
  type: ParameterType;

  @HideField()
  @OneToMany(() => ParameterToItem, (parameterToItem) => parameterToItem.item)
  parameterToItems: ParameterToItem[];
}
