import { Controller, Post, Body } from '@nestjs/common';
import { ReactionsService } from './reactions.service';

@Controller('reactions')
export class ReactionsController {
  constructor(private reactionsService: ReactionsService) {}

  @Post()
  reactToMessage(@Body() dto: { messageId: number; userId: number; emoji: string }) {
    return this.reactionsService.reactToMessage(dto);
  }
}
