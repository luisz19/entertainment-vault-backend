import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { MediaStatus } from '../model/media.model';

export class CreateMediaDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  comment: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsNumber()
  @IsOptional()
  progress: number;

  @IsString()
  @IsOptional()
  availableIn: string;

  @IsString()
  @IsOptional()
  genre: string;

  @IsOptional()
  @IsEnum(MediaStatus)
  status: MediaStatus;

  @IsOptional()
  @IsDate()
  completedAt: Date;

  @IsOptional()
  @IsDate()
  initiatedAt: Date;

  userId: string;
}
