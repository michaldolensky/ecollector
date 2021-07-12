import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const passwordIsValid = password === user.password;
    return passwordIsValid ? user : null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: process.env.SECRET,
    });

    const user = this.userService.getUserByEmail(decoded.email);

    if (!user) {
      throw new Error('Unable to get the user from decoded token.');
    }
    return user;
  }
}
