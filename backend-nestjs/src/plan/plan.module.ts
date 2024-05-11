// Dependencies
import { Module } from '@nestjs/common';

// Services
import { PlanService } from './plan.service';
import { PrismaService } from 'src/prisma/prisma.service';
// Resolvers
import { PlanResolver } from './plan.resolver';

/**
 * The plan module, containing all plan-related functionality.
 *
 * @export
 * @class PlanModule
 */
@Module({
  providers: [PlanResolver, PlanService, PrismaService],
  exports: [PlanService],
})
export class PlanModule {}
