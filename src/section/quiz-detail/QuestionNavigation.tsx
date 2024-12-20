import { IQuestion } from "@/api/quiz/question.rest";
import Link from "next/link";
import React from "react";

type Props = {
  allQuestions: IQuestion[];
};

const QuestionNavigation = ({ allQuestions }: Props) => {
  return (
    <div className="mt-4 mr-4 shadow-lg p-4 rounded-lg w-64">
      <h2 className="text-xl font-semibold mb-2">Thứ tự câu hỏi</h2>
      <div className="grid grid-cols-3 gap-2">
        {allQuestions.map((question, index) => (
          <Link scroll={true}
            key={question.question_id}
            href={`#question-${question.question_id}`}
            className="text-blue-500 hover:underline text-center border p-1 rounded"
          >
            Q{index + 1}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuestionNavigation;
