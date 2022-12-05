/*
  Warnings:

  - Added the required column `notes` to the `ExamSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `options` to the `ExamSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExamSet" ADD COLUMN     "notes" TEXT NOT NULL,
ADD COLUMN     "options" JSONB NOT NULL,
ADD COLUMN     "whitelist" BOOLEAN NOT NULL DEFAULT false;
