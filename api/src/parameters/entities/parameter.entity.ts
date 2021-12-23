import { Field, HideField, InputType, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { Site } from '../../sites/entities/site.entity';
import { ParameterType } from '../parameter-type.enum';
import { ItemParameter } from './ItemParameter.entity';

@ObjectType()
@InputType('ParameterInput')
@Entity()
export class Parameter extends BaseEntity {
  @ManyToMany(() => Category, {
    nullable: true,
    cascade: true,
  })
  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ParameterType,
    default: ParameterType.TEXT,
  })
  @Field(() => ParameterType)
  type: ParameterType;

  @HideField()
  @OneToMany(() => ItemParameter, (parameterToItem) => parameterToItem.item)
  parameterToItems: ItemParameter[];

  @Field(() => Site)
  @ManyToOne(() => Site, (site) => site.parameters)
  @JoinColumn({ name: 'siteId' })
  site: Site;

  @Column()
  siteId: number;
}
