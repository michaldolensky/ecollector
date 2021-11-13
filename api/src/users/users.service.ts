import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostgresErrorCode } from '../config/database/enums/postgresErrorCodes';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  public async create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(createUserInput);

    try {
      await this.usersRepository.insert(newUser);
      return newUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('USER_EXISTS', HttpStatus.BAD_REQUEST);
      }
    }
  }

  public async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public async findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneOrFail(id);
  }

  public async update(
    userId: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const user = await this.findOne(userId);

    if (!user) throw new BadRequestException('Invalid user');
    Object.assign(user, updateUserInput);
    await this.usersRepository.update(userId, user);
    return user;
  }

  public async remove(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found!');
    await this.usersRepository.delete(id);
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['sites'],
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  public async getUserByEmail(email: string) {
    const user = this.usersRepository.findOne({
      where: { email: email.toLocaleLowerCase() },
    });

    if (!user) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  public async getUsersSitesIds(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['sites'],
    });
    return user.sites.map((value) => {
      return value.id;
    });
  }

  public async updatePassword(userId: number, password: string) {
    const user = await this.findOne(userId);
    if (user === undefined || user === null) {
      throw new NotFoundException();
    }
    await this.usersRepository.update(user.id, { password });
  }
}
