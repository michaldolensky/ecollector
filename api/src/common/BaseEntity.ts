import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
