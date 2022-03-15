import { InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { S3File } from '../../files/file.entity';
import { Item } from '../../items/entities/item.entity';

@ObjectType('Image')
@InputType('ImageInput')
@Entity()
export class Image extends BaseEntity {
  @Column()
  originalName: string;

  @ManyToOne(() => Item, (item) => item.images, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'itemId' })
  item: Item;

  @Column()
  itemId: number;

  @Column({ default: false, type: 'boolean' })
  main: boolean;

  @OneToOne(() => S3File, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  file: S3File;
}
