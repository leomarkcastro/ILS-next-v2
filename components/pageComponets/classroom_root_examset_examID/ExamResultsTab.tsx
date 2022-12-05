import { ConditionalBold } from "@/components/utils/ConditionalBold";
import { roundToTwo } from "@/lib/utils";
import surveyQuestions from "@/lib/values/questions";
import chroma from "chroma-js";
import dynamic from "next/dynamic";

const PolarChart = dynamic(() => import("@/components/charts/PolarChart"), {
  ssr: false,
});
const ColumnChart = dynamic(() => import("@/components/charts/ColumnChart"), {
  ssr: false,
});

const scale = [
  chroma.scale(["#06f", "white", "#a0f"]).domain([-1, 0, 1]),
  chroma.scale(["blue", "white", "orange"]).domain([-1, 0, 1]),
  chroma.scale(["indigo", "white", "yellow"]).domain([-1, 0, 1]),
  chroma.scale(["purple", "white", "magenta"]).domain([-1, 0, 1]),
];

export function ExamResultsTab(props) {
  return (
    <div className="contents">
      <div className="flex items-center col-span-3 gap-3">
        <p className="text-2xl">
          <strong className="text-orange-600">
            {roundToTwo(
              (props.statisticData.examTakers /
                Math.max(
                  props.statisticData.totalTakers,
                  props.statisticData.examTakers
                )) *
                100
            )}
            %
          </strong>{" "}
          of expected takers took the exam
        </p>
      </div>
      <div className="col-span-3">
        <p>Takers: {props.statisticData.examTakers}</p>
        <p>Reserved Takers: {props.statisticData.totalTakers}</p>
      </div>{" "}
      <div className="col-span-6">
        <p>
          <strong>Takers</strong>
        </p>
        <div className="grid grid-cols-6 p-2">
          {Object.keys(props.statisticData.takerMatrix).map((taker) => (
            <div
              key={`taker_${taker}`}
              className="flex items-center col-span-6 gap-2"
            >
              <div
                className={`w-3 h-3 border border-gray-500 ${
                  props.statisticData.takerMatrix[taker]
                    ? "bg-green-500"
                    : "bg-white"
                }`}
              ></div>
              <p>{taker}</p>
            </div>
          ))}
        </div>
      </div>
      {props.statisticData.examTakers > 0 ? (
        <>
          <div className="col-span-3">
            <p>
              <b>Average Scoring</b>
            </p>
            <div>
              <ColumnChart
                data={Object.values([
                  roundToTwo(props.statisticData.averagePerCategory.seqGlo),
                  roundToTwo(props.statisticData.averagePerCategory.actRef),
                  roundToTwo(props.statisticData.averagePerCategory.senInt),
                  roundToTwo(props.statisticData.averagePerCategory.visVer),
                ])}
                labels={[
                  ["🔼 Global", "🔽 Sequential"],
                  ["🔼 Reflective", "🔽 Active"],
                  ["🔼 Intuitive", "🔽 Sensing"],
                  ["🔼 Verbal", "🔽 Visual"],
                ]}
                maxValue={Math.max(
                  Math.abs(props.statisticData.averagePerCategory.visVer),
                  Math.abs(props.statisticData.averagePerCategory.senInt),
                  Math.abs(props.statisticData.averagePerCategory.actRef),
                  Math.abs(props.statisticData.averagePerCategory.seqGlo)
                )}
                height="300px"
              />
            </div>

            {false && (
              <div className="grid grid-cols-4">
                {Object.keys(props.statisticData.averagePerCategory).map(
                  (category) => (
                    <p key={`taker_${category}`}>
                      {category}:{" "}
                      {props.statisticData.averagePerCategory[category]}
                    </p>
                  )
                )}
              </div>
            )}
          </div>{" "}
          <div className="col-span-3">
            <p>
              <b>Acronym Count</b>
            </p>
            <div>
              <PolarChart
                data={Object.values(props.statisticData.acronymCount)}
                labels={Object.keys(props.statisticData.acronymCount)}
                height="300px"
              />
            </div>
            {false && (
              <div className="grid grid-cols-4">
                {Object.keys(props.statisticData.acronymCount).map(
                  (category) => (
                    <p key={`taker_${category}`}>
                      {category}: {props.statisticData.acronymCount[category]}
                    </p>
                  )
                )}
              </div>
            )}
          </div>{" "}
          <div className="col-span-6">
            <p>
              <b>Average per Question</b>
            </p>
            <div
              className="grid items-center justify-center gap-1 my-6 gap-y-6"
              style={{
                gridTemplateColumns: "repeat(16, minmax(0, 1fr))",
              }}
            >
              <div className="flex flex-col col-span-3 gap-2 gap-y-6">
                <p className="text">Sequential - Global</p>
                <p className="text">Active - Reflective</p>
                <p className="text">Sensing - Intuitive</p>
                <p className="text">Visual - Verbal</p>
              </div>
              <div className="grid grid-cols-11 col-span-11 gap-2 gap-y-6">
                {props.statisticData.formattedIndex.map((category, index) => (
                  <div
                    className="relative h-5 border border-gray-500 group"
                    key={`taker_${category}`}
                    style={{
                      backgroundColor: `${scale[Math.floor(0)](
                        props.statisticData.averagePerQuestion[category]
                      ).hex()}dd`,
                    }}
                  >
                    <div className="absolute top-0 hidden transform -translate-y-full group-hover:block">
                      <div className="p-1 text-xs bg-white border shadow-md w-36">
                        <p>
                          <strong>
                            [{category}]{" "}
                            {surveyQuestions[category - 1].Question}...
                          </strong>
                        </p>
                        <ConditionalBold
                          condition={
                            props.statisticData.averagePerQuestion[category] < 0
                          }
                        >
                          <p>- {surveyQuestions[category - 1].A}</p>
                        </ConditionalBold>
                        <ConditionalBold
                          condition={
                            props.statisticData.averagePerQuestion[category] > 0
                          }
                        >
                          <p>- {surveyQuestions[category - 1].B}</p>
                        </ConditionalBold>
                        <p>
                          <strong>
                            Average:{" "}
                            {roundToTwo(
                              props.statisticData.averagePerQuestion[category]
                            )}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {false && (
              <div className="grid grid-cols-4 gap-3">
                {Object.keys(props.statisticData.averagePerQuestion).map(
                  (category) => (
                    <p key={`taker_${category}`}>
                      <b>{category}</b>:{" "}
                      {Object.keys(
                        props.statisticData.averagePerQuestion[category]
                      ).map((answer) => (
                        <p key={`taker_${category}_${answer}`}>
                          {answer}:{" "}
                          {
                            props.statisticData.averagePerQuestion[category][
                              answer
                            ]
                          }
                        </p>
                      ))}
                    </p>
                  )
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <p className="col-span-6 p-8 text-center">
          Waiting for Students to Take Exam...
        </p>
      )}
      <div className="col-span-6 my-2">
        <p className="mb-2">
          <strong>Category Breakdown Per Student</strong>
        </p>
        <div className="grid grid-cols-6 gap-3">
          {[
            [["Sequential", "Global"], "seqGlo"],
            [["Active", "Reflective"], "actRef"],
            [["Sensing", "Intuitive"], "senInt"],
            [["Visual", "Verbal"], "visVer"],
          ].map((set, ii) => (
            <div
              key={`set_${ii}`}
              className="grid items-center grid-cols-6 col-span-3 p-2 border shadow-md"
            >
              <div className="col-span-6 text-center">
                <p className="text-center">
                  <strong>
                    {set[0][0]} vs {set[0][1]}
                  </strong>
                </p>
                <div className="grid grid-cols-6">
                  {(set[0] as string[]).map((category, iii) => (
                    <div key={`part_${ii}_${iii}`} className="col-span-3">
                      <p>
                        <strong>{category} Learners</strong>
                      </p>
                      <p>
                        <strong>
                          {props.categoryBreakdown[category].length} student(s)
                        </strong>
                      </p>
                      {props.categoryBreakdown[category].length > 0 ? (
                        <div className="overflow-y-auto max-h-[10vh] hasScrollbar">
                          {props.categoryBreakdown[category].map((student) => (
                            <p key={`taker_${student}`} className="text-xs">
                              {student.Profile?.ProfileDemoraphics.fullname}:{" "}
                              {roundToTwo(
                                Math.abs(
                                  (student.ExamContents[set[1] as string] /
                                    11) *
                                    100
                                )
                              )}{" "}
                              %
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs">No Recorded Result </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
      <div className="col-span-6 my-2 overflow-x-auto max-h-[60vh] overflow-y-auto">
        <p className="mb-2">
          <strong>Result Per Student</strong>
        </p>
        <table className="w-full d-table d-table-normal">
          <thead>
            <th>Name</th>
            <th>Type</th>
            <th>Sequential - Global</th>
            <th>Sensing - Intuitive</th>
            <th>Active - Reflective</th>
            <th>Visual - Verbal</th>
            <th>ID</th>
          </thead>
          <tbody className="">
            {props.rawDataTable.map((student, index) => (
              <tr key={`stud_${index}`} className="hover:d-active">
                <td className="sticky left-0">{student.name}</td>
                <td>{student.type}</td>
                <td>
                  {student.seqGlo}{" "}
                  <strong>
                    ({student.seqGlo < 0 ? "Sequential" : "Global"})
                  </strong>
                </td>
                <td>
                  {student.senInt}{" "}
                  <strong>
                    ({student.senInt < 0 ? "Sensing" : "Intuitive"})
                  </strong>
                </td>
                <td>
                  {student.actRef}{" "}
                  <strong>
                    ({student.actRef < 0 ? "Active" : "Reflective"})
                  </strong>
                </td>
                <td>
                  {student.visVer}{" "}
                  <strong>({student.visVer < 0 ? "Visual" : "Verbal"})</strong>
                </td>
                <td>{student.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
