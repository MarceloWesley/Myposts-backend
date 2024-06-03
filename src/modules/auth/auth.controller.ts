import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Session,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDTO, SignInDTO } from './dto';
import { SessionData } from 'express-session';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Session() session: SessionData, @Body() signInDto: SignInDTO) {
    const token = await this.authService.signIn(signInDto);

    session.token = token;

    return { token };
  }

  @Delete('logout')
  async logout(@Session() session: SessionData) {
    return new Promise<void>((resolve) => {
      session.destroy(() => {
        resolve();
      });
    });
  }

  @Post('email')
  resetPassword(@Body('email') email: string) {
    return this.authService.resetPassword({ email });
  }

  @Post('change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDTO) {
    return this.authService.changePassword(changePasswordDto);
  }
}
