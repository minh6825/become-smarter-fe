import { getQuizListPublicApi } from "@/api/quiz/quiz.rest";
import HomePage from "@/section/list-quiz";
import LadingPage from "@/section/home-page";

export const revalidate = 10;

export default async function Home({}: {}) {
  return (
    <div className="bg-primary-main-background">
      <LadingPage />
    </div>
  );
}
