import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from 'src/entities/reaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReactionsService {
  constructor(@InjectRepository(Reaction) private reactionRepo: Repository<Reaction>) {}

  async reactToMessage(dto: { messageId: number; userId: number; emoji: string }) {
    const reaction = this.reactionRepo.create(dto);
    return await this.reactionRepo.save(reaction);
  }
}
