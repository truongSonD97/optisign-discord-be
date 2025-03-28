import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { IMessageType } from 'src/interfaces/IMessageType';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private messageRepo: Repository<Message>) {}

  async createMessage(dto: { roomId: number; senderId: number; content: string; type: IMessageType }) {
    const message = this.messageRepo.create(dto);
    return await this.messageRepo.save(message);
  }

  async getMessages(roomId: number) {
    return await this.messageRepo.find({ where: { room:{id:roomId} }, relations: ['reactions'] });
  }
}
