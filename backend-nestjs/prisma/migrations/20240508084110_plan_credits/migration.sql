-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_paymentId_fkey";

-- AlterTable
ALTER TABLE "plans" ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "subscriptions" ALTER COLUMN "paymentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
