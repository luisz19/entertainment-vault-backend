import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  public async findAll(userId: string): Promise<Media[]> {
    const query = this.mediaRepository.createQueryBuilder('media');
    query.where('media.userId = :userId', { userId });
    return query.getMany();
  }

  private async findOneOrFail(id: string): Promise<Media> {
    const media = await this.mediaRepository.findOneBy({ id });

    if (!media) {
      throw new NotFoundException();
    }

    return media;
  }

  public async findOne(id: string): Promise<Media> {
    const media = await this.findOneOrFail(id);
    return media;
  }

  public async findByCategory(categoryId: string): Promise<Media[]> {
    const query = this.mediaRepository.createQueryBuilder('media');
    const existingCategory = await query
      .where('media.categoryId = :categoryId', { categoryId })
      .getMany();

    if (!existingCategory || existingCategory.length === 0) {
      throw new NotFoundException('No media found for the specified category.');
    }

    return existingCategory;
  }

  public async findHistorical(userId: string): Promise<Media[]> {
    return this.mediaRepository.find({
      where: {
        userId,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  public async createMedia(createMediaDto: CreateMediaDto): Promise<Media> {
    const existingMedia = await this.mediaRepository.findOne({
      where: {
        title: createMediaDto.title,
        userId: createMediaDto.userId,
      },
    });

    if (
      createMediaDto.currentProgress !== undefined &&
      createMediaDto.totalProgress !== undefined
    ) {
      this.validateProgress(
        createMediaDto.currentProgress,
        createMediaDto.totalProgress,
      );
    }

    if (createMediaDto.status === 'IN_PROGRESS') {
      createMediaDto.initiatedAt = new Date();
    }

    if (createMediaDto.status === 'COMPLETED') {
      createMediaDto.completedAt = new Date();
    }

    if (existingMedia) {
      throw new ConflictException(
        'Media with the same title already exists for this user.',
      );
    }

    const media = this.mediaRepository.create(createMediaDto);
    return await this.mediaRepository.save(media);
  }

  private validateProgress(
    currentProgress: number,
    totalProgress: number,
  ): void {
    if (currentProgress > totalProgress) {
      throw new ConflictException(
        'Current progress cannot be greater than total progress.',
      );
    }
  }

  public async updateMedia(
    id: string,
    updateMediaDto: UpdateMediaDto,
  ): Promise<Media> {
    const media = await this.findOneOrFail(id);

    if (
      updateMediaDto.currentProgress !== undefined &&
      updateMediaDto.totalProgress !== undefined
    ) {
      this.validateProgress(
        updateMediaDto.currentProgress,
        updateMediaDto.totalProgress,
      );
    }

    if (updateMediaDto.status === 'COMPLETED') {
      updateMediaDto.completedAt = new Date();
    }

    if (updateMediaDto.status === 'IN_PROGRESS') {
      updateMediaDto.initiatedAt = new Date();
    }

    Object.assign(media, updateMediaDto);
    return this.mediaRepository.save(media);
  }

  public async deleteMedia(id: string): Promise<void> {
    const media = await this.findOneOrFail(id);
    await this.mediaRepository.remove(media);
  }
}
