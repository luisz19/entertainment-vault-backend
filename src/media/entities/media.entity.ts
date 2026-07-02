import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MediaStatus } from '../model/media.model';
import { User } from 'src/user/entities/user.entity';

export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.medias, { nullable: false })
  user: User;

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
    type: 'float',
    default: 0,
    nullable: false,
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

  @Column({
    type: 'datetime',
    nullable: false,
  })
  createdAt: Date;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  updatedAt: Date;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  initiatedAt: Date;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  completedAt: Date;
}
