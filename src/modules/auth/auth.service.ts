import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { HttpService } from '@nestjs/axios';

import { generateCode } from 'src/shared/utils/generate-code';
import { RedisService } from '../redis-module/redis.service';

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly redisService: RedisService,
  ) {}

  public async signIn({ email, password }: SignInDTO) {
    const options = {
      password: 1,
    };
    const user = await this.usersService.findOneByEmail(email, options);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { email, username: user.username, id: user.id };

    const expiresIn = this.configService.get('JWT_EXPIRES_IN');
    const token = await this.jwtService.signAsync(payload, { expiresIn });
    return token;
  }

  public async resetPassword({ email }: ResetPasswordDTO) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    const code = generateCode(6);
    await this.redisService.save(
      `verification-code-${email}`,
      { email, code },
      3600,
    );

    try {
      await this.httpService.axiosRef.post(
        `${process.env.SERVICE_EMAIL_URI}/reset-password/`,
        { email, code },
      );
    } catch (error) {
      const errorMessage = error.message || 'An unknown error occurred.';
      throw new Error(errorMessage);
    }
  }
}
