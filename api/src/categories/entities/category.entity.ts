import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Site } from '../../sites/entities/site.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@ObjectType('Category')
@InputType('CategoryInput')
@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @Column('text')
  @Field(() => String)
  name: string;

  @Field(() => String)
  @Column('text')
  perex: string;

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
}
