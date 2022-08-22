/*
  Warnings:

  - You are about to drop the `CodeTemplate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CodeTemplate";

-- CreateTable
CREATE TABLE "CodeSnippt" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "overview" TEXT,
    "description" TEXT,
    "code" TEXT NOT NULL,

    CONSTRAINT "CodeSnippt_pkey" PRIMARY KEY ("id")
);
