import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Site } from '../../sites/entities/site.entity';

@ObjectType('Category')
@Entity({ name: 'categories' })
export class Category {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  @Field(() => String)
  name: string;

  @Field(() => String)
  @Column('text')
  perex: string;

  // @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.children)
  parent: Category;

  @RelationId((category: Category) => category.parent)
  parentId: number;

  @Field(() => [Category], { nullable: 'items' })
  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  // @Field(() => Site)
  @ManyToOne(() => Site, (site) => site.categories)
  site: Site;

  @RelationId((category: Category) => category.site)
  @Field(() => Int)
  siteId: number;

  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
