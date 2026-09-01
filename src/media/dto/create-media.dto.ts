import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { MediaProgressType, MediaStatus } from '../model/media.model';

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

  @IsInt()
  @Min(0)
  @IsOptional()
  currentProgress: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  totalProgress: number;

  @IsEnum(MediaProgressType)
  progressType: MediaProgressType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  availableIn: Array<string>;

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
