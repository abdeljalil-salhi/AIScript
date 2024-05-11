/**
 * Subscription includes for fetching subscription entities.
 *
 * @export
 * @constant subscriptionIncludes
 * @type {object}
 * @property {boolean} user - Whether to include the user of the subscription.
 * @property {boolean} plan - Whether to include the plan of the subscription.
 * @property {boolean} payment - Whether to include the payment of the subscription.
 */
export const subscriptionIncludes: object = {
  user: true,
  plan: true,
  payment: true,
};
