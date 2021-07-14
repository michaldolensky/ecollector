import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../../auth/role.enum';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@ObjectType('User')
@InputType('UserInput')
@Entity({ name: 'users' })
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @IsString()
  @MinLength(3)
  @Index({ unique: true })
  @Column({ length: 50 })
  username: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  @Index({ unique: true })
  @Column({ length: 254 })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Column('text')
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @IsString()
  @MaxLength(50)
  @Column({ length: 50, nullable: true })
  @Field({ nullable: true })
  firstName?: string | null;

  @IsString()
  @MaxLength(50)
  @Column({ length: 50, nullable: true })
  @Field({ nullable: true })
  lastName?: string | null;

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
