import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entities/user.entity';
import { WebSocketGatewayService } from './websocket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [WebSocketGatewayService],
  exports: [WebSocketGatewayService],
})
export class WebsocketModule {}
