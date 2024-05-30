/*
  Warnings:

  - Added the required column `description` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `chats` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChatStatus" AS ENUM ('creating', 'failed', 'created');

-- AlterTable
ALTER TABLE "chats" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "status" "ChatStatus" NOT NULL DEFAULT 'creating',
ADD COLUMN     "title" TEXT NOT NULL;
