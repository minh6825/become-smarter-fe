'use client'
import { IQuizDetail, IQuizQuestionAnswer } from '@/api/quiz/quiz.rest';
import WrapBox from '@/components/common/wrap-box';
import Link from 'next/link';
import React, { useState } from 'react';
import Section from './Section';
import { QuizProvider } from './quiz-context';

type Props = {
    quiz: IQuizQuestionAnswer;
};

const QuizDetailPage = ({ quiz }: Props) => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

  const handleNextGroup = () => {
    setCurrentGroupIndex((prevIndex) => 
      prevIndex < quiz.sections.flatMap(section => section.group_question).length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousGroup = () => {
    setCurrentGroupIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const allGroups = quiz.sections.flatMap(section => section.group_question);

  // Tạo mảng toàn bộ câu hỏi với thứ tự tăng dần
  const allQuestions = quiz.sections.flatMap((section) =>
    section.group_question.flatMap((group) =>
      group.question_list
    )
  );

  return (
    <QuizProvider>
    <WrapBox className='!pb-0 relative'>
      <h1 className="text-2xl font-bold mb-2">{quiz.quiz_test_intro}</h1>
      <p className="text-sm text-gray-600 mb-4">{quiz.quiz_test_title}</p>
      <div className="fixed top-[64px] right-0 mt-4 mr-4 shadow-lg p-4 rounded-lg w-64">
        <h2 className="text-xl font-semibold mb-2">Questions Navigation</h2>
        <div className="grid grid-cols-3 gap-2">
          {allQuestions.map((question, index) => (
            <a 
              key={question.question_id} 
              href={`#question-${question.question_id}`} 
              className="text-blue-500 hover:underline text-center border p-1 rounded"
            >
              Q{index + 1}
            </a>
          ))}
        </div>
      </div>

      <div className='px-4 py-3 h-[calc(100vh-264px)] w-[60vw] overflow-y-scroll border-b'>
        {quiz.sections.map((section, sectionIndex) => (
          <Section 
            section={section} 
            key={section.section_id} 
            currentGroupIndex={currentGroupIndex} 
            allGroups={allGroups}
            startIndex={allQuestions.findIndex(q => 
              section.group_question.some(g => 
                g.question_list.some(qq => qq.question_id === q.question_id)
              )
            )}
          />
        ))}
      </div>

      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button 
          onClick={handlePreviousGroup} 
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" 
          disabled={currentGroupIndex === 0}
        >
          Previous
        </button>
        <button 
          onClick={handleNextGroup} 
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" 
          disabled={currentGroupIndex === allGroups.length - 1}
        >
          Next
        </button>
      </div>
    </WrapBox>
    </QuizProvider>
  );
};

export default QuizDetailPage;