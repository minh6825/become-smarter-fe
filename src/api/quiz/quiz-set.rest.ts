import { NEXT_PUBLIC_SERVER } from '@/assets/constant';
import axios from 'axios';
import { IQuiz } from './quiz.rest';

export interface IQuizSet {
  quiz_set_id: string;
  quiz_set_name: string;
  subCategory?: string;
  quizzes?: IQuiz[];
}

export const fetchQuizSets = async ({ subCategoryId }: { subCategoryId?: string }) => {
  const { data } = await axios.get(`${NEXT_PUBLIC_SERVER}/quiz-sets`, {
    params: {subCategoryId}
  });
  return data;
};

export const fetchQuizSet = async (quizSetId: string) => {
  const { data } = await axios.get(`${NEXT_PUBLIC_SERVER}/quiz-sets/${quizSetId}`);
  return data;
};

export const createQuizSet = async (quizSet: { quiz_set_name: string; sub_category_id: string }) => {
  const { data } = await axios.post(`${NEXT_PUBLIC_SERVER}/quiz-sets`, quizSet);
  return data;
};

export const updateQuizSet = async (quizSetId: string, updatedQuizSet: { quiz_set_name: string; sub_category_id: string }) => {
  const { data } = await axios.patch(`${NEXT_PUBLIC_SERVER}/quiz-sets/${quizSetId}`, updatedQuizSet);
  return data;
};

export const deleteQuizSet = async (quizSetId: string) => {
  const { data } = await axios.delete(`${NEXT_PUBLIC_SERVER}/quiz-sets/${quizSetId}`);
  return data;
};
