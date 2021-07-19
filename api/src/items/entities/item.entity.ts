import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@ObjectType('Item')
@InputType('ItemInput')
@Entity({ name: 'items' })
export class Item extends BaseEntity {
  @Column('text')
  @Field(() => String)
  name: string;

  @ManyToOne(() => Category, (category) => category.items)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Field(() => Int)
  @Column()
  categoryId: number;
}
