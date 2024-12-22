import { IQuiz } from '@/api/quiz/quiz.rest'
import WrapBox from '@/components/common/wrap-box'
import React from 'react'
import Pagination from './Pagination'
import FilterHome from './FilterHome'
import {QuizItem} from './QuizItem'
import PaginationTable from '@/components/table/table-panigation'

type Props = {
    quizzes: IQuiz[]
    currentPage: number;
    totalPages: number;
}

const HomePage = ({ quizzes, currentPage, totalPages }: Props) => {
    return (
      <WrapBox className='space-y-3 max-md:px-4 max-md:mb-4'>
        <FilterHome />
        <div className='grid grid-cols-4 max-md:grid-cols-2 gap-3'>
            {quizzes.map((quiz) => (
            <QuizItem quiz={quiz} key={quiz.quizId} />
            ))}
        </div>
        <PaginationTable currentPage={currentPage} baseUrl={"/list-quiz"} totalPages={totalPages}  />
      </WrapBox>
    );
  };
  

export default HomePage