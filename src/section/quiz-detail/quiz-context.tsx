'use client';
import React, { createContext, useContext, useState } from 'react';

// Định nghĩa cấu trúc state
export type QuizSubmissionState = {
  user_answers: UserAnswers[];
  time_spent: number[];
  is_completed: boolean;
  quiz_test_id: string
};

export type UserAnswers = {
  question_id: number;
  answer_text: string;
  marked: boolean;
};

// Context type
type QuizSubmissionContextType = {
  quizSubmissionState: QuizSubmissionState;
  markCompletion: (is_completed: boolean) => void;
  updateQuizTestId: (quizTestId: string) => void
  updateUserAnswerFirst: (userAnswer: UserAnswers[]) => void
  currentQuestionId: number;
  setCurrentQuestionId: (id: number) => void;
};

// Tạo context
const QuizSubmissionContext = createContext<QuizSubmissionContextType | undefined>(undefined);

export const QuizSubmissionProvider = ({ children }: { children: React.ReactNode }) => {
  const [quizSubmissionState, setQuizSubmissionState] = useState<QuizSubmissionState>({
    user_answers: [],
    time_spent: [],
    is_completed: false,
    quiz_test_id: ''
  });
  const [currentQuestionId, setCurrentQuestionId] = useState(0)


  const updateUserAnswerFirst = (userAnswer: UserAnswers[]) => {
    setQuizSubmissionState(pre => ({...pre, user_answers: userAnswer}))
  }

  const updateQuizTestId = (quizTestId: string) => {
    setQuizSubmissionState(pre => ({...pre, quiz_test_id: quizTestId}))
  }

  // Hàm đánh dấu hoàn thành
  const markCompletion = (is_completed: boolean) => {
    setQuizSubmissionState((prevState) => ({ ...prevState, is_completed }));
  };

  return (
    <QuizSubmissionContext.Provider value={{ quizSubmissionState, markCompletion, updateQuizTestId, updateUserAnswerFirst, setCurrentQuestionId, currentQuestionId }}>
      {children}
    </QuizSubmissionContext.Provider>
  );
};

export const useQuizSubmissionContext = () => {
  const context = useContext(QuizSubmissionContext);
  if (!context) {
    throw new Error('useQuizSubmissionContext must be used within a QuizSubmissionProvider');
  }
  return context;
};
