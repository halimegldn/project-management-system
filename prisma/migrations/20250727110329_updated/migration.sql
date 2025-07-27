-- AlterTable
ALTER TABLE "Teams" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
