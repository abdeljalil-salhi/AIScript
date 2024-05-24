// Dependencies
import { v4 as uuidv4 } from 'uuid';
import { Socket, Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

// Services
import { SocketService } from './socket.service';
import { BookService } from 'src/book/book.service';
// Middlewares
import { SocketIOMiddleware } from 'src/auth/middlewares/socket-io.middleware';
import { WebsocketMiddleware } from 'src/auth/middlewares/websocket.middleware';
// Guards
import { getClientHandshake } from 'src/auth/guards/websocket.guard';
// Interfaces
import { QueueMember } from './interfaces/client-user.interface';

/**
 * @description
 * The queue data structure that will be used to store the clients waiting for a book.
 * The queue follows the FIFO (First In First Out) principle.
 * This means that the first client added to the queue will be the first one to be removed.
 * This is useful for ensuring that clients are served in the order they joined the queue.
 */
import { Queue } from './queue';

/**
 * The socket gateway that handles the websocket connections and events.
 *
 * @export
 * @class SocketGateway
 * @implements {OnModuleInit}
 * @implements {OnGatewayInit}
 * @implements {OnGatewayConnection}
 * @implements {OnGatewayDisconnect}
 */
@WebSocketGateway({ cors: true })
export class SocketGateway
  implements
    OnModuleInit,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
{
  /**
   * The shared queue that will be used to store the clients waiting for a book.
   * @type {Queue<QueueMember>}
   */
  private sharedQueue: Queue<QueueMember> = new Queue<QueueMember>();

  /**
   * Creates an instance of SocketGateway.
   *
   * @param {SocketService} socketService - The socket service
   * @param {BookService} bookService - The book service
   */
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
   * Method called when the module is initialized
   *
   * @OnModuleInit
   * @returns {void}
   */
  public onModuleInit(): void {
    // Start processing the queue
    this.processQueue();
  }

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
    this.server.emit('users', this.socketService.getUsers());
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

    // Remove the client from the queue
    this.removeFromQueue(client);

    this.server.emit('users', this.socketService.getUsers());
  }

  @SubscribeMessage('joinSharedQueue')
  public async joinQueue(@ConnectedSocket() client: Socket): Promise<void> {
    // Get the user ID from the client
    const userId: string = this.socketService.getUserId(client.id);
    if (!userId) return;

    if (this.sharedQueue.getItems().some((item) => item.userId === userId)) {
      // Notify the client that the user is already in the queue
      client.emit('queueStatus', {
        status: 'alreadyInQueue',
        userId,
      });

      console.log(`User ${userId} is already in the shared queue.`);

      return;
    }

    // Generate a unique instance ID for the client
    const instanceId: string = uuidv4();

    // Add the client to the shared queue
    this.sharedQueue.enqueue({ instanceId, client, userId });

    console.log(
      `Client added to queue. ID #${instanceId}. Queue size: ${this.sharedQueue.size()}`,
    );

    // Notify the clients with the updated queue size
    this.server.emit('queue', {
      size: this.sharedQueue.size(),
    });
  }

  public async processQueue(): Promise<void> {
    while (true) {
      if (!this.sharedQueue.isEmpty()) {
        // Get the first client in the queue
        const instance: QueueMember = this.sharedQueue.peek();

        if (instance.client) {
          console.log(
            `Processing user ${instance.userId} from queue. ID #${instance.instanceId}. Queue size: ${this.sharedQueue.size()}`,
          );

          // Call the generate method to simulate processing
          await this.generate(instance);

          // Remove the client from the queue
          this.sharedQueue.dequeue();

          // Notify all clients of the updated queue size
          this.server.emit('queue', {
            size: this.sharedQueue.size(),
          });
        }
      } else await this.sleep(1000);

      // Wait for the next iteration of the loop, this is useful for preventing the event loop from blocking
      await new Promise(setImmediate);
    }
  }

  public async generate(instance: QueueMember): Promise<void> {
    // Simulate processing with a delay, replace this with actual processing logic
    return new Promise((resolve) => {
      setTimeout(() => {
        // Notify the client that the user has been processed
        instance.client.emit('queueStatus', {
          status: 'processed',
          userId: instance.userId,
        });

        console.log(
          `User ${instance.userId} processed. ID #${instance.instanceId}.`,
        );

        resolve();
      }, 30000); // Simulate a delay for processing
    });
  }

  /**
   * Removes a client from the queue with the specified client ID.
   *
   * @param {Socket} client - The client socket
   * @returns {void}
   */
  private removeFromQueue(client: Socket): void {
    // Remove the client from the queue with the specified client ID
    this.sharedQueue = new Queue<QueueMember>(
      this.sharedQueue
        .getItems()
        .filter((queueItem: QueueMember) => queueItem.client.id !== client.id),
    );

    console.log(
      `Client removed from queue. Queue size: ${this.sharedQueue.size()}`,
    );
  }

  /**
   * Sleep for the specified amount of time.
   *
   * @param {number} ms - The time to sleep in milliseconds
   * @returns {Promise<void>}
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
