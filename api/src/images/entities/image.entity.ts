import { InputType, ObjectType } from '@nestjs/graphql';
import { Factory } from 'nestjs-seeder';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { S3File } from '../../files/file.entity';
import { Item } from '../../items/entities/item.entity';

@ObjectType('Image')
@InputType('ImageInput')
@Entity()
export class Image extends BaseEntity {
  @Factory((faker) => faker.random.word())
  @Column()
  originalName: string;

  @ManyToOne(() => Item, (item) => item.images, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'itemId' })
  item: Item;

  @Factory((faker, ctx) => ctx.itemId)
  @Column()
  itemId: number;

  @Factory((faker, ctx) => ctx.main)
  @Column({ default: false, type: 'boolean' })
  main: boolean;

  @OneToOne(() => S3File, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  file: S3File;
}
