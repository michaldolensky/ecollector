import { Field, HideField, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Site } from '../../sites/entities/site.entity';
import { Image } from '../../images/entities/image.entity';

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

  @Field(() => Site)
  @ManyToOne(() => Site, (site) => site.categories)
  @JoinColumn({ name: 'siteId' })
  site: Site;

  @HideField()
  @Column()
  siteId: number;

  @OneToMany(() => Image, (image) => image.item, {
    eager: true,
  })
  @Field(() => [Image], { nullable: 'itemsAndList' })
  images?: Image[];
}
