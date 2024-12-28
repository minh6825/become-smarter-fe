import {
  getQuizListPublicApi,
} from "@/api/quiz/quiz.rest";
import { NEXT_PUBLIC_CLIENT } from "@/assets/constant";
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
    url: `${NEXT_PUBLIC_CLIENT}/quiz/${quiz.quizId}`,
    lastModified: quiz.updated_at,
  }));

  const detailQuizList = quizzes.map((quiz) => ({
    url: `${NEXT_PUBLIC_CLIENT}/quiz/${quiz.quizId}/quiz-detail`,
    lastModified: quiz.updated_at,
  }));

  const history = {
    url: `${NEXT_PUBLIC_CLIENT}/history`,
    lastModified: new Date(),
    changeFrequency: "daily"
  }

  const auth = {
    url: `${NEXT_PUBLIC_CLIENT}/auth`,
    lastModified: new Date(),
    changeFrequency: "daily"
  }

  const doQuiz = quizzes.map((quiz) => ({
    url: `${NEXT_PUBLIC_CLIENT}/do-quiz/${quiz.quizId}`,
    lastModified: quiz.updated_at,
  }));

  const quizList = {
    url: `${NEXT_PUBLIC_CLIENT}/list-quiz`,
    lastModified: new Date(),
    changeFrequency: "daily"
  }

  const wordCollection = {
    url: `${NEXT_PUBLIC_CLIENT}/word-collection`,
    lastModified: new Date(),
    changeFrequency: "daily"
  }

  return [auth, quizList, wordCollection, history,...doQuiz, ...detailQuizList, ...quizItemList];
}
