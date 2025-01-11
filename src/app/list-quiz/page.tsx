import { getQuizListPublicApi } from "@/api/quiz/quiz.rest";
import Footer from "@/section/home-page/footer";
import HomePage from "@/section/list-quiz";

export const revalidate = 10;

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  // Chuẩn bị params với giá trị mặc định và lọc bỏ giá trị undefined/null
  const searchParamsFinal = await Promise.resolve(searchParams);
  const rawParams: Partial<{
    take: number;
    page: number;
    tags?: string;
    search?: string;
    sortBy?: string;
    questionSet?: string;
    quizSkill?: string;
    category?: string;
    subCategory?: string;
    quizSet?: string;
  }> = {
    take: searchParamsFinal.take ? Number(searchParamsFinal.take) : 12,
    page: searchParamsFinal.page ? Number(searchParamsFinal.page) : 1,
    tags: searchParamsFinal.tags,
    search: searchParamsFinal.search,
    sortBy: searchParamsFinal.sortBy,
    questionSet: searchParamsFinal.questionSet,
    quizSkill: searchParamsFinal.quizSkill,
    category: searchParamsFinal.category, // Thêm category
    subCategory: searchParamsFinal.subCategory, // Thêm subCategory
    quizSet: searchParamsFinal.quizSet, // Thêm quizSet
  };

  const currentPage = searchParamsFinal?.page ? Number(searchParamsFinal?.page) : 1;
  const take = searchParamsFinal?.take ? Number(searchParamsFinal?.take) : 12;

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
    category?: string;
    subCategory?: string;
    quizSet?: string;
  };

  // Gọi API với các tham số được định nghĩa
  const data = await getQuizListPublicApi(params);

  return (
    <div className="bg-primary-main-background min-h-[calc(100vh-72px)] overflow-auto">
      <HomePage
        quizzes={data.quizzes}
        currentPage={currentPage}
        totalPages={Math.ceil(data.quantityQuizTest / take)}
      />
      <Footer /> 
    </div>
  );
}
