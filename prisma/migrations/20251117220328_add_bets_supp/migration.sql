/*
  Warnings:

  - You are about to drop the column `potentialGain` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `won` on the `Bet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "potentialGain",
DROP COLUMN "won",
ADD COLUMN     "payout" DOUBLE PRECISION,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
