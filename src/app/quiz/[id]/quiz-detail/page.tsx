import { getQuizQuestionAnswer } from '@/api/quiz/quiz.rest'
import { DoQuizProviderWrap } from '@/section/quiz-detail';
import React from 'react'

type PageProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 10;

const page = async ({
  params,
}: PageProps) => {
  
  const {id} = await params
  const data = await getQuizQuestionAnswer(id)

  return (
    <DoQuizProviderWrap quizData={data.quiz}>
    </DoQuizProviderWrap>
  )
}

export default page