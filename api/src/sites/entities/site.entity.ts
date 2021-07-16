import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@ObjectType('Site')
@Entity({ name: 'sites' })
@Unique(['urlString'])
export class Site {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  urlString: string;

  @OneToMany(() => Category, (category) => category.site)
  categories: Category[];

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn()
  owner: User;
}
