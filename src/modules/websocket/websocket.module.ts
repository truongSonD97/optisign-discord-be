import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entities/user.entity';
import { WebSocketGatewayService } from './websocket.gateway';
import { MessagesModule } from '../messages/messages.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MessagesModule, AuthModule],
  providers: [WebSocketGatewayService],
  exports: [WebSocketGatewayService],
})
export class WebsocketModule {}
