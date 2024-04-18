import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessageHelper } from '../common/helpers/message.helper';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'document' });
  }

  async validate(document: string, password: string) {
    const user = await this.authService.validateUser(document, password);


    if (!user) throw new UnauthorizedException(MessageHelper.PASSWORD_OR_DOCUMENT_INVALID);

    return user;
  }
}