-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_projectsId_fkey" FOREIGN KEY ("projectsId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
