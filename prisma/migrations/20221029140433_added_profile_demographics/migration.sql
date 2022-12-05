-- CreateTable
CREATE TABLE "ProfileDemoraphics" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "gender" TEXT,
    "age" INTEGER,
    "religion" TEXT,
    "course" TEXT,
    "year" INTEGER,
    "specialization" TEXT,
    "section" TEXT,
    "municipality" TEXT,
    "province" TEXT,
    "familyType" TEXT,

    CONSTRAINT "ProfileDemoraphics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamContents" (
    "id" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "seqGlo" INTEGER NOT NULL,
    "actRef" INTEGER NOT NULL,
    "senInt" INTEGER NOT NULL,
    "visVer" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExamContents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfileDemoraphics_profileId_key" ON "ProfileDemoraphics"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "ExamContents_examId_key" ON "ExamContents"("examId");

-- AddForeignKey
ALTER TABLE "ProfileDemoraphics" ADD CONSTRAINT "ProfileDemoraphics_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamContents" ADD CONSTRAINT "ExamContents_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
