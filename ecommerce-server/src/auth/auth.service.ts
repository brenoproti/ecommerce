import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(document: string, password: string) {
    const user: User = await this.userService.findUserByDocument(document);

    if (!user) {
      return null;
    }
    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  login(user) {
    const payload = {
      sub: user.id,
      name: user.name
    }
    return  this.jwtService.sign(payload)
  }
}
