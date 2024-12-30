"use client";
import WrapBox from "@/components/common/wrap-box";
import React, { useMemo, useState } from "react";
import Section from "./Section";
import { QuizTestAPI } from "@/api/quiz/submision";
import scrollSmooth from "@/style/css/scroll-smooth.module.css";

import {
  QuizSubmissionProvider,
  useQuizSubmissionContext,
} from "./quiz-context";
import ButtonNext from "@/components/tags/button/button-next/button-next";
import ButtonPrev from "@/components/tags/button/button-prev/button-prev";

import QuestionNavigation from "./common/QuestionNavigation";

const QuizDetailPage = ({ quizData }: { quizData: QuizTestAPI }) => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);

  const {
    setCurrentQuestionId,
  } = useQuizSubmissionContext(); // Lấy hàm từ context

  const handleNextGroup = () => {
    setCurrentQuestionId(0);
    setCurrentGroupIndex((prevIndex) =>
      prevIndex <
      quizData.sections.flatMap((section) => section.group_question)
        .length -
        1
        ? prevIndex + 1
        : prevIndex
    );
    setQuestionNumber((prevNumber) => prevNumber + 1);
  };

  const handlePreviousGroup = () => {
    setCurrentQuestionId(0);
    setCurrentGroupIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );

    setQuestionNumber((prevNumber) => prevNumber - 1);
  };

  const sectionAndGroup = useMemo(() => {
    let count = 0;
    let countGroup = 0;
    return {
      ...quizData,
      sections: quizData.sections.map((section) => ({
        ...section,
        group_question: section.group_question.map((group) => ({
          ...group,
          index: countGroup++,
          question_list: group.question_list.map((question) => ({
            ...question,
            index: ++count,
          })),
        })),
      })),
    };
  }, [quizData]);

  const allGroups = useMemo(
    () =>
      quizData.sections.flatMap(
        (section) => section.group_question
      ),
    [quizData.sections]
  );

  // Tạo mảng toàn bộ câu hỏi với thứ tự tăng dần
  const allQuestions = useMemo(
    () =>
      quizData.sections.flatMap((section) =>
        section.group_question.flatMap((group) => group.question_list)
      ),
    [quizData.sections]
  );

  return (
    <WrapBox className="!pb-0 relative">
      <div className="flex">
        <div className="w-full">
          <div className="flex gap-4">
            <h1 className="text-2xl font-bold text-nowrap min-w-[200px]">
              {quizData.quiz_test_intro}
            </h1>
            <div className=" flex w-full justify-between space-x-4">
              <ButtonPrev
                onClick={handlePreviousGroup}
                disabled={currentGroupIndex === 0}
              >
                Previous
              </ButtonPrev>
              <ButtonNext
                onClick={handleNextGroup}
                disabled={currentGroupIndex === allGroups.length - 1}
              >
                Next
              </ButtonNext>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {quizData.quiz_test_title}
          </p>

          <div
            className={`${scrollSmooth["scroll-smooth"]}  h-[calc(100vh-200px)] w-full overflow-y-scroll border-b`}
          >
            {sectionAndGroup.sections.map((section, sectionIndex) => (
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
                questionNumber={questionNumber}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <QuestionNavigation
            setCurrentGroupIndex={setCurrentGroupIndex}
            sectionAndGroup={sectionAndGroup.sections}
          />
        </div>
      </div>
    </WrapBox>
  );
};

export default QuizDetailPage;

export const DoQuizProviderWrap = ({ quizData }: { quizData: QuizTestAPI }) => {
  return (
    <QuizSubmissionProvider>
      <QuizDetailPage quizData={quizData} />
    </QuizSubmissionProvider>
  );
};
