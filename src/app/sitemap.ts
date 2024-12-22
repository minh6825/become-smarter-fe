import {
  getQuizListPublicApi,
} from "@/api/quiz/quiz.rest";
import type { MetadataRoute } from "next";

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const start = id * 50000;
  const end = start + 50000;
  const { quizzes } = await getQuizListPublicApi({ take: 100, page: 1 });
    
  const quizItemList = quizzes.map((quiz) => ({
    url: `https://www.ontaplade.com/quiz/${quiz.quizId}`,
    lastModified: quiz.updated_at,
  }));

  const detailQuizList = quizzes.map((quiz) => ({
    url: `https://www.ontaplade.com/quiz/${quiz.quizId}/quiz-detail`,
    lastModified: quiz.updated_at,
  }));

  return [...detailQuizList, ...quizItemList];
}
