import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Site } from '../../sites/entities/site.entity';
import { BaseEntity } from '../../common/BaseEntity';

@ObjectType('Category')
@Entity({ name: 'categories' })
export class Category extends BaseEntity {
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
}
