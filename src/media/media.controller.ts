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
import { MediaService } from './media.service';
import { findOneParams } from 'src/find-one.params';
import { Media } from './entities/media.entity';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { CurrentUserId } from 'src/user/decorators/current-user-id.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('media')
@UseGuards(AuthGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  public async findAll(@CurrentUserId() userId: string): Promise<Media[]> {
    return this.mediaService.findAll(userId);
  }

  @Get('/:id')
  public async findOne(@Param() params: findOneParams): Promise<Media | null> {
    return this.mediaService.findOne(params.id);
  }

  @Post()
  public async createMedia(
    @Body() createMediaDto: CreateMediaDto,
    @CurrentUserId() userId: string,
  ): Promise<Media> {
    return this.mediaService.createMedia({
      ...createMediaDto,
      userId,
    });
  }

  @Patch('/:id')
  public async updateMedia(
    @Param() params: findOneParams,
    @Body() updateMediaDto: UpdateMediaDto,
    @CurrentUserId() userId: string,
  ): Promise<Media> {
    return this.mediaService.updateMedia(params.id, {
      ...updateMediaDto,
      userId,
    });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteMedia(@Param() params: findOneParams): Promise<void> {
    return this.mediaService.deleteMedia(params.id);
  }
}
