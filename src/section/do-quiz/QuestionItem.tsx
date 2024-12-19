import React, { useState, useEffect } from 'react';
import { IQuestion } from '@/api/quiz/question.rest';
import { useQuizSubmissionContext } from './quiz-context';

type Props = {
  question: IQuestion;
  index: number;
};

const QuestionItem = ({ question, index }: Props) => {
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
    <div id={`question-${question.question_id}`} className="mb-2 p-2 rounded border">
      <p className="font-semibold">
        {index}. {question.question_text}
      </p>
      <ul className="list-disc list-inside">
        {question.options.map((option) => (
          <li key={option.option_id}>
            <label>
              <input
                type="radio" // Nên dùng radio nếu chỉ cho phép chọn một đáp án
                name={`question-${question.question_id}`}
                value={option.value}
                checked={selectedAnswer === option.value} // Kiểm tra giá trị từ state
                onChange={() => handleAnswerChange(option.value)}
              />
              <span className="ml-2 font-medium">{option.label}: </span>
              <span>{option.value}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionItem;
