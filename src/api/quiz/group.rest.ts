import axiosConfig from "../axiosConfig";
import { IQuestion } from "./question.rest";
import { IReturnBase } from "./quiz.rest";

export interface ICreateGroupQuestion {
  title: string;
  order: number;
  instruction: string;
  sectionId: number;
  groupTypeId?: string;
}

export interface IGroupQuestion {
  group_question_id: number;
  title: string;
  instruction: string;
  order: number;
  question_list: IQuestion[];
  index: number
  audio: string;
  paragraph: string
}

export interface IReturnCreateGroupQuestion extends IReturnBase {
  groupQuestion: IGroupQuestion;
}

export const createGroupQuestionApi = async (
  payload: ICreateGroupQuestion
): Promise<IReturnCreateGroupQuestion> => (await axiosConfig.post(`/group-questions/admin/create-group`, payload)).data;
