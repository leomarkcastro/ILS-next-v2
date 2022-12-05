import questions from "@/lib/values/survey";
import { useState, useEffect } from "react";

const legend = {
  "0": "Strongly Disagree",
  "1": "Disagree",
  "2": "Neutral",
  "3": "Agree",
  "4": "Strongly Agree",
};

function getLegendFromFloat(value) {
  const rounded = Math.floor(value);
  return legend[rounded];
}

export function ExamPersonalSurveyTab({ displayData }) {
  const [peronsalData, setPersonalData] = useState({});

  useEffect(() => {
    // parse survey answers. count average, get vote of each person per question
    const _personalData = {};
    // console.log(displayData);

    displayData.profile.forEach((item) => {
      const { fullname, surveyAnswers } = item;
      if (surveyAnswers) {
        Object.keys(surveyAnswers).map((id, i) => {
          if (!_personalData[id]) {
            _personalData[id] = {
              question: questions[i],
              answerBox: {},
              total: 0,
            };
          }

          const answer = surveyAnswers[id];

          if (!_personalData[id].answerBox[answer - 1]) {
            _personalData[id].answerBox[answer - 1] = [];
          }

          _personalData[id].answerBox[answer - 1].push(fullname);
          _personalData[id].total += Number(answer);
        });

        // averate the total
        Object.keys(_personalData).map((id, i) => {
          _personalData[id].average =
            _personalData[id].total / displayData.profile.length;
        });
      }
    });

    setPersonalData(_personalData);
  }, []);
  return (
    <div className="flex flex-col w-full">
      {Object.keys(peronsalData).map((id, index) => {
        const data = peronsalData[id];
        return (
          <div key={`q_${index}`}>
            <div className="flex flex-col p-2 border-t border-t-gray-600">
              <p className="text-lg">{data.question}</p>
              <p className="text-lg">
                <strong className="mr-2">
                  ({getLegendFromFloat(data.average)})
                </strong>
                <span className="text-sm">Average: {data.average}</span>
              </p>
            </div>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((ind, index2) => {
                return (
                  <div
                    className="flex flex-col justify-center flex-1 text-center odd:bg-gray-100"
                    key={`breakdown_${index}_${index2}`}
                  >
                    <p>
                      <strong>{legend[Number(ind)]}</strong>
                    </p>
                    <div className="max-h-[15vh] overflow-auto">
                      <p>
                        {(data.answerBox[ind] || []).map((name, index3) => {
                          return (
                            <p key={`name_${index}_${index2}_${index3}`}>
                              {name}
                            </p>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
