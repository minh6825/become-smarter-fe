import axios from "axios";
import axiosConfig from "../axiosConfig";
import { EWordListStatus } from "@/assets/constant";

export interface INewWordList {
    name: string;
    description: string;
}

export interface INewWord {
    word: string;
    language: string;
    description: string;
}

export const getWordList = async () => await axiosConfig.get("/word-lists/user");

export const getWordListSsr = async (token: string) => await axiosConfig.get("/word-lists/user", {
    headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 10000,
});

export const getWordListPublic = async () => await axiosConfig.get("/word-lists/public");

// await axiosConfig.post("/word-lists", newWordList);
export const createWordListApi = async (newWordList: INewWordList) => await axiosConfig.post("/word-lists", newWordList);

export const deleteWordListApi = async (id: number) => await axiosConfig.delete(`/word-lists/${id}`);

export const getWordsInListApi = async (wordListId: number, token?: string) => await axiosConfig.get(
    `/word-lists/list/${wordListId}/word`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
    }
);

export const addWordsToListWord = async ({wordListId, newWord}: {wordListId: number,newWord: INewWord }) => await axiosConfig.post(`/word-lists/${wordListId}/words`, newWord);

export const deleteWordApi = async (id: number) => await axiosConfig.delete(`/word-lists/words/${id}`);

export const changeStatusWordApi = async (word_list_id: number, status: EWordListStatus) => await axiosConfig.put(`/word-lists/change-status`, {
    word_list_id, status
});