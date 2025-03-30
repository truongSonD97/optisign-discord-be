import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.cookies['access_token']; // 🍪 Read token from cookie

    if (!token) {
      throw new UnauthorizedException('No access token found');
    }

    try {
      req.user = this.jwtService.verify(token); // ✅ Verify JWT
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
