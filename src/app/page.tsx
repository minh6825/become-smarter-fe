import { getQuizListPublicApi } from "@/api/quiz/quiz.rest";
import HomePage from "@/section/list-quiz";
import LadingPage from "@/section/home-page";

export const revalidate = 10;

export default async function Home({
}: {
}) {
  
  return (
    <div>
      <LadingPage />
    </div>
  );
}
