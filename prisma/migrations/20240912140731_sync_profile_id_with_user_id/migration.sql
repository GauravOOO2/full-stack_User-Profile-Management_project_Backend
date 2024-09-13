/*
  Warnings:

  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "Profile_userId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "userId",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Profile_id_seq";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileId";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
