import { IQuiz } from '@/api/quiz/quiz.rest'
import WrapBox from '@/components/common/wrap-box'
import Link from 'next/link'
import React from 'react'

type Props = {
    quizzes: IQuiz[]
}

const HomePage = ({ quizzes }: Props) => {
    return (
      <WrapBox>
        <div className='grid grid-cols-4 gap-4'>
            {quizzes.map((quiz) => (
            <Link href={`/quiz/${quiz.quizId}`} key={quiz.quizId} className="border p-4 my-2 rounded shadow">
                <h3 className="text-lg font-bold">{quiz.title}</h3>
                <p>{quiz.description}</p>
                <span className="text-sm text-gray-500">Total time: {quiz.total_time} mins</span>
            </Link>
            ))}
        </div>
      </WrapBox>
    );
  };
  

export default HomePage