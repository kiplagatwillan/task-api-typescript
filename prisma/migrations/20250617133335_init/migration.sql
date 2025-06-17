-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "task_title" TEXT NOT NULL,
    "task_description" TEXT NOT NULL,
    "complete_check" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);
