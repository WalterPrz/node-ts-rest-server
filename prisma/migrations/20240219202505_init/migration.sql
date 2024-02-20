-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "text" CHAR NOT NULL,
    "completedAt" TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
