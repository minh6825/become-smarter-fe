"use client";
import { IQuizDetail, IQuizQuestionAnswer } from "@/api/quiz/quiz.rest";
import WrapBox from "@/components/common/wrap-box";
import Link from "next/link";
import React, { useCallback, useMemo, useState } from "react";
import Section from "./Section";
import { QuizProvider } from "./quiz-context";
import QuestionNavigation from "./QuestionNavigation";
import scrollSmooth from "@/style/css/scroll-smooth.module.css";

type Props = {
  quiz: IQuizQuestionAnswer;
};

const QuizDetailPage = ({ quiz }: Props) => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

  const handleNextGroup = () => {
    setCurrentGroupIndex((prevIndex) =>
      prevIndex <
      quiz.sections.flatMap((section) => section.group_question).length - 1
        ? prevIndex + 1
        : prevIndex
    );
  };

  const handlePreviousGroup = () => {
    setCurrentGroupIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const allGroups = quiz.sections.flatMap((section) => section.group_question);

  const questionListFlat = (quiz: IQuizQuestionAnswer) => {
    let globalIndex = 0;
    return quiz.sections.flatMap((section) =>
      section.group_question.flatMap((group) =>
        group.question_list.map((question) => ({
          ...question,
          index: globalIndex++, // Thứ tự câu hỏi tính theo toàn bộ bài quiz
        }))
      )
    );
  };

  const allQuestions = useMemo(() => questionListFlat(quiz), []);
  return (
    <QuizProvider>
      <WrapBox className="!pb-0 relative">
        <div className="flex">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{quiz.quiz_test_intro}</h1>
            <p className="text-sm text-gray-600 mb-4">{quiz.quiz_test_title}</p>
            <div
              className={`${scrollSmooth["scroll-smooth"]} px-4 py-3 h-[calc(100vh-200px)] w-full overflow-y-scroll border-b`}
            >
              {quiz.sections.map((section) => (
                <Section
                  section={section}
                  key={section.section_id}
                  currentGroupIndex={currentGroupIndex}
                  allGroups={allGroups}
                  startIndex={allQuestions.findIndex((q) =>
                    section.group_question.some((g) =>
                      g.question_list.some(
                        (qq) => qq.question_id === q.question_id
                      )
                    )
                  )}
                />
              ))}
            </div>

            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <button
                onClick={handlePreviousGroup}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={currentGroupIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNextGroup}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={currentGroupIndex === allGroups.length - 1}
              >
                Next
              </button>
            </div>
          </div>
          <QuestionNavigation allQuestions={allQuestions} />
        </div>
      </WrapBox>
    </QuizProvider>
  );
};

export default QuizDetailPage;
