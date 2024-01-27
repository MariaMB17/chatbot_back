import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server } from 'socket.io';



@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id)
      console.log('has connected')
    })
  }
  
  @SubscribeMessage('newMessage')
  onNewMesagge(@MessageBody() body:any) {
    console.log(body)
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    })
  }
}
