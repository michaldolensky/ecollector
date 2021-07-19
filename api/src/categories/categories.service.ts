import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput) {
    const category = new Category();
    console.log(createCategoryInput);

    category.name = createCategoryInput.name;
    category.perex = createCategoryInput.perex;
    category.parentId = createCategoryInput.parentId;
    category.siteId = createCategoryInput.siteId;

    await this.categoriesRepository.save(category);

    return category;
  }

  async findAll() {
    return await this.categoriesRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne({ id });
    if (category) {
      return category;
    }
    throw new HttpException(
      'Category with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateCategoryInput: Partial<UpdateCategoryInput>) {
    const category = await this.findOne(id);
    if (!category) throw new BadRequestException('Invalid category');
    Object.assign(category, updateCategoryInput);
    await this.categoriesRepository.update(id, category);
    return category;
  }

  async remove(id: number): Promise<void> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) throw new Error('Category not found!');
    await this.categoriesRepository.delete(id);
  }

  async getCategoriesWithSiteId(siteId: number): Promise<Category[]> {
    return await this.categoriesRepository.find({ where: { siteId } });
  }

  async getChildrenOfParentOfId(parentId: number): Promise<Category[]> {
    return await this.categoriesRepository.find({
      where: { parentId },
    });
  }
}
