import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MediaStatus } from '../model/media.model';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.medias, { nullable: false })
  user: User;

  @Column()
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.medias, { nullable: false })
  category: Category;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  comment: string;

  @Column({
    type: 'enum',
    enum: MediaStatus,
    default: MediaStatus.PENDING,
  })
  status: MediaStatus;

  @Column({
    default: 0,
    nullable: true,
  })
  progress: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  availableIn: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  genre: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  initiatedAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  completedAt: Date;
}
