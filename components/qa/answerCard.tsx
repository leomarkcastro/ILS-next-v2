import { useState } from "react";
import surveyQuestions from "../../lib/values/questions";
import surveyReflections from "../../lib/values/reflections";

let ReactRough;
let Framer;
(async () => {
  const Framer = await import("framer-motion");
  const _ReactRough = await import("react-rough");
  ReactRough = _ReactRough;
})();

export default function Page() {
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
      "Sequential - Global": 6,
      "Active - Reflective": -3,
      "Sensing - Intuitive": 5,
      "Visual - Verbal": 7,
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

    acronym: "",
    modalMessage: "",
  });

  function showResult() {}

  function onOptionClick(option: string) {
    if (!survey.start) {
      survey.start = true;
    } else if (survey.index >= surveyLength - 1) {
      if (survey.index === surveyLength - 1) {
        const scale = surveyQuestions[survey.index].Scale;
        result.scaleList[scale] += option === "B" ? 1 : -1;
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

    setSurvey({ ...survey });
    setResult({ ...result });
  }

  function computeRounded(value: number) {
    return Math.round(value * 100) / 100;
  }

  return (
    <div className="">
      <div className="transition-transform w-full">
        {!survey.finish ? (
          <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <div className="bg-orange-300 shadow-lg mt-4 h-[60vh] w-[70vw] rounded-lg flex justify-center items-center p-8 relative animate__animated animate__fadeInUp">
              <p className="text-xl md:text-3xl lg:text-5xl text-center">
                <p>{survey.question}</p>
              </p>
              <div className="absolute -bottom-4 md:-right-4 flex flex-col gap-2">
                <Framer.AnimatePresence></Framer.AnimatePresence>
                <Framer.motion.button
                  key={survey.options[0].text}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`min-w-[63vw] md:min-w-min max-w-[63vw] text-base md:text-xl lg:text-2xl bg-orange-600 hover:bg-orange-800 text-white p-1 md:p-2 lg:p-3 px-2 md:px-4 lg:px-6 shadow-md scale-100 hover:scale-110 transition-all ${
                    survey.options[0].hidden && "hidden"
                  }`}
                  onClick={() => onOptionClick(survey.options[0].value)}
                >
                  {survey.options[0].text}
                </Framer.motion.button>
                <Framer.motion.button
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
                </Framer.motion.button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full min-h-screen flex flex-col items-center mt-24 max-w-[800px] mx-auto">
            <h2 className="text-4xl font-bold border-b-4 border-b-orange-600">
              Results
            </h2>

            <div className="my-8 text-center">
              <h3 className="text-4xl">
                You are a
                <span className="text-orange-500">{result.acronym}</span>
              </h3>
            </div>
            <div className="mb-8 flex flex-col lg:flex-row items-center bg-orange-300 shadow-lg p-2 md:p-5 gap-3 lg:gap-8">
              <h3 className="text-lg text-center md:text-left md:text-2xl flex-[2]">
                Happy with the results?
                <br />
                Share it or Save it for later viewing!
              </h3>
              <div className="flex-1">
                <button
                  v-if="!doneSaving"
                  className="bg-orange-500 text-white px-4 py-2 transition-transform scale-100 hover:scale-110 w-full"
                >
                  Save!
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 transition-transform scale-100 hover:scale-110 w-full">
                  Share to Facebook!
                </button>
              </div>
            </div>
            {Object.keys(result.displayScaleList).map((key, index) => {
              return (
                <div className="mt-0 flex flex-col mb-8" key={`scale-${index}`}>
                  <h4 className="text-2xl flex flex-col md:flex-row justify-between items-center">
                    <span>{key}</span>
                    <span className="text-base">
                      {computeRounded(
                        (Math.abs(result.displayScaleList[key]) / 11) * 100
                      )}
                      % -{result.finalResult[key]}
                    </span>
                  </h4>
                  <div className="hidden lg:flex flex-col justify-center items-center gap-1">
                    <ReactRough.default width="600px" height="30px">
                      <ReactRough.Rectangle
                        height={20}
                        width={590}
                        x={5}
                        y={5}
                      />
                      <ReactRough.Line x1={300} y1={0} x2={300} y2={30} />
                      <ReactRough.Rectangle
                        height={20}
                        width={(result.displayScaleList[key] / 11) * 295}
                        x={300}
                        y={5}
                        fill={"#f0f"}
                      />
                    </ReactRough.default>
                  </div>{" "}
                  <div className="lg:hidden flex flex-col justify-center items-center gap-1">
                    <ReactRough.default width="300px" height="30px">
                      <ReactRough.Rectangle
                        height={20}
                        width={290}
                        x={5}
                        y={5}
                      />
                      <ReactRough.Line x1={150} y1={0} x2={150} y2={30} />
                      <ReactRough.Rectangle
                        height={20}
                        width={(result.displayScaleList[key] / 11) * 150}
                        x={150}
                        y={5}
                        fill={"#f0f"}
                      />
                    </ReactRough.default>
                  </div>
                </div>
              );
            })}

            <div className="w-full max-w-[600px]">
              <h3 className="text-3xl border-b-4 border-orange-500 w-fit mb-8">
                What does this mean?
              </h3>
            </div>

            <p></p>
          </div>
        )}
      </div>
    </div>
  );
}
