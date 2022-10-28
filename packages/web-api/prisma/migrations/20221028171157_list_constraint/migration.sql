/*
  Warnings:

  - A unique constraint covering the columns `[studentId,activityId]` on the table `StudentActivityList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StudentActivityList_studentId_activityId_key" ON "StudentActivityList"("studentId", "activityId");
