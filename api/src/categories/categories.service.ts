import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all category`;
  }

  async findOne(id: number) {
    return await this.categoriesRepository.findOneOrFail(id);
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
