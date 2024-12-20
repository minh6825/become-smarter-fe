import { IQuiz } from '@/api/quiz/quiz.rest'
import WrapBox from '@/components/common/wrap-box'
import React from 'react'
import Pagination from './Pagination'
import FilterHome from './FilterHome'
import {QuizItem} from './QuizItem'

type Props = {
    quizzes: IQuiz[]
    currentPage: number;
    totalPages: number;
}

const HomePage = ({ quizzes, currentPage, totalPages }: Props) => {
    return (
      <WrapBox>
        <FilterHome />
        <div className='grid max-2xl:grid-cols-4 grid-cols-5 gap-4'>
            {quizzes.map((quiz) => (
            <QuizItem quiz={quiz} key={quiz.quizId} />
            ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/list-quiz" />
      </WrapBox>
    );
  };
  

export default HomePage