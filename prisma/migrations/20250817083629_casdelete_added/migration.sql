/*
  Warnings:

  - You are about to drop the column `projectsId` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Tasks" DROP CONSTRAINT "Tasks_projectsId_fkey";

-- AlterTable
ALTER TABLE "public"."Tasks" DROP COLUMN "projectsId",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Tasks" ADD CONSTRAINT "Tasks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
