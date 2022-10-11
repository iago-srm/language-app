-- CreateEnum
CREATE TYPE "ActivityTypeValues" AS ENUM ('TEXT', 'VIDEO');

-- CreateEnum
CREATE TYPE "ActivityInstructionTypeValues" AS ENUM ('TEXT', 'OPTIONS');

-- CreateEnum
CREATE TYPE "CefrValues" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "image" TEXT NOT NULL,
    "role" TEXT,
    "tokenVersion" INTEGER NOT NULL DEFAULT 0,
    "authApiId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instructor" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Instructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cefr" "CefrValues",
    "userId" TEXT NOT NULL,
    "instructorId" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentInstructorAssociationInvitation" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL,
    "studentId" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,

    CONSTRAINT "StudentInstructorAssociationInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstructionStudentOutput" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "textOutput" TEXT,
    "instructionId" TEXT,
    "studentOutputId" INTEGER,

    CONSTRAINT "InstructionStudentOutput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityInstructionOption" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isOptionOfId" TEXT,
    "isAnswerOfId" TEXT,
    "isSelectedInId" TEXT,

    CONSTRAINT "ActivityInstructionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityInstruction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "isMultiCorrect" BOOLEAN NOT NULL,
    "textAnswer" TEXT,
    "type" "ActivityInstructionTypeValues" NOT NULL,
    "activityId" INTEGER,

    CONSTRAINT "ActivityInstruction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackToInstructionStudentOutput" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,
    "instructionStudentOutputId" TEXT,

    CONSTRAINT "FeedbackToInstructionStudentOutput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "topics" TEXT[],
    "timeToComplete" INTEGER,
    "content" TEXT NOT NULL,
    "startTime" INTEGER,
    "endTime" INTEGER,
    "contentType" "ActivityTypeValues" NOT NULL,
    "cefr" "CefrValues" NOT NULL,
    "instructorId" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentOutput" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "feedbackGiven" BOOLEAN NOT NULL,
    "activityId" INTEGER,
    "studentId" TEXT,

    CONSTRAINT "StudentOutput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentActivityList" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT,
    "activityId" INTEGER,

    CONSTRAINT "StudentActivityList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_authApiId_key" ON "User"("authApiId");

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_userId_key" ON "Instructor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentInstructorAssociationInvitation_token_key" ON "StudentInstructorAssociationInvitation"("token");

-- CreateIndex
CREATE UNIQUE INDEX "StudentInstructorAssociationInvitation_studentId_key" ON "StudentInstructorAssociationInvitation"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentInstructorAssociationInvitation_instructorId_key" ON "StudentInstructorAssociationInvitation"("instructorId");

-- CreateIndex
CREATE UNIQUE INDEX "FeedbackToInstructionStudentOutput_instructionStudentOutput_key" ON "FeedbackToInstructionStudentOutput"("instructionStudentOutputId");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_id_key" ON "Activity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StudentOutput_id_key" ON "StudentOutput"("id");

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentInstructorAssociationInvitation" ADD CONSTRAINT "StudentInstructorAssociationInvitation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentInstructorAssociationInvitation" ADD CONSTRAINT "StudentInstructorAssociationInvitation_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstructionStudentOutput" ADD CONSTRAINT "InstructionStudentOutput_instructionId_fkey" FOREIGN KEY ("instructionId") REFERENCES "ActivityInstruction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstructionStudentOutput" ADD CONSTRAINT "InstructionStudentOutput_studentOutputId_fkey" FOREIGN KEY ("studentOutputId") REFERENCES "StudentOutput"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityInstructionOption" ADD CONSTRAINT "ActivityInstructionOption_isOptionOfId_fkey" FOREIGN KEY ("isOptionOfId") REFERENCES "ActivityInstruction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityInstructionOption" ADD CONSTRAINT "ActivityInstructionOption_isAnswerOfId_fkey" FOREIGN KEY ("isAnswerOfId") REFERENCES "ActivityInstruction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityInstructionOption" ADD CONSTRAINT "ActivityInstructionOption_isSelectedInId_fkey" FOREIGN KEY ("isSelectedInId") REFERENCES "InstructionStudentOutput"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityInstruction" ADD CONSTRAINT "ActivityInstruction_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackToInstructionStudentOutput" ADD CONSTRAINT "FeedbackToInstructionStudentOutput_instructionStudentOutpu_fkey" FOREIGN KEY ("instructionStudentOutputId") REFERENCES "InstructionStudentOutput"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOutput" ADD CONSTRAINT "StudentOutput_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOutput" ADD CONSTRAINT "StudentOutput_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentActivityList" ADD CONSTRAINT "StudentActivityList_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentActivityList" ADD CONSTRAINT "StudentActivityList_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
