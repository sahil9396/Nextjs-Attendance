/*
  Warnings:

  - You are about to drop the column `phone_number` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Semester" ALTER COLUMN "semester" SET DEFAULT 'semester-1';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone_number";
