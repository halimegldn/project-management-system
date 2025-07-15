-- CreateTable
CREATE TABLE "_ProjectTeams" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectTeams_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProjectTeams_B_index" ON "_ProjectTeams"("B");

-- AddForeignKey
ALTER TABLE "_ProjectTeams" ADD CONSTRAINT "_ProjectTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectTeams" ADD CONSTRAINT "_ProjectTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "Teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
