import { ConfigService } from '@nestjs/config';
import { InputType, ObjectType } from '@nestjs/graphql';
import { Factory } from 'nestjs-seeder';
import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Item } from '../../items/entities/item.entity';

@ObjectType('Image')
@InputType('ImageInput')
@Entity()
export class Image extends BaseEntity {
  @Factory((faker) => faker.random.word())
  @Column()
  filename: string;
  @Factory((faker) => faker.random.word())
  @Column()
  originalName: string;
  @Factory(() => 'https://picsum.photos/500/500')
  @Column()
  path: string;

  @Factory((faker) => faker.random.number({ min: 0, max: 100 }))
  @Column()
  size: number;

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

  @AfterLoad()
  updatePath() {
    const configService = new ConfigService();
    if (!this.path.includes('http'))
      this.path = `${configService.get('SERVER_URL_ORIGIN')}/${this.path}`;
  }
}
