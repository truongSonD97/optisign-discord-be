import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IMessageType } from 'src/interfaces/IMessageType';
import { MessagesService } from '../messages/messages.service';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway()
export class WebSocketGatewayService implements OnGatewayConnection, OnGatewayDisconnect  {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: MessagesService,
    private readonly authService: AuthService,
  ) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    try {
      const token = client.handshake.auth.token; // Extract token from auth
      if (!token) {
        console.log('No token provided, disconnecting...');
        client.disconnect();
        return;
      }

      // Verify token
      const decoded = this.authService.verifyToken(token);
      // Store user ID in socket object
      (client as any).user = decoded;
    } catch (error) {
      console.log('Invalid token, disconnecting...', error);
      client.disconnect();
    }
  }


  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('Client disconnected:', (client as any).user?.id);
  }


  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: { roomId: number; content: string, type: IMessageType },
    @ConnectedSocket() client: Socket
  ) {
    const user = (client as any).user;
      if (!user) {
        console.warn('WebSocket: Unauthenticated user attempted to send a message.');
        client.disconnect();
        return;
      }

    const { roomId, content,type } = data;

    // Save message to DB
    const savedMessage = await this.chatService.createMessage({roomId, senderId: user.id, content, type});
    savedMessage.sender = user
    // Emit to everyone in the room
    this.server.to(roomId.toString()).emit('receiveMessage', savedMessage);
    console.log("send to client")
  }


  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody("roomId") roomId: string, @ConnectedSocket() client: Socket) {
    console.log("🚀 ~ WebSocketGatewayService ~ handleJoinRoom ~ roomId:", roomId)
    const user = (client as any).user;
    if (!user) {
      console.warn('WebSocket: Unauthenticated user attempted to join a room.');
      client.disconnect();
      return;
    }
    client.join(roomId.toString());
    console.log(`Client ${user.id} joined room ${roomId}`)
    // client.emit('roomMessages', this.rooms[room] || []);
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(
  @MessageBody() { roomId, userId }: { roomId: number; userId: number },
  @ConnectedSocket() client: Socket
) {
  client.leave(roomId.toString());
  console.log(`User ${userId} left room ${roomId}`);
}
}
