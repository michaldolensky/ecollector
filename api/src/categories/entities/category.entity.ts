import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Site } from '../../sites/entities/site.entity';
import { BaseEntity } from '../../common/BaseEntity';

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

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.children)
  @JoinColumn({ name: 'parentId' })
  parent: Category;

  @Column({ nullable: true })
  parentId: number;

  @Field(() => [Category], { nullable: 'itemsAndList' })
  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @Field(() => Site)
  @ManyToOne(() => Site, (site) => site.categories)
  @JoinColumn({ name: 'siteId' })
  site: Site;

  @Column()
  siteId: number;
}
