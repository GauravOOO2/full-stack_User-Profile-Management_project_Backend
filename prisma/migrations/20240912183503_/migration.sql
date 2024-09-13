-- DropForeignKey
ALTER TABLE "SomeModel" DROP CONSTRAINT "SomeModel_userId_fkey";

-- AlterTable
CREATE SEQUENCE profile_id_seq;
ALTER TABLE "Profile" ALTER COLUMN "id" SET DEFAULT nextval('profile_id_seq');
ALTER SEQUENCE profile_id_seq OWNED BY "Profile"."id";

-- AddForeignKey
ALTER TABLE "SomeModel" ADD CONSTRAINT "SomeModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
