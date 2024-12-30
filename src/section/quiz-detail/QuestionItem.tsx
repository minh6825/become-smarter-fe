import React, { useState, useEffect } from "react";
import { IQuestion } from "@/api/quiz/question.rest";
import { useQuizSubmissionContext } from "./quiz-context";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {
  question: IQuestion;
};

const QuestionItem = ({ question }: Props) => {
  const { quizSubmissionState } = useQuizSubmissionContext();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  // Khởi tạo giá trị khi component render lần đầu
  useEffect(() => {
    const existingAnswer = quizSubmissionState.user_answers.find(
      (item) => item.question_id === question.question_id
    )?.answer_text;
    if (existingAnswer) {
      setSelectedAnswer(existingAnswer);
    }
  }, [quizSubmissionState.user_answers, question.question_id]);

  return (
    <div
      id={`question-${question.question_id}`}
      className={`mb-2 p-2 border-b border-primary-root-violet`}
    >
      <p className="font-semibold text-lg mb-1">
        {question.index}. {question.question_text}
      </p>
      <ul className="list-none list-inside flex flex-col gap-2">
        {question.options.map((option, index) => (
          <li className="cursor-pointer w-fit" key={option.answer_option_id || index}>
            <label className="cursor-pointer flex items-center gap-2">
              <span className={`font-medium border border-primary rounded-full size-6 text-center transition-transform duration-300 ${selectedAnswer === option.value ? 'bg-primary-blue text-primary-text-button scale-110' : 'scale-100'}`}>{option.value}</span>
              <span className="font-medium translate-y-[0.5px] w-fit">{option.label} </span>
            </label>
          </li>
        ))}
        <div className="flex gap-2 items-center">
          <p>Answer</p>
          <button onClick={() => setShowAnswers(!showAnswers)}>
            {showAnswers ? <FaEyeSlash /> : <FaEye />}
          </button>
          {showAnswers && (
            <p>{question.answers && question.answers.map(item => <span key={item}>{item}</span>)}</p>
          )}
        </div>
      </ul>
    </div>
  );
};

export default QuestionItem;
