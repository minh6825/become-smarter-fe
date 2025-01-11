import { getHistoryDoQuiz } from "@/api/quiz/submision";
import HistoryPage from "@/section/history";
import { cookies } from "next/headers";
import React from "react";

export const revalidate = 10;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const cookieStore = cookies();
  const searchParamsFinal = await Promise.resolve(searchParams);
  const token = (await cookieStore).get("accessToken")?.value || "";

  const page = searchParamsFinal?.page ? Number(searchParamsFinal.page) : 1;
  const take = searchParamsFinal?.take ? Number(searchParamsFinal.take) : 10;

  try {
    const data = await getHistoryDoQuiz(token, { page, take });
    if (data.success === false) {
      return (
        <div className="container mx-auto pt-10 flex flex-col items-center">
          <img
            src="/no-data.jpeg"
            alt="No data"
            className="w-1/2 mb-4 rounded-xl"
          />
          <p className="text-gray-500 text-lg">No data available</p>
        </div>
      );
    }

    return (
      <div className=" w-screen  pt-10 bg-primary-main-background h-[calc(100vh-72px)]">
        <div className="container mx-auto">
          <HistoryPage history={data.data} page={page} take={take} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto pt-10 flex flex-col items-center">
        <img
          src="/no-data.jpeg"
          alt="No data"
          className="w-1/2 mb-4 rounded-xl"
        />
        <p className="text-gray-500 text-lg">Chưa có bài nào cả</p>
      </div>
    );
  }
}
