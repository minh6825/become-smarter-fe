import { getQuizQuestionAnswer } from "@/api/quiz/quiz.rest";
import { DoQuizProviderWrap } from "@/section/quiz-detail";
import React from "react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 10;

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const data = await getQuizQuestionAnswer(id);

  return <div className="bg-primary-main-background h-[calc(100vh-64px)] overflow-auto" >
    <DoQuizProviderWrap quizData={data.quiz}></DoQuizProviderWrap>
  </div>
};

export default page;
