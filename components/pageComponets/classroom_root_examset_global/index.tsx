import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import surveyQuestions from "@/lib/values/questions";
import {
  flattenObject,
  formatDateAndTimeAMPM,
  removeDuplicates,
} from "@/lib/utils";
import { ExamSurveyTab } from "@/components/pageComponets/classroom_root_examset_examID/ExamSurveyTab";
import { ExamResultsTab } from "@/components/pageComponets/classroom_root_examset_examID/ExamResultsTab";
import { exportToExcel } from "@/lib/excel_maker/write";
import { useSession } from "next-auth/react";
import { ExamPersonalSurveyTab } from "../classroom_root_examset_examID/ExamPersonalSurveyTab";

function ExamInfo({ displayData, createExcelAction }) {
  return (
    <div className="contents">
      <h2 className="col-span-6 text-4xl font-bold">{displayData.name}</h2>
      <h4 className="hidden col-span-6">
        Counducted by: <strong>{displayData.facilitator}</strong>
      </h4>
      <div className="col-span-6 pl-3 border-l-4 border-gray-500">
        {displayData.notes}
      </div>
      <div className="hidden col-span-6">
        <p>
          Class: <strong>{displayData.classProfile.name}</strong>
        </p>
        <p>
          School: <strong>{displayData.classProfile.school}</strong>
        </p>
      </div>
      <div className="col-span-6 p-3 text-center bg-gray-200 shadow-md">
        <p className="text-xl">
          <strong>Download</strong>
        </p>
        <div className="flex flex-col justify-center gap-3 lg:flex-row lg:flex-wrap">
          <button
            className="d-btn d-btn-primary d-btn-sm"
            name="survey"
            onClick={createExcelAction}
          >
            Download Taker Demographics Excel
          </button>
          <button
            className="d-btn d-btn-primary d-btn-sm"
            name="results"
            onClick={createExcelAction}
          >
            Download Exam Results Excel
          </button>{" "}
          <button
            className="d-btn d-btn-primary d-btn-sm"
            name="overall"
            onClick={createExcelAction}
          >
            Download Overall Exam Results
          </button>{" "}
          <button
            className="d-btn d-btn-primary d-btn-sm"
            name="detailed"
            onClick={createExcelAction}
          >
            Download Overall Detailed Exam Results
          </button>{" "}
        </div>
      </div>
    </div>
  );
}

function ViewTabs({ currentTabIndex, setCurrentTabIndex }) {
  return (
    <div className="w-full d-tabs">
      <a
        className={`flex-1 d-tab d-tab-bordered ${
          currentTabIndex == 0 ? "d-tab-active" : ""
        }`}
        onClick={() => setCurrentTabIndex(0)}
      >
        Taker Demographics
      </a>
      <a
        className={`flex-1 d-tab d-tab-bordered ${
          currentTabIndex == 1 ? "d-tab-active" : ""
        }`}
        onClick={() => setCurrentTabIndex(2)}
      >
        Survey Answers
      </a>
      <a
        className={`flex-1 d-tab d-tab-bordered ${
          currentTabIndex == 1 ? "d-tab-active" : ""
        }`}
        onClick={() => setCurrentTabIndex(1)}
      >
        Exam Results
      </a>
    </div>
  );
}

