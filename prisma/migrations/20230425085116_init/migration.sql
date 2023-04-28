-- CreateTable
CREATE TABLE "Checklist" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(30) NOT NULL,

    CONSTRAINT "Checklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(30) NOT NULL,
    "checklistsId" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_checklistsId_fkey" FOREIGN KEY ("checklistsId") REFERENCES "Checklist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
