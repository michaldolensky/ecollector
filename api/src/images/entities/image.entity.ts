import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { InputType, ObjectType } from '@nestjs/graphql';
import { Item } from '../../items/entities/item.entity';

@ObjectType('Image')
@InputType('ImageInput')
@Entity('images')
export class Image extends BaseEntity {
  @Column()
  filename: string;
  @Column()
  originalName: string;
  @Column()
  path: string;
  @Column()
  size: number;

  @ManyToOne(() => Item, (item) => item.images, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  item: Item;
}
