import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDC } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.entity';


@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/search")
  async searchUsers(@Query("query") query: string, @UserDC() user:User) {
    return this.usersService.searchUsers(user,query);
  }

  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }
}
