import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@ObjectType('User')
@InputType('UserInput')
@Entity({ name: 'users' })
@Unique(['email', 'username'])
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 50 })
  username: string;

  @Field()
  @Column({ length: 254 })
  email: string;

  @Column()
  password: string;

  @Column({ length: 50, nullable: true })
  @Field({ nullable: true })
  firstName?: string;

  @Column({ length: 50, nullable: true })
  @Field({ nullable: true })
  lastName?: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
