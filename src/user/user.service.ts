import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  private async findOneOrFail(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  public async findOne(id: string): Promise<User> {
    const user = await this.findOneOrFail(id);
    return user;
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  public async update(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  public async deleteUser(user: User): Promise<void> {
    await this.userRepository.delete(user);
  }
}
