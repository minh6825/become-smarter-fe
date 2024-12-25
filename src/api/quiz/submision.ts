import { QuizSubmissionState } from "@/section/do-quiz/quiz-context";
import axiosConfig from "../axiosConfig";
import { ISection } from "./section.rest";
import axios from "axios";
import { NEXT_PUBLIC_SERVER } from "@/assets/constant";

export type Submission = {
  user_answers: UserAnswer[];
  submissionId: string;
};

export type UserAnswer = {
  marked: boolean;
  answer_text: string;
  question_id: number;
};

export type QuizTestAPI = {
  quiz_test_id: string;
  quiz_test_title: string;
  quiz_test_intro: string;
  sections: ISection[];
};


export type GroupQuestion = {
  group_question_id: number;
  title: string;
  instruction: string;
  group_ui_type: string; // Có thể thay bằng một union export type ví dụ: 'single selection' | 'multiple selection'
  question_list: Question[];
};

export type Question = {
  question_id: number;
  question_text: string;
  order: number;
  answers?: string[]; // Có thể không tồn tại, nên dùng optional property
  options: Option[];
};

export type Option = {
  answer_option_id: number;
  value: string;
  label: string;
};

export type QuizData = {
  submission: Submission;
  quizTestAPI: QuizTestAPI;
};


export interface QuizSubmission {
  submission_id: string;
  start_time: string; // ISO date string
  last_active_time: string; // ISO date string
  is_completed: boolean;
  total_score: number | null;
  total_time: number;
  taken_time: number;
  total_question: number | null;
  user_answers: UserAnswer[];
  tag_list: string[] | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface QuizSubmissionResponse {
  quizSubmission: QuizSubmission[];
  total: number;
}


export const submissionQuizTest = async (payload: QuizSubmissionState, submission_id: string, is_completed: boolean) => {
  return await axiosConfig.put(`quiz-submissions/update-result/${submission_id}`, {...payload, is_completed})
}

// Get list ssr
export const getHistoryDoQuiz = async (token: string, params: { page: number; take: number }): Promise<{
  data: QuizSubmissionResponse,
  success: boolean
}> => {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    take: params.take.toString(),
  });

  return (
    await axios.get(`${NEXT_PUBLIC_SERVER}/quiz-submissions?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 10000,
    })
  ).data;
};
