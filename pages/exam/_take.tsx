import { useEffect, useState, useRef } from "react";
import surveyQuestions from "../../lib/values/questions";
import surveyReflections from "../../lib/values/reflections";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();

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

  function freezeOption(isOn: boolean) {
    frozen.current = isOn;
  }

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

  function onOptionClick(option: string) {
    if (frozen.current) return;
    if (!survey.start) {
      survey.start = true;
    } else if (survey.index >= surveyLength - 1) {
      if (survey.index === surveyLength - 1) {
        const scale = surveyQuestions[survey.index].Scale;
        result.scaleList[scale] += option === "B" ? 1 : -1;
        result.picks[survey.index] = option;
        survey.index += 1;
        showResult();
      }
      survey.index = surveyLength;
      // console.log(scaleList)
      survey.finish = true;
      return;
    } else {
      const scale = surveyQuestions[survey.index].Scale;
      result.scaleList[scale] += option === "B" ? 1 : -1;
      result.picks[survey.index] = option;
      survey.index += 1;
    }

    survey.question = surveyQuestions[survey.index].Question;
    survey.options = [
      {
        text: surveyQuestions[survey.index].A,
        value: "A",
      },
      {
        text: surveyQuestions[survey.index].B,
        value: "B",
      },
    ];

    // console.log(result.scaleList);

    setSurvey({ ...survey });
    setResult({ ...result });
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

    id = examID ? examID : classCode;

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

          if (classCode) {
            localStorage.removeItem("classCode");
          }
          router.push("/profile");
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

  return (
    <div className="">
      <div className="transition-transform w-full">
        <AnimatePresence exitBeforeEnter>
          {!survey.finish ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="quest"
              className="w-full min-h-screen flex flex-col justify-center items-center"
            >
              <div className="bg-orange-300 shadow-lg mt-4 h-[60vh] w-[70vw] rounded-lg flex justify-center items-center p-8 relative animate__animated animate__fadeInUp">
                <p className="text-xl md:text-3xl lg:text-4xl text-center">
                  <AnimatePresence exitBeforeEnter>
                    <motion.p
                      key={survey.question}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {survey.question}
                    </motion.p>
                  </AnimatePresence>
                </p>
                <div className="absolute -bottom-4 md:-right-4 flex flex-col gap-2">
                  <AnimatePresence exitBeforeEnter>
                    <motion.button
                      key={survey.options[0].text}
                      onAnimationStart={freezeOption.bind(this, true)}
                      onAnimationComplete={freezeOption.bind(this, false)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`min-w-[63vw] md:min-w-min max-w-[63vw] text-base md:text-xl lg:text-2xl bg-orange-600 hover:bg-orange-800 text-white p-1 md:p-2 lg:p-3 px-2 md:px-4 lg:px-6 shadow-md scale-100 hover:scale-110 transition-all ${
                        survey.options[0].hidden && "hidden"
                      }`}
                      onClick={() => onOptionClick(survey.options[0].value)}
                    >
                      {survey.options[0].text}
                    </motion.button>
                  </AnimatePresence>

                  <AnimatePresence exitBeforeEnter>
                    <motion.button
                      key={survey.options[1].text}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`min-w-[63vw] md:min-w-min max-w-[63vw] text-base md:text-xl lg:text-2xl bg-orange-600 hover:bg-orange-800 text-white p-1 md:p-2 lg:p-3 px-2 md:px-4 lg:px-6 shadow-md scale-100 hover:scale-110 transition-all ${
                        survey.options[1].hidden && "hidden"
                      }`}
                      onClick={() => onOptionClick(survey.options[1].value)}
                    >
                      {survey.options[1].text}
                    </motion.button>
                  </AnimatePresence>
                </div>
              </div>
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
                  <span className="text-orange-500 mx-3">{result.acronym}</span>
                </h3>
              </div>
              <div className="mb-8 flex flex-col lg:flex-row items-center bg-orange-300 shadow-lg p-2 md:p-5 gap-3 lg:gap-8">
                <h3 className="text-lg text-center md:text-left md:text-2xl flex-[2]">
                  Happy with the results?
                  <br />
                  Save it for later viewing!
                </h3>
                <div className="flex-1">
                  <button
                    className="bg-orange-500 text-white px-4 py-2 transition-transform scale-100 hover:scale-110 w-full"
                    onClick={saveExam}
                  >
                    Save!
                  </button>
                </div>
              </div>
              {Object.keys(result.displayScaleList).map((key, index) => {
                return (
                  <div
                    className="mt-0 flex flex-col mb-8"
                    key={`scale-${index}`}
                  >
                    <h4 className="text-2xl flex flex-col md:flex-row justify-between items-center">
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
                        <div className="hidden lg:flex flex-col justify-center items-center gap-1">
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
                        <div className="lg:hidden flex flex-col justify-center items-center gap-1">
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
                <h3 className="text-3xl border-b-4 border-orange-500 w-fit mb-8">
                  What does this mean?
                </h3>

                <div className="mt-0 flex flex-col my-8">
                  {Object.keys(result.finalResult).map((key, index) => {
                    return (
                      <>
                        <h4 className="text-2xl">
                          As a
                          <span className="text-orange-600 font-bold mx-2">
                            {result.finalResult[key]}
                          </span>
                          Learner
                        </h4>
                        {result.reflections[key]["tips"].map((tip, index) => {
                          return (
                            <p
                              key={`tip-${index}`}
                              className="indent-7 my-6 text-justify"
                            >
                              {tip}
                            </p>
                          );
                        })}

                        <div className="p-4 border shadow-md text-justify mb-6">
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
