import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { findOneParams } from 'src/find-one.params';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  public async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  public async findOne(@Param() params: findOneParams): Promise<User | null> {
    return this.userService.findOne(params.id);
  }

  @Post('/register')
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Patch('/:id')
  public async update(
    @Param() params: findOneParams,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userService.findOneOrFail(params.id);
    return this.userService.update(user, updateUserDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param() params: { id: string }): Promise<void> {
    const user = await this.userService.findOneOrFail(params.id);
    return this.userService.deleteUser(user);
  }
}
