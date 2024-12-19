import { NEXT_PUBLIC_SERVER } from "@/assets/constant";
import axios from "axios";
import axiosConfig from "../axiosConfig";
import { ISection } from "./section.rest";
import { IQuizDataRes } from "@/app/do-quiz/[id]/page";

export interface ITagCount {
  [tag: string]: number;
}

export interface ITagCountBySection {
  [section: string]: ITagCount;
}

export interface IQuiz {
  quizId: string;
  title: string;
  created_at: Date;
  description: string;
  total_time: number;
  status: string;
  updated_at: Date;
  deleted_at: Date;
}

export interface IQuizDetail {
  quizId: string;
  title: string;
  description: string;
  isCompleted: boolean;
  totalTime: number;
  sectionNumber: number;
  questionNumber: number;
  tagCountBySection: ITagCountBySection;
}

export interface IReturnBase {
  success: boolean;
  message: string;
}

export interface IReturnQuizListPublic extends IReturnBase {
  quizzes: IQuiz[];
  quantityQuizTest: number;
}

export interface IReturnQuizPublic extends IReturnBase {
  quiz: IQuizDetail;
}

export interface IQuizQuestionAnswer {
  quiz_test_title: string 
  quiz_test_intro: string
  quiz_test_id: string
  sections: ISection[]
}

export const getQuizListPublicApi = async (params: {
  take: number;
  page: number;
  tags?: string;
  search?: string;
  sortBy?: string;
  questionSet?: string;
  quizSkill?: string;
}): Promise<IReturnQuizListPublic> => {
  const query = new URLSearchParams(params as any).toString();
  console.log(query);
  return (
    await axios.get(`${NEXT_PUBLIC_SERVER}/quizzes/quiz-public-list?${query}`)
  ).data;
};

export const getDetailQuizApi = async (
  quizId: string
): Promise<IReturnQuizPublic> =>
  (
    await axios.get(`${NEXT_PUBLIC_SERVER}/quizzes/details/${quizId}`, {
      timeout: 10000,
    })
  ).data;

export const getQuizTodoApi = async (quizId: string, token: string): Promise<IQuizDataRes> =>
  (
    await axios.get(`${NEXT_PUBLIC_SERVER}/quizzes/to-do/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 10000,
    })
  ).data;


export const getQuizQuestionAnswer = async (quizId:string) => (await axios.get(`${NEXT_PUBLIC_SERVER}/quizzes/get-quiz-question-answer/${quizId}`, {
  timeout: 10000,
})).data