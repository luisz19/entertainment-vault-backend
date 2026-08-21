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
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { findOneParams } from 'src/find-one.params';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category';
import { CurrentUserId } from 'src/user/decorators/current-user-id.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('categories')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async findAll(@CurrentUserId() userId: string): Promise<Category[]> {
    return this.categoryService.findAll(userId);
  }

  @Post()
  public async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUserId() userId: string,
  ): Promise<Category> {
    return this.categoryService.createCategory({
      ...createCategoryDto,
      userId,
    });
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
