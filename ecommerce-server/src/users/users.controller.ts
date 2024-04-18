import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { PageDto } from '../common/dtos/page.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  create(@Body() userDto: UserDto) {
    return this.usersService.create(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProducts(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<UserDto>> {
    return this.usersService.getUsers(pageOptionsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
