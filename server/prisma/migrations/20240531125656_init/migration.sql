/*
  Warnings:

  - You are about to alter the column `userId` on the `chats` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.

*/
-- DropIndex
DROP INDEX "chats_userId_key";

-- AlterTable
ALTER TABLE "chats" ALTER COLUMN "userId" SET DATA TYPE VARCHAR(256);
