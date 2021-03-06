import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserInput } from '../users/dto/create-user.input';
import { AuthService } from './auth.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import RequestWithUser from './RequestWithUser';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async register(@Body() registrationData: CreateUserInput) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    return await this.authService.login(user);
  }
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Req() request: RequestWithUser,
    @Body() changePasswordInput: ChangePasswordInput,
  ) {
    const { user } = request;
    return await this.authService.changePassword(user, changePasswordInput);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
