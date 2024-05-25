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
   * The priority queue that will be used to store the clients waiting for a book with priority
   * (e.g. Premium users)
   * @type {Queue<QueueMember>}
   */
  private priorityQueue: Queue<QueueMember> = new Queue<QueueMember>();

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
    // Start processing the queues.
    this.processQueues();
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

    // Notify the client with the queue sizes
    client.emit('sharedQueue', {
      size: this.sharedQueue.size(),
    });
    client.emit('priorityQueue', {
      size: this.priorityQueue.size(),
    });
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

    // Send the updated list of users to all clients
    this.server.emit('users', this.socketService.getUsers());
  }

  /**
   * Event called when a client checks the priority queue
   *
   * @SubscribeMessage 'checkPriorityQueue'
   * @param {Socket} client - The client socket
   * @returns {Promise<void>}
   */
  @SubscribeMessage('checkPriorityQueue')
  public async checkPriorityQueue(
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    // Get the user ID from the client
    const userId: string = this.socketService.getUserId(client.id);
    if (!userId) return;

    const inQueuePosition: number = this.priorityQueue
      .getItems()
      .findIndex((item: QueueMember) => item.userId === userId);

    const isUserInQueue: boolean = inQueuePosition !== -1;

    // Notify the client with their position in the queue if they are in the queue
    client.emit('priorityQueueStatus', {
      status: 'checked',
      userId,
      position: isUserInQueue ? inQueuePosition + 1 : null,
    });
  }

  /**
   * Event called when a client checks the shared queue
   *
   * @SubscribeMessage 'checkSharedQueue'
   * @param {Socket} client - The client socket
   * @returns {Promise<void>}
   */
  @SubscribeMessage('checkSharedQueue')
  public async checkSharedQueue(
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    // Get the user ID from the client
    const userId: string = this.socketService.getUserId(client.id);
    if (!userId) return;

    const inQueuePosition: number = this.sharedQueue
      .getItems()
      .findIndex((item: QueueMember) => item.userId === userId);

    const isUserInQueue: boolean = inQueuePosition !== -1;

    // Notify the client with their position in the queue if they are in the queue
    client.emit('sharedQueueStatus', {
      status: 'checked',
      userId,
      position: isUserInQueue ? inQueuePosition + 1 : -1,
    });
  }

  /**
   * Event called when a client joins the shared queue
   *
   * @SubscribeMessage 'joinSharedQueue'
   * @param {Socket} client - The client socket
   * @returns {Promise<void>}
   */
  @SubscribeMessage('joinSharedQueue')
  public async joinSharedQueue(
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    // Get the user ID from the client
    const userId: string = this.socketService.getUserId(client.id);
    if (!userId) return;

    if (this.sharedQueue.getItems().some((item) => item.userId === userId)) {
      // Notify the client that the user is already in the queue
      client.emit('sharedQueueStatus', {
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
      `Client added to shared queue. ID #${instanceId}. Queue size: ${this.sharedQueue.size()}`,
    );

    // Notify the clients with the updated queue size
    this.server.emit('sharedQueue', {
      size: this.sharedQueue.size(),
    });

    // Get the user's socket IDs
    const userSocketIds: string[] = this.socketService.getUserSocketIds(userId);
    if (!userSocketIds.length) return;

    // Notify the client with their position in the queue
    userSocketIds.forEach((socketId: string) => {
      this.server.to(socketId).emit('sharedQueueStatus', {
        status: 'queued',
        userId,
        position: this.sharedQueue.size(),
      });
    });
  }

  /**
   * Event called when a client joins the priority queue
   *
   * @SubscribeMessage 'joinPriorityQueue'
   * @param {Socket} client - The client socket
   * @returns {Promise<void>}
   */
  @SubscribeMessage('joinPriorityQueue')
  public async joinPriorityQueue(
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    // Get the user ID from the client
    const userId: string = this.socketService.getUserId(client.id);
    if (!userId) return;

    if (this.priorityQueue.getItems().some((item) => item.userId === userId)) {
      // Notify the client that the user is already in the queue
      client.emit('priorityQueueStatus', {
        status: 'alreadyInQueue',
        userId,
      });

      console.log(`User ${userId} is already in the priority queue.`);

      return;
    }

    // Generate a unique instance ID for the client
    const instanceId: string = uuidv4();

    // Add the client to the priority queue
    this.priorityQueue.enqueue({ instanceId, client, userId });

    console.log(
      `Client added to priority queue. ID #${instanceId}. Queue size: ${this.priorityQueue.size()}`,
    );

    // Notify the clients with the updated queue size
    this.server.emit('priorityQueue', {
      size: this.priorityQueue.size(),
    });

    const userSocketIds: string[] = this.socketService.getUserSocketIds(userId);
    if (!userSocketIds.length) return;

    // Notify the client with their position in the queue
    userSocketIds.forEach((socketId: string) => {
      this.server.to(socketId).emit('priorityQueueStatus', {
        status: 'queued',
        userId,
        position: this.priorityQueue.size(),
      });
    });
  }

  /**
   * Checks if any clients are in the queues and processes them.
   * This method is called when the module is initialized.
   * It will keep checking the queues for clients and process them when they are available.
   * Priority clients will be processed first before shared clients.
   *
   * @uses processPriorityQueue
   * @uses processSharedQueue
   * @returns {Promise<void>}
   */
  public async processQueues(): Promise<void> {
    while (true) {
      // Process the priority queue
      if (!this.priorityQueue.isEmpty()) await this.processPriorityQueue();
      // Process the shared queue if the priority queue is empty
      else if (!this.sharedQueue.isEmpty()) await this.processSharedQueue();
      // If both queues are empty, wait for a second before checking again
      else await this.sleep(1000);

      // Wait for the next iteration of the loop, this is useful for preventing the event loop from blocking
      await new Promise(setImmediate);
    }
  }

  /**
   * Processes the clients in the priority queue.
   *
   * @uses generate
   * @returns {Promise<void>}
   */
  public async processPriorityQueue(): Promise<void> {
    if (!this.priorityQueue.isEmpty()) {
      // Get the first client in the priority queue
      const instance: QueueMember = this.priorityQueue.peek();

      if (instance.client) {
        console.log(
          `Processing user ${instance.userId} from priority queue. ID #${instance.instanceId}. Queue size: ${this.priorityQueue.size()}`,
        );

        // Call the generate method to simulate processing
        await this.generate(instance);

        // Remove the client from the queue
        this.priorityQueue.dequeue();

        // Notify all clients of the updated priority queue size
        this.server.emit('priorityQueue', {
          size: this.priorityQueue.size(),
        });

        // Notify the priority clients that a user has been processed
        this.server.emit('priorityQueueStatus', {
          status: 'processed',
          userId: instance.userId,
        });
      }
    }
  }

  /**
   * Processes the clients in the shared queue.
   *
   * @uses generate
   * @returns {Promise<void>}
   */
  public async processSharedQueue(): Promise<void> {
    if (!this.sharedQueue.isEmpty()) {
      // Get the first client in the shared queue
      const instance: QueueMember = this.sharedQueue.peek();

      if (instance.client) {
        console.log(
          `Processing user ${instance.userId} from shared queue. ID #${instance.instanceId}. Queue size: ${this.sharedQueue.size()}`,
        );

        // Call the generate method to simulate processing
        await this.generate(instance);

        // Remove the client from the queue
        this.sharedQueue.dequeue();

        // Notify all clients of the updated shared queue size
        this.server.emit('sharedQueue', {
          size: this.sharedQueue.size(),
        });

        // Notify the shared clients that a user has been processed
        this.server.emit('sharedQueueStatus', {
          status: 'processed',
          userId: instance.userId,
        });
      }
    }
  }

  /**
   * Simulates processing a client.
   *
   * @param {QueueMember} instance - The client instance
   * @returns {Promise<void>}
   */
  public async generate(instance: QueueMember): Promise<void> {
    // Simulate processing with a delay, replace this with actual processing logic
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(
          `User ${instance.userId} processed. ID #${instance.instanceId}.`,
        );

        resolve();
      }, 30000); // Simulate a delay for processing
    });
  }

  /**
   * Event called when a client leaves the priority queue
   *
   * @SubscribeMessage 'leavePriorityQueue'
   * @param {Socket} client - The client socket
   * @returns {Promise<void>}
   */
  @SubscribeMessage('leavePriorityQueue')
  public async leavePriorityQueue(
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    // Get the user ID from the client
    const userId: string = this.socketService.getUserId(client.id);
    if (!userId) return;

    // Remove the client from the priority queue
    this.priorityQueue = new Queue<QueueMember>(
      this.priorityQueue
        .getItems()
        .filter((queueItem: QueueMember) => queueItem.userId !== userId),
    );

    // Notify the clients with the updated queue size
    this.server.emit('priorityQueue', {
      size: this.priorityQueue.size(),
    });

    // Get the user's socket IDs
    const userSocketIds: string[] = this.socketService.getUserSocketIds(userId);
    if (!userSocketIds.length) return;

    // Notify the client that they have left the queue
    userSocketIds.forEach((socketId: string) => {
      this.server.to(socketId).emit('priorityQueueStatus', {
        status: 'left',
        userId,
      });
    });

    console.log(
      `Client removed from priority queue. Shared queue size: ${this.sharedQueue.size()}, Priority queue size: ${this.priorityQueue.size()}.`,
    );
  }

  /**
   * Event called when a client leaves the shared queue
   *
   * @SubscribeMessage 'leaveSharedQueue'
   * @param {Socket} client - The client socket
   * @returns {Promise<void>}
   */
  @SubscribeMessage('leaveSharedQueue')
  public async leaveSharedQueue(
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    // Get the user ID from the client
    const userId: string = this.socketService.getUserId(client.id);
    if (!userId) return;

    // Remove the client from the shared queue
    this.sharedQueue = new Queue<QueueMember>(
      this.sharedQueue
        .getItems()
        .filter((queueItem: QueueMember) => queueItem.userId !== userId),
    );

    // Notify the clients with the updated queue size
    this.server.emit('sharedQueue', {
      size: this.sharedQueue.size(),
    });

    // Get the user's socket IDs
    const userSocketIds: string[] = this.socketService.getUserSocketIds(userId);
    if (!userSocketIds.length) return;

    // Notify the client that they have left the queue
    userSocketIds.forEach((socketId: string) => {
      this.server.to(socketId).emit('sharedQueueStatus', {
        status: 'left',
        userId,
      });
    });

    console.log(
      `Client removed from shared queue. Shared queue size: ${this.sharedQueue.size()}, Priority queue size: ${this.priorityQueue.size()}.`,
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
