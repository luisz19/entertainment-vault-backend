import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import { CreateMediaDto } from './dto/create-media.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  public async findAll(): Promise<Media[]> {
    return this.mediaRepository.find();
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

  public async createMedia(createMediaDto: CreateMediaDto): Promise<Media> {
    const media = this.mediaRepository.create(createMediaDto);
    return this.mediaRepository.save(media);
  }

  public async updateMedia(
    id: string,
    updateMediaDto: Partial<CreateMediaDto>,
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
