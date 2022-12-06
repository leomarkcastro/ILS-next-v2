import { useEffect, useState, useRef } from "react";
import surveyQuestions from "../../lib/values/questions";
import surveyReflections from "../../lib/values/reflections";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid";

export default function Page() {
  const router = useRouter();

  const predictedType = {
    get: () => {
      return localStorage.getItem("predictedType");
    },
    set: (code) => {
      localStorage.setItem("predictedType", code);
    },
    clear: () => {
      localStorage.removeItem("predictedType");
    },
  };

  const surveyLength = surveyQuestions.length;
  const [survey, setSurvey] = useState({
    question:
      "Questions Will Appear Here. Click The Buttons On The Lower Right Depending on What You Think Fits Your Description",

    options: [
      {
        text: "Ok!",
        value: "A",
        hidden: true,
      },
      {
        text: "Ok!",
        value: "B",
      },
    ],
    start: false,
    finish: false,
    index: 0,
  });
  const [result, setResult] = useState({
    scaleList: {
      "Sequential - Global": 0,
      "Active - Reflective": 0,
      "Sensing - Intuitive": 0,
      "Visual - Verbal": 0,
    },
    displayScaleList: {
      "Sequential - Global": 0,
      "Active - Reflective": 0,
      "Sensing - Intuitive": 0,
      "Visual - Verbal": 0,
    },
    finalResult: {
      "Sequential - Global": "",
      "Active - Reflective": "",
      "Sensing - Intuitive": "",
      "Visual - Verbal": "",
    },
    reflections: {
      "Sequential - Global": {},
      "Active - Reflective": {},
      "Sensing - Intuitive": {},
      "Visual - Verbal": {},
    },
    picks: {},

    acronym: "",
    modalMessage: "",
  });

  const frozen = useRef(false);

  function showResult() {
    const displayScaleList = result.scaleList;

    const finalResult = {
      "Sequential - Global":
        result.scaleList["Sequential - Global"] < 0 ? "Sequential" : "Global",
      "Active - Reflective":
        result.scaleList["Active - Reflective"] < 0 ? "Active" : "Reflective",
      "Sensing - Intuitive":
        result.scaleList["Sensing - Intuitive"] < 0 ? "Sensing" : "Intuitive",
      "Visual - Verbal":
        result.scaleList["Visual - Verbal"] < 0 ? "Visual" : "Verbal",
    };

    const reflections = {
      "Sequential - Global":
        surveyReflections[
          finalResult["Sequential - Global"] as "Sequential" | "Global"
        ],
      "Active - Reflective":
        surveyReflections[
          finalResult["Active - Reflective"] as "Active" | "Reflective"
        ],
      "Sensing - Intuitive":
        surveyReflections[
          finalResult["Sensing - Intuitive"] as "Sensing" | "Intuitive"
        ],
      "Visual - Verbal":
        surveyReflections[
          finalResult["Visual - Verbal"] as "Visual" | "Verbal"
        ],
    };

    let acronym =
      finalResult["Sequential - Global"][0] +
      finalResult["Active - Reflective"][0] +
      finalResult["Sensing - Intuitive"][0] +
      finalResult["Visual - Verbal"].slice(0, 3);

    setResult({
      acronym,
      reflections,
      finalResult,
      displayScaleList,
      scaleList: result.scaleList,
      picks: result.picks,
      modalMessage: "",
    });
  }

  const [showAll, setShowAll] = useState(false);
  function formSubmit(e) {
    setShowAll(true);
    e.preventDefault();

    // get the values from the form
    // e.target["question#0"].value;
    for (let i = 0; i < surveyLength; i++) {
      // console.log(i);
      const pick = e.target[`question#${i}`].value;
      const scale = surveyQuestions[i].Scale;
      result.scaleList[scale] += pick === "B" ? 1 : -1;
      result.picks[i + 1] = pick;
    }

    survey.finish = true;

    setSurvey({ ...survey });
    setResult({ ...result });

    // scroll to top
    window.scrollTo(0, 0);
    showResult();

    // console.log(result.picks);
  }

  function computeRounded(value: number) {
    return Math.round(value * 100) / 100;
  }

  function _simulateEnd() {
    survey.index = surveyLength;
    survey.finish = true;
    const keys = [
      "Active - Reflective",
      "Sensing - Intuitive",
      "Visual - Verbal",
      "Sequential - Global",
    ];
    for (let i = 1; i < surveyLength + 1; i++) {
      const choice = Math.random() > 0.5 ? "B" : "A";
      result.picks[i] = choice;
      result.scaleList[keys[(i - 1) % 4]] += choice === "B" ? 1 : -1;
    }
    // console.log(result.picks);
    showResult();
  }

  function roundToThree(num: number) {
    return Math.round((num + Number.EPSILON) * 1000) / 1000;
  }

  function saveExam() {
    const { scaleList } = result;

    const exam = {
      seqGlo: roundToThree(scaleList["Sequential - Global"]),
      actRef: roundToThree(scaleList["Active - Reflective"]),
      senInt: roundToThree(scaleList["Sensing - Intuitive"]),
      visVer: roundToThree(scaleList["Visual - Verbal"]),
      acronym: result.acronym,
      picks: result.picks,
    };

    // console.log(result);

    let id;
    const { examID, roomID } = router.query;

    const classCode =
      localStorage.getItem("classCode") != "-none-"
        ? localStorage.getItem("classCode")
        : undefined;

    id = undefined; //examID ? examID : classCode;

    // console.log(exam);

    // return;

    fetch(`/api/actions/exam/submit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exam),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.success) {
          setResult({
            ...result,
            modalMessage: "Exam Saved Successfully",
          });
          toast("Exam Saved Successfully");

          localStorage.removeItem("classCode");

          // predictedType.clear();
          // router.push("/profile");
        } else {
          setResult({
            ...result,
            modalMessage: "Error Saving Exam",
          });
          toast(res.error, {
            type: "error",
          });
        }
      });

    // const examString = JSON.stringify(exam);

    // localStorage.setItem("exam", examString);

    // setResult({
    //   ...result,
    //   modalMessage: "Saved!",
    // });
  }

  const [Mods, setMods] = useState({
    ReactRough: null,
  });

  useEffect(() => {
    // load commonjs modules
    (async () => {
      const ReactRough = await import("react-rough");
      setMods({
        ReactRough,
      });
      // _simulateEnd();
    })();
  }, []);

  const saveRef = useRef(false);

  const [predicted, setPredicted] = useState(null);

  useEffect(() => {
    if (!saveRef.current && survey.finish) {
      saveRef.current = true;
      saveExam();
      setPredicted(predictedType.get());
    }
  }, [survey.finish]);

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="">
      <div className="w-full transition-transform">
        <AnimatePresence exitBeforeEnter>
          {!survey.finish ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="quest"
              className="max-w-screen-sm min-h-screen pt-24 mx-auto"
            >
              <p className="text-xl font-bold">
                Learning Style Assessment Exam
              </p>
              <p>Pick the option that you see best describes you</p>
              <br />
              <form onSubmit={formSubmit} className="flex flex-col gap-4 mb-8">
                {Array.from({ length: 4 }).map((_, ip) => {
                  return (
                    <>
                      {surveyQuestions
                        .slice(ip * 11, (ip + 1) * 11)
                        .map((question, index) => (
                          <div
                            key={`question#${ip * 11 + index}`}
                            className={`w-full p-2 mx-auto border shadow-md ${
                              showAll || currentPage == ip ? "block" : "hidden"
                            }`}
                          >
                            <p className="text-xl font-bold border-b-2 border-b-primary w-fit">
                              {question.Question}
                            </p>
                            <div className="d-form-control">
                              <label className="cursor-pointer d-label">
                                <span className="text-lg d-label-text">
                                  {question.A}
                                </span>
                                <input
                                  type="radio"
                                  value="A"
                                  name={`question#${ip * 11 + index}`}
                                  className="d-radio"
                                  required
                                />
                              </label>
                            </div>
                            <div className="d-form-control">
                              <label className="cursor-pointer d-label">
                                <span className="text-lg d-label-text">
                                  {question.B}
                                </span>
                                <input
                                  type="radio"
                                  value="B"
                                  name={`question#${ip * 11 + index}`}
                                  className="d-radio"
                                  required
                                />
                              </label>
                            </div>
                          </div>
                        ))}
                    </>
                  );
                })}

                {currentPage == 3 ? (
                  <button
                    className="w-full mx-auto d-btn d-btn-primary d-btn-sm"
                    onClick={() => setShowAll(true)}
                  >
                    Submit
                  </button>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <button
                        className={`flex-1 mx-auto d-btn d-btn-primary d-btn-outline d-btn-sm ${
                          currentPage == 0 && "hidden"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          // scroll to top
                          window.scrollTo(0, 0);
                          setCurrentPage(currentPage - 1);
                        }}
                      >
                        Previous Page
                      </button>
                      <button
                        className="flex-1 mx-auto d-btn d-btn-primary d-btn-outline d-btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          // scroll to top
                          window.scrollTo(0, 0);
                          setCurrentPage(currentPage + 1);
                        }}
                      >
                        Next Page
                      </button>
                    </div>
                    <p className="mx-8 text-center">
                      Current Progress {currentPage + 1}/4
                    </p>
                  </>
                )}
              </form>
              <button
                className="fixed bottom-5 right-5 d-btn d-btn-circle d-btn-primary animate__animated animate__bounce"
                onClick={(e) => {
                  e.preventDefault();
                  // scroll to bottom
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  });
                }}
              >
                <ChevronDoubleDownIcon className="w-6 h-6" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="res"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full min-h-screen flex flex-col items-center mt-24 max-w-[800px] mx-auto px-4"
            >
              <h2 className="text-4xl font-bold border-b-4 border-b-orange-600">
                Results
              </h2>

              <div className="my-8 text-center">
                <h3 className="text-4xl">
                  You are a
                  <span className="mx-3 text-orange-500">{result.acronym}</span>
                </h3>
                <p>
                  Your predicted type is
                  <span className="mx-1 text-blue-500">{predicted}</span>
                </p>
              </div>
              <div className="flex flex-col items-center hidden gap-3 p-2 mb-8 bg-orange-300 shadow-lg lg:flex-row md:p-5 lg:gap-8">
                <h3 className="text-lg text-center md:text-left md:text-2xl flex-[2]">
                  Happy with the results?
                  <br />
                  Save it for later viewing!
                </h3>
                <div className="flex-1">
                  <button
                    className="w-full px-4 py-2 text-white transition-transform scale-100 bg-orange-500 hover:scale-110"
                    onClick={saveExam}
                  >
                    Save!
                  </button>
                </div>
              </div>
              {Object.keys(result.displayScaleList).map((key, index) => {
                return (
                  <div
                    className="flex flex-col mt-0 mb-8"
                    key={`scale-${index}`}
                  >
                    <h4 className="flex flex-col items-center justify-between text-2xl md:flex-row">
                      <span>{key}</span>
                      <span className="text-base">
                        {computeRounded(
                          (Math.abs(result.displayScaleList[key]) / 11) * 100
                        )}
                        % -{result.finalResult[key]}
                      </span>
                    </h4>
                    {Mods.ReactRough ? (
                      <>
                        <div className="flex-col items-center justify-center hidden gap-1 lg:flex">
                          <Mods.ReactRough.default width="600px" height="30px">
                            <Mods.ReactRough.Rectangle
                              height={20}
                              width={590}
                              x={5}
                              y={5}
                            />
                            <Mods.ReactRough.Line
                              x1={300}
                              y1={0}
                              x2={300}
                              y2={30}
                            />
                            <Mods.ReactRough.Rectangle
                              height={20}
                              width={(result.displayScaleList[key] / 11) * 295}
                              x={300}
                              y={5}
                              fill={"#f40"}
                            />
                          </Mods.ReactRough.default>
                        </div>{" "}
                        <div className="flex flex-col items-center justify-center gap-1 lg:hidden">
                          <Mods.ReactRough.default width="300px" height="30px">
                            <Mods.ReactRough.Rectangle
                              height={20}
                              width={290}
                              x={5}
                              y={5}
                            />
                            <Mods.ReactRough.Line
                              x1={150}
                              y1={0}
                              x2={150}
                              y2={30}
                            />
                            <Mods.ReactRough.Rectangle
                              height={20}
                              width={(result.displayScaleList[key] / 11) * 150}
                              x={150}
                              y={5}
                              fill={"#f40"}
                            />
                          </Mods.ReactRough.default>
                        </div>
                      </>
                    ) : null}
                  </div>
                );
              })}

              <div className="w-full max-w-[600px]">
                <h3 className="mb-8 text-3xl border-b-4 border-orange-500 w-fit">
                  What does this mean?
                </h3>

                <div className="flex flex-col my-8 mt-0">
                  {Object.keys(result.finalResult).map((key, index) => {
                    return (
                      <>
                        <h4 className="text-2xl">
                          As a
                          <span className="mx-2 font-bold text-orange-600">
                            {result.finalResult[key]}
                          </span>
                          Learner
                        </h4>
                        {result.reflections[key]["tips"].map((tip, index) => {
                          return (
                            <p
                              key={`tip-${index}`}
                              className="my-6 text-justify indent-7"
                            >
                              {tip}
                            </p>
                          );
                        })}

                        <div className="p-4 mb-6 text-justify border shadow-md">
                          {result.reflections[key]["generalComment"].map(
                            (tip, index) => {
                              return (
                                <p key={`gc-${index}`} className="indent-7">
                                  {tip}
                                </p>
                              );
                            }
                          )}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              <p></p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
