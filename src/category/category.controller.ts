import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { findOneParams } from 'src/find-one.params';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  public async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get('/:id')
  public async findOne(
    @Param() params: findOneParams,
  ): Promise<Category | null> {
    return this.categoryService.findOne(params.id);
  }

  @Post('/create')
  public async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Patch('/:id')
  public async updateCategory(
    @Param() params: findOneParams,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(params.id, updateCategoryDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteCategory(@Param() params: findOneParams): Promise<void> {
    return this.categoryService.deleteCategory(params.id);
  }
}
