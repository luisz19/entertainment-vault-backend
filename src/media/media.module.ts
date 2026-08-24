import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { AuthModule } from 'src/auth/auth.module';
// import { MediaRepository } from './repositories/media.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Media]), AuthModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
