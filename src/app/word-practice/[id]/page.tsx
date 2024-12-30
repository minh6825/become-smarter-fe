import React from "react";
import WordPracticePage from "@/section/word-practice";
import { getWordsInListApi } from "@/api/quiz/word-list.rest";
import { cookies } from "next/headers";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value || "";
  const words = await getWordsInListApi(Number(id), token);

  return (
    <div className="bg-primary-main-background h-[calc(100vh-64px)] overflow-auto">
      <WordPracticePage words={words.data} />
    </div>
  );
};

export default page;
