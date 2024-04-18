import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInDTO } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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
}
