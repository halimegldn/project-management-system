-- DropForeignKey
ALTER TABLE "Teams" DROP CONSTRAINT "Teams_projectId_fkey";

-- AlterTable
ALTER TABLE "Teams" ALTER COLUMN "projectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
