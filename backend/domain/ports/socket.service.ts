import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'tls';

@WebSocketGateway(
  {
    cors: {
      origin: '*',
    },
  }
)
export class SocketService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('SocketService');
  
  notifyNewMessage(contact: string, content: string) {
    const obj = { contact, content }
    this.server.emit('new_message', obj);
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.debug(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: any) {
    this.logger.debug(`Client disconnected: ${client.id}`);
  }
  afterInit() {
    this.logger.debug(`Socket initialized`);
  }
}
