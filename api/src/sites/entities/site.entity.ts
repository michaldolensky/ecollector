import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  Unique,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { BaseEntity } from '../../common/BaseEntity';

@ObjectType('Site')
@Entity({ name: 'sites' })
@Unique(['urlString'])
export class Site extends BaseEntity {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  urlString: string;

  @OneToMany(() => Category, (category) => category.site)
  categories: Category[];

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;
}
