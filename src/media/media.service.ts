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

  public async createMedia(createMediaDto: CreateMediaDto): Promise<Media> {
    const existingMedia = await this.mediaRepository.findOne({
      where: {
        title: createMediaDto.title,
        userId: createMediaDto.userId,
      },
    });

    if (existingMedia) {
      throw new ConflictException(
        'Media with the same title already exists for this user.',
      );
    }

    const media = this.mediaRepository.create(createMediaDto);
    return await this.mediaRepository.save(media);
  }

  public async updateMedia(
    id: string,
    updateMediaDto: UpdateMediaDto,
  ): Promise<Media> {
    const media = await this.findOneOrFail(id);
    Object.assign(media, updateMediaDto);
    return this.mediaRepository.save(media);
  }

  public async deleteMedia(id: string): Promise<void> {
    const media = await this.findOneOrFail(id);
    await this.mediaRepository.remove(media);
  }
}
