import {
  BadRequestException,
  Injectable, NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schema/user.schema';
import { AuthDto } from './dto/auth.dto';
import { hash, verify } from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReturnTokenType, ReturnUserType } from '../types/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(
    dto: AuthDto,
  ): Promise<{ user: ReturnUserType } & ReturnTokenType> {
    const checkOldUser = await this.userModel.findOne({
      username: dto.username,
    });

    if (checkOldUser)
      throw new BadRequestException('Пользователь уже существует');
    const user = await this.userModel.create({
      username: dto.username,
      password: await hash(dto.password),
    });
    const tokens = await this.issueTokens(user.id);
    return { user: AuthService.returnUserFields(user), ...tokens };
  }
  private async issueTokens(userId: string): Promise<ReturnTokenType> {
    const data = { id: userId };
    const accessToken = this.jwtService.sign(data, {
      expiresIn: '1h',
    });
    const refreshToken = this.jwtService.sign(data, {
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }
  private static returnUserFields(user): ReturnUserType {
    return {
      username: user.username,
      id: user._id,
    };
  }
  async validateUserCredentials(dto: AuthDto): Promise<any> {
    const user = await this.userModel.findOne({ username: dto.username });

    return user ?? null;
  }
  async getNewTokens(refreshToken: string) {
    const result = await this.jwtService.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Невалидный токен');

    const user = await this.userModel.findOne({ _id: result.id });
    const tokens = await this.issueTokens(user.id);
    return { user: AuthService.returnUserFields(user), ...tokens };
  }

  async loginWithCredentials(dto: AuthDto) {
    const user = await this.validateUser(dto)
    const tokens = await this.issueTokens(user.id)

    return {
      user: AuthService.returnUserFields(user),
      ...tokens
    }
  }

  private async validateUser(dto: AuthDto){
    const user = await this.userModel.findOne({ username: dto.username });

    if(!user) throw new NotFoundException('Пользователь не найден')

    const isValid = await verify(user.password, dto.password)

    if(!isValid) throw new UnauthorizedException('Неверный пароль')

    return user
  }
}
