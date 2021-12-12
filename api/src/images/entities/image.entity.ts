import { ConfigService } from '@nestjs/config';
import { InputType, ObjectType } from '@nestjs/graphql';
import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
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
  @JoinColumn({ name: 'itemId' })
  item: Item;

  @Column()
  itemId: number;

  @Column({ default: false, type: 'boolean' })
  main: boolean;

  @AfterLoad()
  updatePath() {
    const configService = new ConfigService();
    if (!this.path.includes('http'))
      this.path = `${configService.get('SERVER_URL_ORIGIN')}/${this.path}`;
  }
}
