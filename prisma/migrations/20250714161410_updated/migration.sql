/*
  Warnings:

  - You are about to drop the column `projectId` on the `Teams` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Teams" DROP CONSTRAINT "Teams_projectId_fkey";

-- AlterTable
ALTER TABLE "Teams" DROP COLUMN "projectId";
