'use client';
import React, { createContext, useContext, useState } from 'react';

type QuizContextType = {
  currentQuestionId: string;
  setCurrentQuestionId: (id: string) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('');

  return (
    <QuizContext.Provider value={{ currentQuestionId, setCurrentQuestionId }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};
