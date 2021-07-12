import { Injectable } from '@nestjs/common';
import { GetUserArgs } from './dto/get-user.args';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  public async createUser(createUserData: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.email = createUserData.email;
    user.password = createUserData.password;

    await this.usersRepository.save(user);
    return user;
  }

  public async updateUser(updateUserData: UpdateUserDto): Promise<User> {
    const user = this.usersRepository.findOne(updateUserData.userId);

    Object.assign(user, updateUserData);

    return await user;
  }

  public async getUser(getUserArgs: GetUserArgs): Promise<User> {
    return await this.usersRepository.findOneOrFail(getUserArgs.userId);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const user = this.usersRepository.findOne({ where: { email: email } });
    return await user;
  }

  public async deleteUser(deleteUserData: DeleteUserDto): Promise<User> {
    const user = await this.usersRepository.findOne(deleteUserData.userId);
    if (user) await this.usersRepository.delete(user);
    return user;
  }
}
