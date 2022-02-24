import { HideField, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType('S3File')
@InputType('FileInput')
@Entity()
export class S3File {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string;

  @HideField()
  @Column()
  public key: string;
}
