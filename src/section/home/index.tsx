import { IQuiz } from '@/api/quiz/quiz.rest'
import WrapBox from '@/components/common/wrap-box'
import Link from 'next/link'
import React from 'react'
import Pagination from './Pagination'
import FilterHome from './FilterHome'

type Props = {
    quizzes: IQuiz[]
    currentPage: number;
    totalPages: number;
}

const HomePage = ({ quizzes, currentPage, totalPages }: Props) => {
    return (
      <WrapBox>
        <FilterHome />
        <div className='grid grid-cols-4 gap-4'>
            {quizzes.map((quiz) => (
            <Link href={`/quiz/${quiz.quizId}`} key={quiz.quizId} className="border p-4 my-2 rounded shadow">
                <h3 className="text-lg font-bold">{quiz.title}</h3>
                <p>{quiz.description}</p>
                <span className="text-sm text-gray-500">Total time: {quiz.total_time} mins</span>
            </Link>
            ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/" />
      </WrapBox>
    );
  };
  

export default HomePage