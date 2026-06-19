import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MediaModule } from './media/media.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UserModule, MediaModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
