import { IQuizDetail } from '@/api/quiz/quiz.rest'
import WrapBox from '@/components/common/wrap-box'
import Link from 'next/link'
import React from 'react'

type Props = {
    quiz: IQuizDetail
}

const QuizDetailPage = ({ quiz }: Props) => {
  return (
    <WrapBox className=''>
      <h1 className="text-2xl font-bold">{quiz.title}</h1>
      <p className="text-sm text-gray-600">{quiz.description}</p>
      <p>
        <strong>Total Time:</strong> {quiz.totalTime} minutes
      </p>
      <p>
        <strong>Sections:</strong> {quiz.sectionNumber}
      </p>
      <p>
        <strong>Total Questions:</strong> {quiz.questionNumber}
      </p>

      {/* Hiển thị tagCountBySection */}
      <div className="mt-4 mb-4">
        <h2 className="text-lg font-semibold">Tag Count By Section</h2>
        {Object.entries(quiz.tagCountBySection).map(([sectionId, tags], index) => (
          <div key={sectionId} className="mb-4">
            <h3 className="font-medium">Section {Number(sectionId) + 1}</h3>
            <ul className="list-disc list-inside">
              {Object.entries(tags).map(([tag, count]) => (
                <li key={tag}>
                  {tag}: {count}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className='px-4  py-3'>
          <Link href={`/do-quiz/${quiz.quizId}`} className='bg-primary-background px-4  py-3 border rounded-md text-primary'>Làm bài</Link>
      </div>
    </WrapBox>
  )
}

export default QuizDetailPage
