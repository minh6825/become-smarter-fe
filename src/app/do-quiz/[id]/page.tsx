import { getQuizTodoApi } from "@/api/quiz/quiz.rest";
import WrapBox from "@/components/common/wrap-box";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;
  let data = null
  const { id } = await params
  
  if(token) {
    data = await getQuizTodoApi(id, token);
  }
  
  return <WrapBox>page</WrapBox>;
};

export default page;
