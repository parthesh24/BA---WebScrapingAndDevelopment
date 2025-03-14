/*
  Warnings:

  - You are about to drop the `Art` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Art";

-- CreateTable
CREATE TABLE "Travel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "author" TEXT,
    "timestamp" TEXT,
    "imageUrl" TEXT,
    "content" TEXT,
    "url" TEXT NOT NULL,
    "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Travel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Earth" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "author" TEXT,
    "timestamp" TEXT,
    "imageUrl" TEXT,
    "content" TEXT,
    "url" TEXT NOT NULL,
    "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Earth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Travel_url_key" ON "Travel"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Earth_url_key" ON "Earth"("url");
