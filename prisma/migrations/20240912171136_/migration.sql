-- DropForeignKey
ALTER TABLE "SomeModel" DROP CONSTRAINT "SomeModel_userId_fkey";

-- AddForeignKey
ALTER TABLE "SomeModel" ADD CONSTRAINT "SomeModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
