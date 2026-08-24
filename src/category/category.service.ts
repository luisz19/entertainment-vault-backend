import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(userId: string): Promise<Category[]> {
    const query = this.categoryRepository.createQueryBuilder('category');
    query.where('category.userId = :userId', { userId });
    return query.getMany();
  }

  async findOneOrFail(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.findOneOrFail(id);
    return category;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      where: {
        name: createCategoryDto.name,
        userId: createCategoryDto.userId,
      },
    });

    if (existingCategory) {
      throw new ConflictException(
        'Category with the same name already exists for this user.',
      );
    }

    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOneOrFail(id);

    Object.assign(category, updateCategoryDto);
    console.log('Updated category:', category);
    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await this.findOneOrFail(id);

    await this.categoryRepository.delete(category.id);
  }
}
