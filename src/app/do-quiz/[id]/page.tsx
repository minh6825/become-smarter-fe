import { getQuizTodoApi } from "@/api/quiz/quiz.rest";
import WrapBox from "@/components/common/wrap-box";
import DoQuizPage, { DoQuizProviderWrap } from "@/section/do-quiz";
import { QuizData } from "@/api/quiz/submision";
import { cookies } from "next/headers";
import React from "react";

export type IQuizDataRes = {
  data: QuizData;
  message: string;
  success: boolean;
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;
  
  let data = null;
  const { id } = await params;

  if (token) {
    try {
      data = await getQuizTodoApi(id, token);
    } catch (error) {
      console.log('bug')
      return null
    }
  }
  
  if (!data?.success) {
    return <div>
    {data?.message}
    </div>
  }

  return <div>{<DoQuizProviderWrap quizData={data.data} />}</div>;
};

export default page;
