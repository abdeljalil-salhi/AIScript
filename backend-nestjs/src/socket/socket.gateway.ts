// Dependencies
import { Socket, Server } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

// Services
import { SocketService } from './socket.service';
import { BookService } from 'src/book/book.service';
import {
  SocketIOMiddleware,
  WebsocketMiddleware,
} from 'src/auth/middlewares/websocket.middleware';
import { getClientHandshake } from 'src/auth/guards/websocket.guard';

@WebSocketGateway({ cors: true })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  /**
   * Map of clients waiting in the shared queue;
   * @key - client id
   * @value - client socket
   * @type {Map<string, Socket>}
   */
  private sharedQueue: Map<string, Socket> = new Map<string, Socket>();

  constructor(
    private readonly socketService: SocketService,
    private readonly bookService: BookService,
  ) {}

  /**
   * The native websocket server instance
   * @type {Server}
   */
  @WebSocketServer()
  private readonly server: Server;

  /**
   * Method called when the gateway is initialized
   *
   * @OnGatewayInit
   * @param {Socket} client - The client socket
   * @returns {void}
   */
  public afterInit(client: Socket): void {
    /**
     * @description
     * Add the websocket middleware to the client.
     * This middleware will be used to authenticate the client.
     * If the client is not authenticated, they will be disconnected.
     * This is useful for ensuring that only authenticated users can connect to the websocket.
     *
     * @see WebsocketMiddleware
     */
    client.use(WebsocketMiddleware() as SocketIOMiddleware as any);
  }

  /**
   * Method called when a client connects to the websocket
   *
   * @OnGatewayConnection
   * @param {Socket} client - The client socket
   * @returns {WsResponse<void>} - The response to the client
   */
  public handleConnection(client: Socket): WsResponse<void> {
    // Add the client to the users list
    const userId: string = this.socketService.addUser(
      client,
      getClientHandshake(client, 'userId'),
    );
    if (!userId) return;

    // Send the updated list of users to all clients
    this.server.emit('users', this.socketService.getUserIds());
  }

  /**
   * Method called when a client disconnects from the websocket
   *
   * @OnGatewayDisconnect
   * @param {Socket} client - The client socket
   * @returns {WsResponse<void>} - The response to the client
   */
  public handleDisconnect(client: Socket): WsResponse<void> {
    const userId: string = this.socketService.removeUser(client.id);
    if (!userId) return;

    this.server.emit('users', this.socketService.getUserIds());
  }
}
