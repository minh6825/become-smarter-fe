import { getWordList, getWordListPublic, getWordListSsr } from "@/api/quiz/word-list.rest";
import WordPracticePage from "@/section/word-practice";
import WordPracticeListPage from "@/section/word-practice-list";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value || "";
    const data = (await getWordListSsr(token)).data;
    const wordListPublic = (await getWordListPublic()).data;

    return (
      <div className="h-[calc(100vh-64px)] bg-primary-main-background overflow-auto">
        <WordPracticeListPage data={[...data, ...wordListPublic]} />
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto pt-10 flex flex-col items-center">
        <Image width={1000} height={1000}
          src="/no-data.jpeg"
          alt="No data"
          className="w-1/2 mb-4 rounded-xl"
        />
        <p className="text-gray-500 text-lg">Không có bộ đề nào!!</p>
      </div>
    );
  }
};

export default page;
