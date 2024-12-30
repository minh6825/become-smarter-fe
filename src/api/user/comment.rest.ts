import { NEXT_PUBLIC_SERVER } from '@/assets/constant';
import axios from 'axios';
import axiosConfig from '../axiosConfig';

export const getCommentsForQuiz = async (quizId: string) => {
    try {
        const response = await axios.get(`${NEXT_PUBLIC_SERVER}/comments/quiz/${quizId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching comments for quiz:', error);
        throw error;
    }
};


export const createComment = async ({commentValue, quizId} : {commentValue: string, quizId: string}) => {
    try {
        const response = await axiosConfig.post(`/comments`, {
            content: commentValue,
            quizId,
        });
        return response.data;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};

export const deleteComment = async (commentId: string) => {
    try {
        const response = await axios.delete(`${NEXT_PUBLIC_SERVER}/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};