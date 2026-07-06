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
import { MediaService } from './media.service';
import { findOneParams } from 'src/find-one.params';
import { Media } from './entities/media.entity';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('/')
  public async findAll() {
    return this.mediaService.findAll();
  }

  @Get('/:id')
  public async findOne(@Param() params: findOneParams): Promise<Media | null> {
    return this.mediaService.findOne(params.id);
  }

  @Post('/create')
  public async createMedia(
    @Body() createMediaDto: CreateMediaDto,
  ): Promise<Media> {
    return this.mediaService.createMedia(createMediaDto);
  }

  @Patch('/:id')
  public async updateMedia(
    @Param() params: findOneParams,
    @Body() updateMediaDto: UpdateMediaDto,
  ): Promise<Media> {
    return this.mediaService.updateMedia(params.id, updateMediaDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteMedia(@Param() params: findOneParams): Promise<void> {
    return this.mediaService.deleteMedia(params.id);
  }
}
