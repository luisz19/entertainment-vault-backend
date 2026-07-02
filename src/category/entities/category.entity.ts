import { User } from 'src/user/entities/user.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.categories, { nullable: false })
  user: User;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  icon: string;

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
}
