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
      return <div>error</div>;
    }

    return (
      <div className="container mx-auto pt-10">
        <HistoryPage history={data.data} page={page} take={take} />
      </div>
    );
  } catch (error) {
    return <div>error</div>;
  }
}
