import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshDto } from 'src/auth/dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwt: JwtService,
  ) {}

  //@UseGuards(AuthGuard('local'))
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }
  //@UseGuards(AuthGuard('jwt'))
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.authService.loginWithCredentials(dto);
  }
  //@UseGuards(AuthGuard('jwt'))
  @Post('login/access-token')
  async getNewTokens(@Body() dto: RefreshDto) {
    return this.authService.getNewTokens(dto.refreshToken);
  }
}
