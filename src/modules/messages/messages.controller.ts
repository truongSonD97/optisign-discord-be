import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { IMessageType } from 'src/interfaces/IMessageType';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  createMessage(@Body() dto: { roomId: number; senderId: number; content: string; type: IMessageType }) {
    return this.messagesService.createMessage(dto);
  }

  @Get(':roomId')
  getMessages(@Param('roomId') roomId: number, @Query("before") before:string) {
    return this.messagesService.getMessages(roomId,before);
  }
}
