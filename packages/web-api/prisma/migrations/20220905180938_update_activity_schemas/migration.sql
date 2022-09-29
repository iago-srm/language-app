/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `ActivityInstruction` table. All the data in the column will be lost.
  - You are about to drop the column `instruction` on the `ActivityInstruction` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `InstructionAnswer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentOutputId]` on the table `FeedbackToActivity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `answer` to the `ActivityInstruction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `ActivityInstruction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActivityInstruction" DROP CONSTRAINT "ActivityInstruction_activityId_fkey";

-- DropForeignKey
ALTER TABLE "InstructionAnswer" DROP CONSTRAINT "InstructionAnswer_studentId_fkey";

-- DropIndex
DROP INDEX "ActivityInstruction_activityId_key";

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ActivityInstruction" DROP COLUMN "correctAnswer",
DROP COLUMN "instruction",
ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL,
ALTER COLUMN "activityId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "FeedbackToActivity" ADD COLUMN     "studentOutputId" INTEGER;

-- AlterTable
ALTER TABLE "InstructionAnswer" DROP COLUMN "studentId",
ADD COLUMN     "studentOutputId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tokenVersion" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;

-- CreateTable
CREATE TABLE "StudentOutput" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "activityId" INTEGER,
    "studentId" TEXT,

    CONSTRAINT "StudentOutput_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentOutput_id_key" ON "StudentOutput"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FeedbackToActivity_studentOutputId_key" ON "FeedbackToActivity"("studentOutputId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "InstructionAnswer" ADD CONSTRAINT "InstructionAnswer_studentOutputId_fkey" FOREIGN KEY ("studentOutputId") REFERENCES "StudentOutput"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityInstruction" ADD CONSTRAINT "ActivityInstruction_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackToActivity" ADD CONSTRAINT "FeedbackToActivity_studentOutputId_fkey" FOREIGN KEY ("studentOutputId") REFERENCES "StudentOutput"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOutput" ADD CONSTRAINT "StudentOutput_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOutput" ADD CONSTRAINT "StudentOutput_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
