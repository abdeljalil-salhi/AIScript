/*
  Warnings:

  - Added the required column `expiresAt` to the `email_verifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "email_verifications" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
