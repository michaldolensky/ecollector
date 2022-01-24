import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Factory } from 'nestjs-seeder';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { Item } from '../../items/entities/item.entity';
import { Parameter } from '../../parameters/entities/parameter.entity';
import { User } from '../../users/entities/user.entity';
import { SiteStats } from './siteStats';

@ObjectType('Site')
@Entity()
@InputType('SiteInput')
export class Site extends BaseEntity {
  @Factory((faker) => faker.lorem.words(5))
  @Field()
  @Column()
  name: string;

  @Field(() => [Category])
  @OneToMany(() => Category, (category) => category.site, {
    onDelete: 'CASCADE',
  })
  categories: Category[];

  @Field(() => [Item])
  @OneToMany(() => Item, (item) => item.site, { onDelete: 'CASCADE' })
  items: Item[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sites)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Factory((faker, ctx) => ctx.ownerId)
  @Column()
  ownerId: number;

  @Field(() => SiteStats)
  stats: SiteStats;

  @Field(() => [Parameter])
  @OneToMany(() => Parameter, (parameter) => parameter.site)
  parameters: Parameter[];
}
