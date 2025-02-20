import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() SignUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(SignUpDto);
  }

  @Post('log-in')
  login(@Body() LoginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(LoginDto);
  }
}
