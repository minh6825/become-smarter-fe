import { getDetailQuizApi } from '@/api/quiz/quiz.rest'
import QuizDetailPage from '@/section/quiz-detail'
import QuizOverviewPage from '@/section/quiz-overview';
import React from 'react'

type PageProps = {
  params: Promise<{ id: string }>;
};

const page = async ({
    params,
  }: PageProps) => {

    const {id} = await params
    const data = await getDetailQuizApi(id)
    return (
    <div className='bg-primary-main-background h-[calc(100vh-64px)] overflow-auto'>
        <QuizOverviewPage quiz={data.quiz} />
    </div>
  )
}

export default page