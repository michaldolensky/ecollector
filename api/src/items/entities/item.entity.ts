import { Field, HideField, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, MaxLength } from 'class-validator';
import { Factory } from 'nestjs-seeder';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Image } from '../../images/entities/image.entity';
import { Site } from '../../sites/entities/site.entity';

@ObjectType('Item')
@InputType('ItemInput')
@Entity({ name: 'items' })
export class Item extends BaseEntity {
  @Factory((faker) => faker.lorem.words(5))
  @Column('text')
  @MaxLength(100)
  name: string;

  @Factory((faker) => faker.lorem.paragraph(5))
  @Column({ default: '' })
  @MaxLength(250)
  shortDesc: string;

  @Factory((faker) => faker.lorem.lines(10))
  @Column({ default: '' })
  @MaxLength(15000)
  longDesc: string;

  @Factory((faker) => faker.random.word())
  @Column({ default: '' })
  @MaxLength(50)
  internalNumber: string;

  @Factory((faker) => faker.random.number({ min: 0, max: 100 }))
  @IsNumber()
  @Column({ default: 0 })
  @Field(() => Int)
  numberForExchange: number;

  @Factory((faker) => faker.random.number({ min: 0, max: 100 }))
  @IsNumber()
  @Column({ default: 0 })
  @Field(() => Int)
  numberInCollection: number;

  @ManyToOne(() => Category, (category) => category.items)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Factory((faker, ctx) => ctx.categoryId)
  @Field(() => Int)
  @Column()
  categoryId: number;

  @Field(() => Site)
  @ManyToOne(() => Site, (site) => site.categories)
  @JoinColumn({ name: 'siteId' })
  site: Site;

  @Factory((faker, ctx) => ctx.siteId)
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
