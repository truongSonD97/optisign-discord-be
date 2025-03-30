import { Controller, Post, Body, Res, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterLoginDto } from '../users/dtos/user.dto';
import { Response } from 'express';
import { UserDC } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: AuthRegisterLoginDto) {
    return this.authService.signUp(dto);
  }

  @Post('login')
  login(@Body() dto: { username: string; password: string }) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
   getMe(@UserDC() user:User){
    return this.authService.getMe(user.id)
   }
}
