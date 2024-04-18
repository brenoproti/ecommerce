import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req ) {
    const { name, id } = req.user;
    const token = this.authService.login(req.user);
    return { name, id, token };

  }
}
