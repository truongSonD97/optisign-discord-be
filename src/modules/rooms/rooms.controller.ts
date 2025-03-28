import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Post()
  createRoom(@Body() dto: { name: string; ownerId: number }) {
    return this.roomsService.createRoom(dto);
  }

  @Get()
  getRooms() {
    return this.roomsService.getRooms();
  }

  @Get(':id')
  getRoomDetail(@Param('id') id: number) {
    return this.roomsService.getRoomDetail(id);
  }
}
