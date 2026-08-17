import { Exclude, Expose } from 'class-transformer';
import { Category } from 'src/category/entities/category.entity';
import { Media } from 'src/media/entities/media.entity';
import {
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Entity } from 'typeorm';

@Entity()
@Exclude()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @OneToMany(() => Media, (media) => media.user)
  medias: Media[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  @Expose()
  createdAt: Date;

  @UpdateDateColumn()
  @Expose()
  updatedAt: Date;
}
