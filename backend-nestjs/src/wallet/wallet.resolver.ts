// Dependencies
import { Resolver } from '@nestjs/graphql';

// Services
import { WalletService } from './wallet.service';

/**
 * The wallet resolver that encapsulates all wallet-related GraphQL queries,
 * mutations, and subscriptions.
 *
 * @export
 * @class WalletResolver
 * @module WalletModule
 */
@Resolver()
export class WalletResolver {
  /**
   * Creates an instance of the WalletResolver class.
   *
   * @param {WalletService} walletService - The WalletService instance.
   */
  constructor(private readonly walletService: WalletService) {}
}
