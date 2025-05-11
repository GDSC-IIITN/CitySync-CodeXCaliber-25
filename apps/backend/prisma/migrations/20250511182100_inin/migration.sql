-- CreateEnum
CREATE TYPE "ResourceStatus" AS ENUM ('Available', 'Unavailable');

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "status" "ResourceStatus" NOT NULL DEFAULT 'Available';
