/*
  Warnings:

  - You are about to drop the column `name` on the `Teams` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `Teams` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `user` table. All the data in the column will be lost.
  - Added the required column `teamName` to the `Teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Teams" DROP COLUMN "name",
DROP COLUMN "surname",
ADD COLUMN     "teamName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "surname";
