import { getDetailQuizApi } from '@/api/quiz/quiz.rest'
import QuizDetailPage from '@/section/quiz-detail'
import QuizOverviewPage from '@/section/quiz-overview';
import React from 'react'

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

const page = async ({
    params,searchParams
  }: PageProps) => {
  const searchParamsFinal = await Promise.resolve(searchParams);
  const rawParams: {
    page: number;
    limit: number;
    search?: string;
  } = {
    page: searchParamsFinal.take ? Number(searchParamsFinal.page) : 1,
    limit: searchParamsFinal.page ? Number(searchParamsFinal.limit) : 20,
    search: searchParamsFinal?.search,
  };
    const {id} = await params
    const data = await getDetailQuizApi(id)
    return (
    <div className='bg-primary-main-background h-[calc(100vh-64px)] overflow-auto'>
        <QuizOverviewPage quiz={data.quiz} page={rawParams.page} limit={rawParams.limit} />
    </div>
  )
}

export default page