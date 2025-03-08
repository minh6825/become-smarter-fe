"use client";
import React, { useEffect, useMemo, useState } from "react";
import Section from "./Section";
import { QuizData, submissionQuizTest } from "@/api/quiz/submision";
import scrollSmooth from "@/style/css/scroll-smooth.module.css";

import {
  QuizSubmissionProvider,
  useQuizSubmissionContext,
} from "./quiz-context";
import QuestionNavigation from "./common/QuestionNavigation";
import ButtonNext from "@/components/tags/button/button-next/button-next";
import ButtonPrev from "@/components/tags/button/button-prev/button-prev";
import PopupWrap from "@/components/common/popup-wrap";
import ButtonPrimary from "@/components/tags/button/button-primary";
import { useRouter } from "next/navigation";

const DoQuizPage = ({ quizData }: { quizData: QuizData }) => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [popupSubmit, setPopupSubmit] = useState(false);
  const router = useRouter()
  const {
    quizSubmissionState,
    setCurrentQuestionId,
    updateQuizTestId,
    updateUserAnswerFirst,
  } = useQuizSubmissionContext(); // Lấy hàm từ context

  const handleNextGroup = () => {
    setCurrentQuestionId(0);
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
      ...quizData.quizTestAPI,
      sections: quizData.quizTestAPI.sections.map((section) => ({
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
  }, [quizData.quizTestAPI]);

  const allGroups = useMemo(
    () =>
      quizData.quizTestAPI.sections.flatMap(
        (section) => section.group_question
      ),
    [quizData.quizTestAPI.sections]
  );

  // Tạo mảng toàn bộ câu hỏi với thứ tự tăng dần
  const allQuestions = useMemo(
    () =>
      quizData.quizTestAPI.sections.flatMap((section) =>
        section.group_question.flatMap((group) => group.question_list)
      ),
    [quizData.quizTestAPI.sections]
  );

  const handleSubmit = async () => {
    // Xử lý việc thu thập và gửi bài làm
    await submissionQuizTest(
      quizSubmissionState,
      quizData.submission.submissionId,
      true
    );
    try {
      router.push(`/history`)
    } catch (error) {
      console.log("error", error);
      
    }
    console.log("Submit quiz answers", quizSubmissionState);
  };

  useEffect(() => {
    if (quizData.quizTestAPI.quiz_test_id) {
      updateQuizTestId(quizData.quizTestAPI.quiz_test_id);
      updateUserAnswerFirst(quizData.submission.user_answers);
    }
  }, []);

  return (
    <div className="!pb-0 relative p-6 max-w-[1800px]  mx-auto">
      <div className="flex">
        <div className="w-full h-[calc(100vh-100px)]">
          <div className="flex gap-4">
            <div>
              <h1 className="text-2xl font-bold text-nowrap truncate w-[70%]">{quizData.quizTestAPI.quiz_test_title}</h1>
              <p className="text-nowrap">
                {quizData.quizTestAPI.quiz_test_intro}
              </p>
            </div>
            <div className=" flex w-full justify-between space-x-4 h-fit scale-[80%]">
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
          <div
            className={`${scrollSmooth["scroll-smooth"]}  h-[calc(100vh-150px)] w-full overflow-y-scroll`}
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
          <ButtonPrimary
            type="button"
            className="!w-fit ml-auto bg-primary-root-mint !text-white hover:opacity-90"
            onClick={() => setPopupSubmit(true)}
          >
            Submit
          </ButtonPrimary>
          <QuestionNavigation
            setCurrentGroupIndex={setCurrentGroupIndex}
            sectionAndGroup={sectionAndGroup.sections}
          />
        </div>
      </div>
      <PopupWrap isOpen={popupSubmit} onClose={() => setPopupSubmit(false)}>
        <div>
          <h2 className="text-xl font-semibold mb-4">Submit quiz</h2>
          <p className="mb-4">Are you sure you want to submit the quiz?</p>
          <div className="flex gap-2 w-fit ml-auto justify-end">
            <ButtonPrimary
              className="w-fit bg-primary-root-red !text-primary-text-button hover:bg-primary-root-red hover:opacity-70"
              type="button"
              onClick={() => setPopupSubmit(false)}
            >
              Cancel
            </ButtonPrimary>
            <ButtonPrimary
              className="w-fit bg-primary-root-mint !text-primary-text-button hover:bg-primary-root-mint hover:opacity-70"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </ButtonPrimary>
          </div>
        </div>
      </PopupWrap>
    </div>
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
