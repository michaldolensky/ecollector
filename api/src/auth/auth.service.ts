import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from '../users/dto/create-user.input';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private static async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  private static async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await AuthService.comparePassword(
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

  public async register(createUserInput: CreateUserInput) {
    if (createUserInput.password !== createUserInput.verifyPassword) {
      throw new HttpException('PASSWORD_MISMATCH', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await AuthService.hashPassword(
      createUserInput.password,
    );

    const createdUser = await this.userService.create({
      ...createUserInput,
      password: hashedPassword,
    });
    createdUser.password = undefined;
    return createdUser;
  }

  public async getAuthenticatedUser(email: string, plainPassword: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      await AuthService.verifyPassword(plainPassword, user.password);

      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('INVALID_CREDENTIALS', HttpStatus.UNAUTHORIZED);
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

  async changePassword(
    currentUser: User,
    changePasswordInput: ChangePasswordInput,
  ) {
    if (changePasswordInput.oldPassword === changePasswordInput.newPassword) {
      throw new HttpException('PASSWORD_CHANGE_SAME', HttpStatus.BAD_REQUEST);
    }

    const isValid = await AuthService.comparePassword(
      changePasswordInput.oldPassword,
      currentUser.password,
    );

    if (!isValid)
      throw new HttpException(
        'PASSWORD_CHANGE_CURRENT',
        HttpStatus.BAD_REQUEST,
      );

    if (
      changePasswordInput.newPassword !== changePasswordInput.verifyPassword
    ) {
      throw new HttpException(
        'PASSWORD_CHANGE_MISMATCH',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newPassword = await AuthService.hashPassword(
      changePasswordInput.newPassword,
    );

    await this.userService.updatePassword(currentUser.id, newPassword);
  }
}
