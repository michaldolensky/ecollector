import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@ObjectType('Site')
@Entity({ name: 'sites' })
@Unique(['urlString'])
export class Site {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

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
  @JoinColumn()
  owner: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
