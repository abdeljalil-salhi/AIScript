/*
  Warnings:

  - You are about to drop the column `credit` on the `wallets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "wallets" DROP COLUMN "credit",
ADD COLUMN     "balance" INTEGER NOT NULL DEFAULT 0;
