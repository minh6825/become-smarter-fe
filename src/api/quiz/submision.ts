import { QuizSubmissionState } from "@/section/do-quiz/quiz-context";
import axiosConfig from "../axiosConfig";
import { ISection } from "./section.rest";

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


export const submissionQuizTest = async (payload: QuizSubmissionState, submission_id: string) => {
  return await axiosConfig.put(`quiz-submissions/update-result/${submission_id}`, payload)
}