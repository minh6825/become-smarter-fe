import { getWordList, getWordListSsr } from "@/api/quiz/word-list.rest";
import WordPracticePage from "@/section/word-practice";
import WordPracticeListPage from "@/section/word-practice-list";
import { cookies } from "next/headers";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value || "";
  const data = (await getWordListSsr(token)).data;
  return (
    <div className="h-[calc(100vh-64px)] bg-primary-main-background overflow-auto">
      <WordPracticeListPage data={data} />
    </div>
  );
};

export default page;
