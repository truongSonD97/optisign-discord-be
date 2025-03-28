import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WebSocketGatewayService {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string) {
    client.join(roomId);
    client.emit('joinedRoom', roomId);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { roomId: string; content: string }) {
    this.server.to(payload.roomId).emit('newMessage', payload);
  }
}
