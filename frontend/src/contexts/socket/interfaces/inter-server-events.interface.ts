/**
 * Interface for inter-server events.
 *
 * @export
 * @interface InterServerEvents
 * @property {(): void} ping - The event to ping the server.
 */
export interface InterServerEvents {
  ping: () => void;
}
