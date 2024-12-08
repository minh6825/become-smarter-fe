import { getDetailQuizApi } from '@/api/quiz/quiz.rest'
import QuizDetailPage from '@/section/quiz-detail'
import React from 'react'

type Props = {}

const page = async ({
    params,
    searchParams,
  }: {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }) => {

    const data = await getDetailQuizApi(params.id)
    return (
    <div>
        <QuizDetailPage quiz={data.quiz} />
    </div>
  )
}

export default page