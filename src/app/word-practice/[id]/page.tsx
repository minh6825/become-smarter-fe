import React from "react";
import WordPracticePage from "@/section/word-practice";
import { getWordsInListApi } from "@/api/quiz/word-list.rest";
import { cookies } from "next/headers";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value || "";
  const words = await getWordsInListApi(Number(id), token);

  return (
    <div>
      <WordPracticePage words={words.data} />
    </div>
  );
};

export default Page;
