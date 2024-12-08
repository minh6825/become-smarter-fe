import { getQuizListPublicApi } from "@/api/quiz/quiz.rest";
import HomePage from "@/section/home";

export const revalidate = 10 

export default async function Home() {
  const data = await getQuizListPublicApi()
  return (
    <div>
      <HomePage quizzes={data.quizzes} />
    </div>
  );
}
