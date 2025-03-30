import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { IMessageType } from 'src/interfaces/IMessageType';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private messageRepo: Repository<Message>) {}

  async createMessage(dto: { roomId: number; senderId: number; content: string; type: IMessageType }) {
    const {roomId, senderId, content, type} = dto
    const message = this.messageRepo.create({
      room: {id:roomId},
      sender:{id:senderId},
      content,
      type
    });
    return await this.messageRepo.save(message);
  }

  async getMessages(roomId: number, before?: string, existingIds?: number[]) {
    let query = this.messageRepo
      .createQueryBuilder("message")
      .where("message.roomId = :roomId", { roomId })
      .orderBy("message.createdAt", "DESC") // Fetch newest first
      .take(20); // Load 20 messages per request
  
    if (before) {
      query.andWhere("message.createdAt < :before", { before });
    }
  
    if (existingIds && existingIds.length > 0) {
      query.andWhere("message.id NOT IN (:...existingIds)", { existingIds });
    }
  
    return query.getMany();
  }
}
