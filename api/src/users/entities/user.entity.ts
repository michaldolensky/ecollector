import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { UserRole } from '../../auth/role.enum';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BaseEntity } from '../../common/entities/base.entity';
import { Site } from '../../sites/entities/site.entity';

@ObjectType('User')
@InputType('UserInput')
@Entity({ name: 'users' })
export class User extends BaseEntity {
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

  @Field(() => [Site], { nullable: 'itemsAndList' })
  @OneToMany(() => Site, (site) => site.owner)
  sites: Site[];

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
}
