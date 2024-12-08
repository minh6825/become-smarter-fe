import { getDetailQuizApi } from '@/api/quiz/quiz.rest'
import QuizDetailPage from '@/section/quiz-detail'
import React from 'react'

type PageProps = {
  params: Promise<{ id: string }>;
};

const page = async ({
    params,
    // searchParams,
  }: PageProps) => {

    const {id} = await params
    const data = await getDetailQuizApi(id)
    return (
    <div>
        <QuizDetailPage quiz={data.quiz} />
    </div>
  )
}

export default page