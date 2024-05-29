/**
 * Interface for the wallet error event.
 *
 * @export
 * @interface WalletErrorEvent
 * @property {("notFound" | "insufficientFunds")} status - The status of the error
 * @property {string} userId - The ID of the user.
 * @property {string} reason - The reason for the error.
 */
export interface WalletErrorEvent {
  status: "notFound" | "insufficientFunds";
  userId: string;
  reason: string;
}
