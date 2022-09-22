-- CreateTable
CREATE TABLE "ActivitiesInProgress" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "activityId" INTEGER,
    "studentId" TEXT,

    CONSTRAINT "ActivitiesInProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivitiesInProgress_id_key" ON "ActivitiesInProgress"("id");

-- AddForeignKey
ALTER TABLE "ActivitiesInProgress" ADD CONSTRAINT "ActivitiesInProgress_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivitiesInProgress" ADD CONSTRAINT "ActivitiesInProgress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
