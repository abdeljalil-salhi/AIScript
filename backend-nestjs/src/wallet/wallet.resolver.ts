import { Resolver } from '@nestjs/graphql';
import { WalletService } from './wallet.service';

@Resolver()
export class WalletResolver {
  constructor(private readonly walletService: WalletService) {}
}
