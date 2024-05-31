-- CreateEnum
CREATE TYPE "UserSystemEnum" AS ENUM ('system', 'user');

-- CreateEnum
CREATE TYPE "ChatStatus" AS ENUM ('creating', 'failed', 'created');

-- CreateTable
CREATE TABLE "chats" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pdfName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "status" "ChatStatus" NOT NULL DEFAULT 'creating',

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "chatId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "UserSystemEnum" NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chats_userId_key" ON "chats"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "chats_fileKey_key" ON "chats"("fileKey");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
