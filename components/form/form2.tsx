// disable typescript in this file
// @ts-nocheck

import questions from "@/lib/values/survey";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Form2({
  defaultValues = {},
  onSubmit = (_value) => {},
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit((e) => onSubmit({ surveyAnswers: e }))}
      className="flex flex-col gap-4"
    >
      {questions.map((question, ind) => {
        return (
          <div key={`q_${ind}`} className="p-2 even:bg-gray-200">
            <p className="text-xl">{question}</p>
            <div className="grid grid-cols-3 gap-2 p-2 lg:grid-cols-5">
              {["Never", "Rarely", "Sometimes", "Often", "Always"].map(
                (option, index) => (
                  <div
                    key={`qa_${ind}_${index}`}
                    className="flex items-center gap-1"
                    htmlFor={`qa_${ind}_${index}`}
                  >
                    <input
                      {...register(`qa_${ind}`)}
                      type="radio"
                      value={index + 1}
                      id={`qa_${ind}_${index}`}
                      required
                    />
                    <label
                      htmlFor={`qa_${ind}_${index}`}
                      className=" hover:font-bold"
                    >
                      {option}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
        );
      })}
      <input
        className="p-2 mx-auto text-black bg-orange-400 rounded-lg cursor-pointer w-fit"
        type="submit"
      />
    </form>
  );
}
