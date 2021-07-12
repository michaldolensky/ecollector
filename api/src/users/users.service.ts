import { BadRequestException, Injectable } from '@nestjs/common';
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

  create(createUserInput: CreateUserInput) {
    const newUser = this.usersRepository.create(createUserInput);

    return this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneOrFail(id);
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.findOne(id);

    if (!user) throw new BadRequestException('Invalid user');

    user.firstName = updateUserInput.firstName;
    user.lastName = updateUserInput.lastName;
    return this.usersRepository.save(user);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne(email);
  }
}
