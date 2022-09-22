/*
  Warnings:

  - You are about to drop the `_ActivityToStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ActivityToStudent" DROP CONSTRAINT "_ActivityToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActivityToStudent" DROP CONSTRAINT "_ActivityToStudent_B_fkey";

-- DropTable
DROP TABLE "_ActivityToStudent";
