import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { Item } from '../../items/entities/item.entity';

@ObjectType('Site')
@Entity({ name: 'sites' })
@InputType('SiteInput')
export class Site extends BaseEntity {
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

  @Column()
  ownerId: number;
}
