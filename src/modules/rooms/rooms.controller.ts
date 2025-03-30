import { Controller, Get, Post, Param, Body, UseGuards, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDC } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Post()
  createRoom(@Body() dto: { name: string; ownerId: number, usernames:string[] }) {
    return this.roomsService.createRoom(dto);
  }

  @Get()
  getRooms(@UserDC() user: User) {
    return this.roomsService.getRooms();
  }

  @Get(':id')
  getRoomDetail(@Param('id') id: number) {
    return this.roomsService.getRoomDetail(id);
  }
}
