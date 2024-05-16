import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Session() session, @Body() signInDto: SignInDTO) {
    const token = await this.authService.signIn(signInDto);

    session.token = token;

    return { token };
  }

  @Post('email')
  resetPassword(@Body('email') email: string) {
    return this.authService.resetPassword({ email });
  }
}
