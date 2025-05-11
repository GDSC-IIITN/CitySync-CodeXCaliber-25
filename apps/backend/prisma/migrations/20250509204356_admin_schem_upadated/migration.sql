/*
  Warnings:

  - You are about to drop the column `phoneNo` on the `super_admins` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "super_admins_phoneNo_key";

-- AlterTable
ALTER TABLE "super_admins" DROP COLUMN "phoneNo";
