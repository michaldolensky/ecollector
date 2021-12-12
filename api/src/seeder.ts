import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { Category } from './categories/entities/category.entity';
import { DatabaseModule } from './config/database/database.module';
import { Image } from './images/entities/image.entity';
import { Item } from './items/entities/item.entity';
import { Site } from './sites/entities/site.entity';
import { User } from './users/entities/user.entity';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { InsertResult, Repository } from 'typeorm';

// FILTHY SOLUTION FOR SEEDER

const PASSWORD_HASH = process.env.PASSWORD_HASH;
const USER_ID: number | null = null;
const SITE_ID: number | null = null;
const CATEGORY_ID: number | null = null;
const ITEM_ID: number | null = null;

const NUMBER_OF_USERS = 1;
const NUMBER_OF_SITES = 1;
const NUMBER_OF_CATEGORIES = 1;
const NUMBER_OF_ITEMS = 1;
const NUMBER_OF_IMAGES = 1;

type CustomId = { identifiers: [{ id: number }] };
type IdTypes = InsertResult | CustomId;

const getIdsFromResult = (result: IdTypes) => {
  return result.identifiers.map((value) => value.id);
};

const getCustomId = (id: number): CustomId => ({ identifiers: [{ id }] });

@Injectable()
export class GlobalSeeder implements Seeder {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Site)
    private siteRepository: Repository<Site>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async seed(): Promise<any> {
    let insertedUsers: IdTypes;
    if (!USER_ID) {
      const users = DataFactory.createForClass(User).generate(NUMBER_OF_USERS, {
        passwordHash: PASSWORD_HASH,
      });
      insertedUsers = await this.userRepository.insert(users);
    } else {
      insertedUsers = getCustomId(USER_ID);
    }

    for (const ownerId of getIdsFromResult(insertedUsers)) {
      let insertedSites: IdTypes;
      if (!SITE_ID) {
        const sites = DataFactory.createForClass(Site).generate(
          NUMBER_OF_SITES,
          {
            ownerId,
          },
        );
        insertedSites = await this.siteRepository.insert(sites);
      } else {
        insertedSites = getCustomId(SITE_ID);
      }

      for (const siteId of getIdsFromResult(insertedSites)) {
        let insertedCategories: IdTypes;
        if (!CATEGORY_ID) {
          const categories = DataFactory.createForClass(Category).generate(
            NUMBER_OF_CATEGORIES,
            {
              siteId,
            },
          );
          insertedCategories = await this.categoryRepository.insert(categories);
        } else {
          insertedCategories = getCustomId(CATEGORY_ID);
        }

        for (const categoryId of getIdsFromResult(insertedCategories)) {
          let insertedItems: IdTypes;
          if (!ITEM_ID) {
            const items = DataFactory.createForClass(Item).generate(
              NUMBER_OF_ITEMS,
              {
                categoryId,
              },
            );
            insertedItems = await this.itemRepository.insert(items);
          } else {
            insertedItems = getCustomId(ITEM_ID);
          }

          for (const itemId of getIdsFromResult(insertedItems)) {
            const mainImage = DataFactory.createForClass(Image).generate(1, {
              itemId,
              main: true,
            });
            const images = DataFactory.createForClass(Image).generate(
              NUMBER_OF_IMAGES,
              {
                itemId,
                main: false,
              },
            );
            await this.imageRepository.insert(mainImage);
            await this.imageRepository.insert(images);
          }
        }
      }
    }
  }

  async drop(): Promise<any> {
    await this.imageRepository.delete({});
    await this.itemRepository.delete({});
    await this.categoryRepository.delete({});
    await this.siteRepository.delete({});
    await this.userRepository.delete({});
  }
}

seeder({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Item, Category, Site, User, Image]),
  ],
}).run([GlobalSeeder]);
