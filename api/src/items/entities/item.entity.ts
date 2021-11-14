import { Field, HideField, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, MaxLength } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Image } from '../../images/entities/image.entity';
import { Site } from '../../sites/entities/site.entity';

@ObjectType('Item')
@InputType('ItemInput')
@Entity({ name: 'items' })
export class Item extends BaseEntity {
  @Column('text')
  @MaxLength(100)
  name: string;

  @Column({ default: '' })
  @MaxLength(250)
  shortDesc: string;

  @Column({ default: '' })
  @MaxLength(15000)
  longDesc: string;

  @Column({ default: '' })
  @MaxLength(50)
  internalNumber: string;

  @IsNumber()
  @Column({ default: 0 })
  @Field(() => Int)
  numberForExchange: number;

  @IsNumber()
  @Column({ default: 0 })
  @Field(() => Int)
  numberInCollection: number;

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
    onDelete: 'CASCADE',
    cascade: ['update', 'remove', 'insert'],
  })
  @Field(() => [Image], { nullable: 'itemsAndList' })
  images: Image[];
}
