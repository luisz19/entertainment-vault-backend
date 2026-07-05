import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMediaDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  comment: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsString()
  @IsOptional()
  availableIn: string;

  @IsString()
  @IsOptional()
  genre: string;

  @IsOptional()
  @IsDate()
  completedAt: Date;

  @IsOptional()
  @IsDate()
  initiatedAt: Date;
}
