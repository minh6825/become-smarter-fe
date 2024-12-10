import { getQuizListPublicApi } from "@/api/quiz/quiz.rest";
import HomePage from "@/section/home";

export const revalidate = 10;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  // Chuẩn bị params với giá trị mặc định và lọc bỏ giá trị undefined/null
  const searchParamsFinal = await Promise.resolve(searchParams)
  const rawParams: Partial<{
    take: number;
    page: number;
    tags?: string;
    search?: string;
    sortBy?: string;
    questionSet?: string;
    quizSkill?: string;
  }> = {
    take: searchParamsFinal.take ? Number(searchParamsFinal.take) : 10,
    page: searchParamsFinal.page ? Number(searchParamsFinal.page) : 1,
    tags: searchParamsFinal.tags,
    search: searchParamsFinal.search,
    sortBy: searchParamsFinal.sortBy,
    questionSet: searchParamsFinal.questionSet,
    quizSkill: searchParamsFinal.quizSkill,
  };

  const currentPage = searchParamsFinal?.page ? Number(searchParamsFinal?.page) : 1;
  const take = searchParamsFinal?.take ? Number(searchParamsFinal?.take) : 10;

  const params = Object.fromEntries(
    Object.entries(rawParams).filter(([_, value]) => value !== undefined && value !== null)
  ) as {
    take: number;
    page: number;
    tags?: string;
    search?: string;
    sortBy?: string;
    questionSet?: string;
    quizSkill?: string;
  };
  const data = await getQuizListPublicApi(params);
  return (
    <div>
      <HomePage quizzes={data.quizzes}  currentPage={currentPage}
        totalPages={Math.ceil(data.quantityQuizTest / take)} />
    </div>
  );
}
