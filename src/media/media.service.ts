import { Injectable } from '@nestjs/common';
import { MediaRepository } from './repositories/media.repository';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}
}
