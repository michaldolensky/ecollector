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
  urlString!: string;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn()
  owner: User;
}
