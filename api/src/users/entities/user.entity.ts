import { Field, HideField, InputType, ObjectType } from '@nestjs/graphql';
import { Factory } from 'nestjs-seeder';
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
@Entity()
export class User extends BaseEntity {
  @Factory((faker) => faker.internet.exampleEmail())
  @Field()
  @IsEmail()
  @IsNotEmpty()
  @Index({ unique: true })
  @Column({ length: 254 })
  email: string;

  @Factory((faker, ctx) => ctx.passwordHash)
  @HideField()
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
  @OneToMany(() => Site, (site) => site.owner, { onDelete: 'CASCADE' })
  sites: Site[];

  @Factory((faker) => faker.name.firstName())
  @IsString()
  @MaxLength(50)
  @Column({ length: 50, nullable: true })
  @Field({ nullable: true })
  firstName?: string | null;

  @Factory((faker) => faker.name.lastName())
  @IsString()
  @MaxLength(50)
  @Column({ length: 50, nullable: true })
  @Field({ nullable: true })
  lastName?: string | null;
}
