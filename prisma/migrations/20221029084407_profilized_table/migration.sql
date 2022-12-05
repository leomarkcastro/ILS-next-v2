/*
  Warnings:

  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Class` table. All the data in the column will be lost.
  - The primary key for the `Exam` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ExamSet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Profile` table. All the data in the column will be lost.
  - The primary key for the `StudentsOnClasses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_facilitatorID_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_examSetId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_profileId_fkey";

-- DropForeignKey
ALTER TABLE "ExamSet" DROP CONSTRAINT "ExamSet_classId_fkey";

-- DropForeignKey
ALTER TABLE "StudentsOnClasses" DROP CONSTRAINT "StudentsOnClasses_classId_fkey";

-- DropForeignKey
ALTER TABLE "StudentsOnClasses" DROP CONSTRAINT "StudentsOnClasses_profileId_fkey";

-- DropForeignKey
ALTER TABLE "_ExamSetToProfile" DROP CONSTRAINT "_ExamSetToProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExamSetToProfile" DROP CONSTRAINT "_ExamSetToProfile_B_fkey";

-- AlterTable
ALTER TABLE "Class" DROP CONSTRAINT "Class_pkey",
DROP COLUMN "name",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "facilitatorID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Class_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Class_id_seq";

-- AlterTable
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "profileId" SET DATA TYPE TEXT,
ALTER COLUMN "examSetId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Exam_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Exam_id_seq";

-- AlterTable
ALTER TABLE "ExamSet" DROP CONSTRAINT "ExamSet_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "classId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ExamSet_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ExamSet_id_seq";

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
DROP COLUMN "name",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Profile_id_seq";

-- AlterTable
ALTER TABLE "StudentsOnClasses" DROP CONSTRAINT "StudentsOnClasses_pkey",
ALTER COLUMN "profileId" SET DATA TYPE TEXT,
ALTER COLUMN "classId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StudentsOnClasses_pkey" PRIMARY KEY ("profileId", "classId");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileId" TEXT;

-- AlterTable
ALTER TABLE "_ExamSetToProfile" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "ClassProfile" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClassProfile_classId_key" ON "ClassProfile"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "StudentsOnClasses" ADD CONSTRAINT "StudentsOnClasses_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsOnClasses" ADD CONSTRAINT "StudentsOnClasses_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_facilitatorID_fkey" FOREIGN KEY ("facilitatorID") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassProfile" ADD CONSTRAINT "ClassProfile_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSet" ADD CONSTRAINT "ExamSet_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_examSetId_fkey" FOREIGN KEY ("examSetId") REFERENCES "ExamSet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamSetToProfile" ADD CONSTRAINT "_ExamSetToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "ExamSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamSetToProfile" ADD CONSTRAINT "_ExamSetToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
