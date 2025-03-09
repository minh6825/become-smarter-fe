import { IQuiz } from "@/api/quiz/quiz.rest";
import Link from "next/link";
import React from "react";
import ButtonPrimary from "@/components/tags/button/button-primary";
import keyframe from '@/style/css/keyframe.module.css'
import { Button } from "@/components/ui/button";

type Props = {
  quiz: IQuiz;
};

const QuizItem = ({ quiz }: Props) => {
 
  return (
    <div className={`${keyframe['quiz-item']} bg-item-background border-border-color quiz-item border gap-2 flex flex-col p-4 my-2 rounded-md shadow-xl cursor-pointer`}>
        <h3 className="text-lg font-bold">{quiz.title}</h3>
        <p>{quiz.description}</p>
        <span className="text-sm text-gray-500">
          Tổng thời gian: {quiz.total_time} phút
        </span>
      <Link className="mt-auto" href={`/quiz/${quiz.quizId}`} key={quiz.quizId}>
        <Button type="button">Xem chi tiết</Button>
      </Link>
      </div>
  );
};

export { QuizItem};
