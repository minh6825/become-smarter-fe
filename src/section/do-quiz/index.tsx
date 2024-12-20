"use client";
import { IQuizDetail, IQuizQuestionAnswer } from "@/api/quiz/quiz.rest";
import WrapBox from "@/components/common/wrap-box";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Section from "./Section";
import { QuizData, submissionQuizTest } from "@/api/quiz/submision";
import scrollSmooth from "@/style/css/scroll-smooth.module.css";

import {
  QuizSubmissionProvider,
  useQuizSubmissionContext,
} from "./quiz-context";
import QuestionNavigation from "../quiz-detail/QuestionNavigation";

const DoQuizPage = ({ quizData }: { quizData: QuizData }) => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const { quizSubmissionState, updateQuizTestId, updateUserAnswerFirst } =
    useQuizSubmissionContext(); // Lấy hàm từ context

  const handleNextGroup = () => {
    setCurrentGroupIndex((prevIndex) =>
      prevIndex <
      quizData.quizTestAPI.sections.flatMap((section) => section.group_question)
        .length -
        1
        ? prevIndex + 1
        : prevIndex
    );
    setQuestionNumber((prevNumber) => prevNumber + 1);
  };

  const handlePreviousGroup = () => {
    setCurrentGroupIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
    setQuestionNumber((prevNumber) => prevNumber - 1);
  };

  const allGroups = quizData.quizTestAPI.sections.flatMap(
    (section) => section.group_question
  );

  // Tạo mảng toàn bộ câu hỏi với thứ tự tăng dần
  const allQuestions = quizData.quizTestAPI.sections.flatMap((section) =>
    section.group_question.flatMap((group) => group.question_list)
  );

  const handleSubmit = async () => {
    // Xử lý việc thu thập và gửi bài làm
    await submissionQuizTest(
      quizSubmissionState,
      quizData.submission.submissionId
    );
    console.log("Submit quiz answers", quizSubmissionState);
  };

  useEffect(() => {
    if (quizData.quizTestAPI.quiz_test_id) {
      updateQuizTestId(quizData.quizTestAPI.quiz_test_id);
      updateUserAnswerFirst(quizData.submission.user_answers);
    }
  }, []);

  return (
    <WrapBox className="!pb-0 relative">
      <div className="flex">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-2">
            {quizData.quizTestAPI.quiz_test_intro}
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            {quizData.quizTestAPI.quiz_test_title}
          </p>

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
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
          <div
            className={`${scrollSmooth["scroll-smooth"]} px-4 py-3 h-[calc(100vh-200px)] w-full overflow-y-scroll border-b`}
          >
            {quizData.quizTestAPI.sections.map((section, sectionIndex) => (
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
        <QuestionNavigation allQuestions={allQuestions} />
      </div>
    </WrapBox>
  );
};

export default DoQuizPage;

export const DoQuizProviderWrap = ({ quizData }: { quizData: QuizData }) => {
  return (
    <QuizSubmissionProvider>
      <DoQuizPage quizData={quizData} />
    </QuizSubmissionProvider>
  );
};
