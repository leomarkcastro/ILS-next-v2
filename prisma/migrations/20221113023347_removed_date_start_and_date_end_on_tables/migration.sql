/*
  Warnings:

  - You are about to drop the column `dateEnd` on the `ExamSet` table. All the data in the column will be lost.
  - You are about to drop the column `dateStart` on the `ExamSet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExamSet" DROP COLUMN "dateEnd",
DROP COLUMN "dateStart";
