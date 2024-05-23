-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "targetAudience" TEXT,
    "numChapters" INTEGER NOT NULL,
    "numSubsections" INTEGER NOT NULL,
    "cover" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "pdf" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
