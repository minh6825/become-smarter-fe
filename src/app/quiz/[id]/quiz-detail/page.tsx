import { getQuizQuestionAnswer } from '@/api/quiz/quiz.rest'
import { NEXT_PUBLIC_SERVER } from '@/assets/constant';
import QuizDetailPage from '@/section/quiz-detail'
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
    <div>
      <QuizDetailPage quiz={data.quiz} />
    </div>
  )
}

export default page