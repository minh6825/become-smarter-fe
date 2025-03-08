import { getQuizTodoApi } from "@/api/quiz/quiz.rest";
import { DoQuizProviderWrap } from "@/section/do-quiz";
import { QuizData } from "@/api/quiz/submision";
import { cookies } from "next/headers";
import { Metadata } from "next";
import React from "react";
import { NEXT_PUBLIC_CLIENT } from "@/assets/constant";

export type IQuizDataRes = {
  data: QuizData;
  message: string;
  success: boolean;
};

export const revalidate = 10;

// SEO Metadata function
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;
  const { id } = await params;

  if (!token) {
    return {
      title: "Làm bài kiểm tra | Ôn tập là dễ",
      description: "Thực hiện bài kiểm tra và cải thiện kỹ năng của bạn.",
    };
  }

  try {
    const data = await getQuizTodoApi(id, token);
    if (!data.success) {
      return {
        title: "Bài kiểm tra không khả dụng | Ôn tập là dễ",
        description: data.message || "Bài kiểm tra này hiện không khả dụng.",
      };
    }

    return {
      title: `${data.data.quizTestAPI.quiz_test_title} | Ôn tập là dễ`,
      description: data.data.quizTestAPI.quiz_test_intro,
      openGraph: {
        title: `${data.data.quizTestAPI.quiz_test_title} | Ôn tập là dễ`,
        description: data.data.quizTestAPI.quiz_test_intro,
        url: `${NEXT_PUBLIC_CLIENT}/quiz/${id}`,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `${data.data.quizTestAPI.quiz_test_title} | Ôn tập là dễ`,
        description: data.data.quizTestAPI.quiz_test_intro,
      },
    };
  } catch (error) {
    return {
      title: "Làm bài kiểm tra | Ôn tập là dễ",
      description: "Thực hiện bài kiểm tra và cải thiện kỹ năng của bạn.",
    };
  }
}

const QuizPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;
  const { id } = await params;

  if (!token) {
    return <div>Bạn cần đăng nhập để làm bài kiểm tra.</div>;
  }

  try {
    const data = await getQuizTodoApi(id, token);
    if (!data.success) {
      return <div>{data.message || "Không thể tải bài kiểm tra."}</div>;
    }

    return (
      <main>
        <DoQuizProviderWrap quizData={data.data} />

        {/* JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Quiz",
              "name": data.data.quizTestAPI.quiz_test_title,
              "description": data.data.quizTestAPI.quiz_test_intro,
              "url": `${NEXT_PUBLIC_CLIENT}/quiz/${id}`,
              "dateCreated": new Date().toISOString(),
            }),
          }}
        />
      </main>
    );
  } catch (error) {
    return <div>Lỗi khi tải bài kiểm tra.</div>;
  }
};

export default QuizPage;
