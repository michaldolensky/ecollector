import { Field, HideField, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Site } from '../../sites/entities/site.entity';
import { ParameterType } from '../parameter-type.enum';
import { ItemParameter } from './item-parameter.entity';

@ObjectType()
@InputType('ParameterInput')
@Entity()
export class Parameter extends BaseEntity {
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
  @OneToMany(() => ItemParameter, (itemParameters) => itemParameters.item, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  itemParameters: ItemParameter[];

  @Field(() => Site)
  @ManyToOne(() => Site, (site) => site.parameters)
  @JoinColumn({ name: 'siteId' })
  site: Site;

  @Column()
  siteId: number;
}
