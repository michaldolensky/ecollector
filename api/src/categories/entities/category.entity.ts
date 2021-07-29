import { Field, HideField, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Site } from '../../sites/entities/site.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { Item } from '../../items/entities/item.entity';

@ObjectType('Category')
@InputType('CategoryInput')
@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @Column('text')
  name: string;

  @Column('text')
  perex: string;

  @HideField()
  @ManyToOne(() => Category, (category) => category.subCategory)
  @JoinColumn({ name: 'parentId' })
  parent: Category;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  parentId: number;

  @Field(() => [Category], { nullable: 'itemsAndList' })
  @OneToMany(() => Category, (category) => category.parent)
  subCategory: Category[];

  @Field(() => Site)
  @ManyToOne(() => Site, (site) => site.categories)
  @JoinColumn({ name: 'siteId' })
  site: Site;

  @Column()
  siteId: number;

  @Field(() => [Item], { nullable: 'itemsAndList' })
  @OneToMany(() => Item, (item) => item.category)
  items?: Item[];
}
