import { getQuizListPublicApi } from "@/api/quiz/quiz.rest";
import HomePage from "@/section/home";

export default async function Home() {
  const data = await getQuizListPublicApi()
  return (
    <div>
      <HomePage quizzes={data.quizzes} />
    </div>
  );
}
