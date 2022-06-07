-- AlterTable
ALTER TABLE "users" ADD COLUMN     "image" TEXT,
ADD COLUMN     "provider" TEXT,
ALTER COLUMN "hashedPassword" DROP NOT NULL;
