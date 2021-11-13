import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from '../users/dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from '../config/database/enums/postgresErrorCodes';
import { TokenPayload } from './tokenPayload.interface';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(createUserInput: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    try {
      const createdUser = await this.userService.create({
        ...createUserInput,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainPassword: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      await this.verifyPassword(plainPassword, user.password);

      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Invalid credentials',
          type: 'INVALID_CREDENTIALS',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  public async login(user: User) {
    const payload: TokenPayload = {
      userId: user.id,
      role: user.role,
      ownedSites: await this.userService.getUsersSitesIds(user.id),
    };
    return { accessToken: this.jwtService.sign(payload) };
  }

  private async verifyPassword(plainPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