function Page() {
  const router = useRouter();

  const [displayData, setDisplayData] = useState(null);

  const { data } = useSession();

  const loadPageData = async () => {
    const examData = await fetch(`/api/actions/exam/getAllExamSet`);
    // console.log(await examData.json());
    const rawDataCollection = (await examData.json()).examAll;

    // const examDataJSON = (await examData.json()).examSetDataComplete;

    // console.log(examDataJSON);

    // get room ID
    // get all takers (if whitelist, or just return the takers of room)
    // get total results
    // console.log(rawDataCollection);
    const examDataJSON = {
      id: "--examID--",
      name: "Global Collection",
      notes: "This is a global collection of all the exams",
      classId: "--classID--",
      dateStart: false,
      dateEnd: false,
      createdAt: false,
      updatedAt: false,
      options: {},
      whitelist: false,
      Exam: rawDataCollection,
      Takers: [], //rawDataCollection.map((exam) => exam.Takers).flat(),
      Class: {
        ClassProfile: {
          id: "--classID--",
          classId: "--classID--",
          name: "", //removeDuplicates(
          // rawDataCollection.map((exam) => exam.Class.ClassProfile.name)
          // ).join(", "),
          school: "", //removeDuplicates(
          // rawDataCollection.map((exam) => exam.Class.ClassProfile.school)
          // ).join(", "),
          notes: "This is a global collection of all the exams",
          createdAt: false,
          updatedAt: false,
        },
        Facilitator: {
          User: {
            email: "", // data.user.email,
          },
        },
        Students: [], //rawDataCollection.map((exam) => exam.Class.Students).flat(),
      },
    };

    // console.log(examDataJSON);

    // return;

    const _takers =
      examDataJSON.Takers.length > 0
        ? examDataJSON.Takers.map((taker) => taker.User.email)
        : examDataJSON.Class.Students.map((taker) => taker.profile.User.email);
    const _exams = examDataJSON.Exam;

    // console.log(_takers);
    // console.log(_exams);

    const _displayData = {
      name: examDataJSON.name,
      dateStart: false,
      dateEnd: false,
      notes: examDataJSON.notes,
      facilitator: examDataJSON.Class.Facilitator.User.email,
      classProfile: {
        name: examDataJSON.Class.ClassProfile.name,
        school: examDataJSON.Class.ClassProfile.school,
        notes: examDataJSON.Class.ClassProfile.notes,
      },
      takers: _takers,
      exams: _exams,
    };

    // console.log(_displayData);

    // on js
    // - create a grid of those who already taken
    // - take the most frequests, the average
    // - create a graph for each type
    // - create a graph for each question

    const _acronymCounts = {};
    const _categorySum = {};
    const _categoryAve = {};
    const _questionSum = {};
    const _questionAve = {};
    for (let i = 0; i < _displayData.exams.length; i++) {
      // Get exam data
      const _exam = _displayData.exams[i];

      // increment acronymcounter
      _acronymCounts[_exam.ExamContents.type] = _acronymCounts[
        _exam.ExamContents.type
      ]
        ? _acronymCounts[_exam.ExamContents.type] + 1
        : 1;

      // add up category
      _categorySum["senInt"] =
        (_categorySum["senInt"] || 0) + _exam.ExamContents.senInt;
      _categorySum["seqGlo"] =
        (_categorySum["seqGlo"] || 0) + _exam.ExamContents.seqGlo;
      _categorySum["actRef"] =
        (_categorySum["actRef"] || 0) + _exam.ExamContents.actRef;
      _categorySum["visVer"] =
        (_categorySum["visVer"] || 0) + _exam.ExamContents.visVer;

      // console.log(_categorySum);
      // add up all answer sum
      for (
        let a = 1;
        a < Object.keys(_exam.ExamContents.answers).length + 1;
        a++
      ) {
        _questionSum[a] = _questionSum[a] || { A: 0, B: 0 };
        _questionSum[a][_exam.ExamContents.answers[a]] += 1;
      }
    }

    // get average of _categorySum
    for (let key in _categorySum) {
      _categoryAve[key] = _categorySum[key] / _displayData.exams.length;
    }

    const _formattedIndex = [];
    // get average of _questionSum
    for (let index in _questionSum) {
      const _index = +index - 1;
      const actualIndex = Math.floor(_index / 11) + 1 + (_index % 11) * 4;
      // console.log(actualIndex);
      _formattedIndex.push(actualIndex);
      _questionAve[index] =
        (_questionSum[index].B - _questionSum[index].A) /
        _displayData.exams.length;
    }

    const _reformattedIndex = [
      ..._formattedIndex.slice(33, 44),
      ..._formattedIndex.slice(0, 11),
      ..._formattedIndex.slice(11, 22),
      ..._formattedIndex.slice(22, 33),
    ];

    // check each takers if they have taken the exam
    const _examinerEmails = _exams.map((exam) => exam.Profile?.User?.email);

    const _takerMatrix = {};

    for (let expectedTaker in _takers) {
      _takerMatrix[_takers[expectedTaker]] = _examinerEmails.includes(
        _takers[expectedTaker]
      );
    }

    const _statisticData = {
      totalTakers: _takers.length,
      examTakers: _exams.length,
      acronymCount: _acronymCounts,
      sumPerCategory: _categorySum,
      averagePerCategory: _categoryAve,
      sumPerQuestion: _questionSum,
      averagePerQuestion: _questionAve,
      formattedIndex: _reformattedIndex,
      takerMatrix: _takerMatrix,
    };

    // console.log(_statisticData);

    // get breakdown of each category
    const _categoryBreakdown = {
      Sequential: [],
      Global: [],
      Reflective: [],
      Active: [],
      Intuitive: [],
      Sensing: [],
      Visual: [],
      Verbal: [],
    };

    for (let exam of _exams) {
      const _exam = exam.ExamContents;
      if (_exam.seqGlo < 0) {
        _categoryBreakdown.Sequential.push({ ...exam });
      } else {
        _categoryBreakdown.Global.push({ ...exam });
      }

      if (_exam.actRef < 0) {
        _categoryBreakdown.Active.push({ ...exam });
      } else {
        _categoryBreakdown.Reflective.push({ ...exam });
      }

      if (_exam.senInt < 0) {
        _categoryBreakdown.Sensing.push({ ...exam });
      } else {
        _categoryBreakdown.Intuitive.push({ ...exam });
      }

      if (_exam.visVer < 0) {
        _categoryBreakdown.Visual.push({ ...exam });
      } else {
        _categoryBreakdown.Verbal.push({ ...exam });
      }
    }

    // get data for a queryable table
    const _rawDataTable = [];
    const _completeRawDataTable = [];
    const _completeDetailedRawDataTable = [];
    const _profiles = [];
    for (let exam of _exams.filter((exam) => exam.Profile)) {
      const _exam = exam.ExamContents;
      const _detailedAnswers = { ..._exam.answers };
      Object.keys(_detailedAnswers).forEach(function (key, index) {
        _detailedAnswers[key] = surveyQuestions[index][_detailedAnswers[key]];
      });
      const _detailedSurveyAnswers = {
        ...exam.Profile?.ProfileDemoraphics,
        surveyAnswers: { ...exam.Profile?.ProfileDemoraphics?.surveyAnswers },
      };
      Object.keys(_detailedSurveyAnswers.surveyAnswers).forEach(function (
        key,
        index
      ) {
        _detailedSurveyAnswers.surveyAnswers[key] = [
          "Never",
          "Rarely",
          "Sometimes",
          "Often",
          "Always",
        ][_detailedSurveyAnswers.surveyAnswers[key] - 1];
      });
      _rawDataTable.push({
        name: exam.Profile?.ProfileDemoraphics?.fullname,
        id: exam.Profile?.ProfileDemoraphics?.id,
        examId: _exam.id,
        type: _exam.type,
        senInt: _exam.senInt,
        seqGlo: _exam.seqGlo,
        actRef: _exam.actRef,
        visVer: _exam.visVer,
        answers: _exam.answers,
      });
      _completeRawDataTable.push({
        name: exam.Profile?.ProfileDemoraphics?.fullname,
        summary: {
          type: _exam.type,
          senInt: _exam.senInt,
          seqGlo: _exam.seqGlo,
          actRef: _exam.actRef,
          visVer: _exam.visVer,
        },
        answers: _exam.answers,
        profile: exam.Profile?.ProfileDemoraphics,
      });
      _completeDetailedRawDataTable.push({
        name: exam.Profile?.ProfileDemoraphics?.fullname,
        summary: {
          type: _exam.type,
          senInt: _exam.senInt > 0 ? "Intuitive" : "Sensing",
          seqGlo: _exam.seqGlo > 0 ? "Global" : "Sequential",
          actRef: _exam.actRef > 0 ? "Reflective" : "Active",
          visVer: _exam.visVer > 0 ? "Verbal" : "Visual",
        },
        answers: _detailedAnswers,
        profile: _detailedSurveyAnswers,
      });
      _profiles.push({
        ...exam.Profile?.ProfileDemoraphics,
        year: exam.Profile?.ProfileDemoraphics?.year.toString(),
      });
    }

    // console.log(_categoryBreakdown);

    // console.log(_rawDataTable);

    setDisplayData({
      displayData: _displayData,
      statisticData: _statisticData,
      categoryBreakdown: _categoryBreakdown,
      rawDataTable: _rawDataTable,
      completeRawDataTable: _completeRawDataTable,
      completeDetailedRawDataTable: _completeDetailedRawDataTable,
      profile: _profiles,
    });

    // console.log({
    //   displayData: _displayData,
    //   statisticData: _statisticData,
    //   categoryBreakdown: _categoryBreakdown,
    //   rawDataTable: _rawDataTable,
    // });
  };

  useEffect(() => {
    loadPageData();
  }, [router]);

  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  function createExcel(e) {
    const srcBtn = e.nativeEvent?.srcElement?.name || "";
    if (srcBtn.includes("survey")) {
      exportToExcel({
        excelData: displayData.profile.map((o) => flattenObject(o)),
        fileName: `Survey Takers - ${
          displayData.displayData.name
        } [${formatDateAndTimeAMPM(new Date())}]`,
      });
    }
    if (srcBtn.includes("results")) {
      exportToExcel({
        excelData: displayData.rawDataTable.map((o) => flattenObject(o)),
        fileName: `Examination Results - ${
          displayData.displayData.name
        } [${formatDateAndTimeAMPM(new Date())}]`,
      });
    }
    if (srcBtn.includes("overall")) {
      exportToExcel({
        excelData: displayData.completeRawDataTable.map((o) =>
          flattenObject(o)
        ),
        fileName: `Overall Results - ${
          displayData.displayData.name
        } [${formatDateAndTimeAMPM(new Date())}]`,
      });
    }
    if (srcBtn.includes("detailed")) {
      // console.log(displayData.completeDetailedRawDataTable);
      exportToExcel({
        excelData: displayData.completeDetailedRawDataTable.map((o) =>
          flattenObject(o)
        ),
        fileName: `Overall Results - ${
          displayData.displayData.name
        } [${formatDateAndTimeAMPM(new Date())}]`,
      });
    }
  }

  if (!displayData)
    return (
      <div className="max-w-screen-lg min-h-screen mx-auto mt-24">
        <div className="w-full min-h-[80vh] flex flex-col justify-center items-center">
          <p>Loading</p>
        </div>
      </div>
    );

  return (
    <div className="max-w-screen-lg min-h-screen mx-auto mt-24">
      <div className="grid grid-cols-6 gap-4 mb-8">
        <ExamInfo
          displayData={displayData.displayData}
          createExcelAction={createExcel}
        ></ExamInfo>
      </div>
      <ViewTabs
        currentTabIndex={currentTabIndex}
        setCurrentTabIndex={setCurrentTabIndex}
      ></ViewTabs>
      {currentTabIndex === 0 && (
        <div className="p-2 mb-12 border-2 shadow-md">
          <ExamSurveyTab displayData={displayData}></ExamSurveyTab>
        </div>
      )}
      {currentTabIndex === 2 && (
        <div className="p-2 mb-12 border-2 shadow-md">
          <ExamPersonalSurveyTab
            displayData={displayData}
          ></ExamPersonalSurveyTab>
        </div>
      )}
      {currentTabIndex === 1 && (
        <div className="grid grid-cols-6 gap-4 p-2 mb-12 border-2 shadow-md">
          <ExamResultsTab
            statisticData={displayData.statisticData}
            categoryBreakdown={displayData.categoryBreakdown}
            rawDataTable={displayData.rawDataTable}
          ></ExamResultsTab>
        </div>
      )}
    </div>
  );
}

export default Page;
