/*
  Warnings:

  - Added the required column `answers` to the `ExamContents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExamContents" ADD COLUMN     "answers" JSONB NOT NULL;
