import React, { useState, useEffect } from "react";
import { IQuestion } from "@/api/quiz/question.rest";
import { useQuizSubmissionContext } from "./quiz-context";

type Props = {
  question: IQuestion;
};

const QuestionItem = ({ question }: Props) => {
  const { updateAnswer, quizSubmissionState } = useQuizSubmissionContext();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Khởi tạo giá trị khi component render lần đầu
  useEffect(() => {
    const existingAnswer = quizSubmissionState.user_answers.find(
      (item) => item.question_id === question.question_id
    )?.answer_text;
    if (existingAnswer) {
      setSelectedAnswer(existingAnswer);
    }
  }, [quizSubmissionState.user_answers, question.question_id]);

  const handleAnswerChange = (answerText: string) => {
    setSelectedAnswer(answerText);
    updateAnswer({
      question_id: question.question_id,
      answer_text: answerText,
      marked: true,
    });
  };

  return (
    <div
      id={`question-${question.question_id}`}
      className={`mb-2 p-2 border-b border-primary-root-violet`}
    >
      <p className="font-semibold text-lg mb-1">
        {question.index}. {question.question_text}
      </p>
      <ul className="list-none list-inside flex flex-col gap-1">
        {question.options.map((option, index) => (
          <li className="cursor-pointer w-fit" key={option.answer_option_id || index}>
            <label className="cursor-pointer flex items-center gap-1.5">
              <input
                className="size-4 hidden"
                type="radio" // Nên dùng radio nếu chỉ cho phép chọn một đáp án
                name={`question-${question.question_id}`}
                value={option.value}
                checked={selectedAnswer === option.value} // Kiểm tra giá trị từ state
                onChange={() => handleAnswerChange(option.value)}
              />
              <span className={`font-medium rounded-full size-6 text-center ${selectedAnswer === option.value && 'bg-primary-blue text-primary-text-button'}`}>{option.value}</span>
              <span className="font-medium translate-y-[0.5px] w-fit">{option.label} </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionItem;
