/*
  Warnings:

  - Changed the type of `otp` on the `EmailVerify` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "EmailVerify" DROP COLUMN "otp",
ADD COLUMN     "otp" INTEGER NOT NULL;
