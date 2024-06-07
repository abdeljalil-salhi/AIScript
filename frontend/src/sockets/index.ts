// Dependencies
import { Socket, io } from "socket.io-client";

// Interfaces
import { ClientToServerEvents } from "@/contexts/socket/interfaces/client-to-server-events.interface";
import { ServerToClientEvents } from "@/contexts/socket/interfaces/server-to-client-events.interface";
// Providers
import { WS_URL } from "@/providers";

/**
 * The WebSocket connection.
 *
 * @export
 * @type {Socket<ServerToClientEvents, ClientToServerEvents>}
 * @description
 * The WebSocket connection is initialized with the URL of the WebSocket server.
 * The connection is not established automatically, but it is configured to upgrade from HTTP to WebSocket.
 * If the WebSocket transport is not supported, the connection reverts to classic polling.
 * @see https://socket.io/docs/v4/client-api/#new-Manager-url-options
 */
export const ws: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  WS_URL,
  {
    // Use WebSocket first, if available
    transports: ["websocket", "polling"],
    // Upgrade from HTTP to WebSocket
    upgrade: true,
    // Add a timestamp to every request
    timestampRequests: true,
    // Connect automatically after initialization
    autoConnect: false,
    // Secure connection
    secure: process.env.NODE_ENV === "production",
  }
);

ws.on("connect_error", () => {
  // If websocket transport is not supported,
  // revert to classic polling
  // HTTP long-polling: successive HTTP requests (POST for writing, GET for reading)
  ws.io.opts.transports = ["polling", "websocket"];
});
