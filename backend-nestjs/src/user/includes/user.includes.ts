/**
 * User includes for fetching user entities.
 *
 * @export
 * @constant userIncludes
 * @type {object}
 * @property {boolean} avatar - Whether to include the user's avatar.
 * @property {boolean} connection - Whether to include the user's connection.
 * @property {boolean} wallet - Whether to include the user's wallet.
 * @property {boolean} subscription - Whether to include the user's subscription.
 */
export const userIncludes: object = {
  avatar: true,
  connection: true,
  wallet: true,
  subscription: true,
};
