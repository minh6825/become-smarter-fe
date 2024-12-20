import { IQuestion } from "@/api/quiz/question.rest";
import React from "react";

type Props = {
  question: IQuestion;
  index: number;
};

const QuestionItem = ({ question }: Props) => {
  return (
    <div
      id={`question-${question.question_id}`}
      className="mb-2 p-2 rounded border"
    >
      <p className="font-semibold mb-3">
        {question.index}. {question.question_text}
      </p>
      <ul className="list-none list-inside flex flex-col gap-2">
        {question.options.map((option) => (
          <li key={option.option_id} className="flex gap-2 items-center">
            <p className="w-6 cursor-pointer h-6 text-center my-auto border rounded-full">
              {option.value}
            </p>
            <span className="font-medium">{option.label}</span>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 mt-2">
        <p>Answer: </p>
        <ul>
          {!!question?.answers?.length && question.answers.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionItem;
