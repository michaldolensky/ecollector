import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Factory } from 'nestjs-seeder';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Parameter } from '../../parameters/entities/parameter.entity';
import { Site } from '../../sites/entities/site.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { Item } from '../../items/entities/item.entity';

@ObjectType('Category')
@InputType('CategoryInput')
@Entity()
export class Category extends BaseEntity {
  @Factory((faker) => faker.lorem.words(5))
  @Column('text')
  name: string;

  @Factory((faker) => faker.lorem.paragraph(5))
  @Column('text')
  perex: string;

  @Field(() => Site)
  @ManyToOne(() => Site, (site) => site.categories)
  @JoinColumn({ name: 'siteId' })
  site: Site;

  @Factory((faker, ctx) => ctx.siteId)
  @Column()
  siteId: number;

  @Field(() => [Item], { nullable: 'itemsAndList' })
  @OneToMany(() => Item, (item) => item.category)
  items?: Item[];

  @ManyToMany(() => Parameter, (parameter) => parameter.categories)
  parameters: Parameter[];
}
