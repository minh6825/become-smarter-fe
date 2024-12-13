import { IQuestion } from '@/api/quiz/question.rest';
import React from 'react';

type Props = {
  question: IQuestion;
  index: number;
};

const QuestionItem = ({ question, index }: Props) => {
  return (
    <div id={`question-${question.question_id}`} className="mb-2 p-2 rounded border">
      <p className="font-semibold">{index}. {question.question_text}</p>
      <ul className="list-disc list-inside">
        {question.options.map((option) => (
          <li key={option.option_id}>
            <span className="font-medium">{option.label}: </span>
            <span>{option.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionItem;
