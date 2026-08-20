import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { UserModule } from 'src/user/user.module';
// mport { CategoryRepository } from './repositories/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), UserModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
