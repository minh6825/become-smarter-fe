import { IQuizDetail } from "@/api/quiz/quiz.rest";
import WrapBox from "@/components/common/wrap-box";
import Link from "next/link";
import React from "react";
import { getCommentsForQuiz } from "@/api/user/comment.rest";
import CommentList from "./comment-list";

type Props = {
  quiz: IQuizDetail;
};

const QuizOverviewPage = async ({ quiz }: Props) => {
  let commentList = [];
  try {
    commentList = await getCommentsForQuiz(quiz.quizId);
  } catch (error) {
    console.error("Error fetching comments for quiz:", error);
    return <div>No data</div>;
  }

  return (
    <WrapBox className="p-6 !flex !justify-between gap-20 !w-full">
      <div>
        <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
        <p className="text-lg text-gray-700 mb-2">{quiz.description}</p>
        <div className="mb-4">
          <p className="text-md">
            <strong>Total Time:</strong> {quiz.totalTime} minutes
          </p>
          <p className="text-md">
            <strong>Sections:</strong> {quiz.sectionNumber}
          </p>
          <p className="text-md">
            <strong>Total Questions:</strong> {quiz.questionNumber}
          </p>
        </div>

        <div className="mt-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Tag Count By Section</h2>
          {Object.entries(quiz.tagCountBySection).map(
            ([sectionId, tags], index) => (
              <div key={sectionId} className="mb-4">
                <h3 className="font-medium text-lg mb-1">
                  Section {Number(sectionId) + 1}
                </h3>
                <ul className="list-disc list-inside ml-4">
                  {Object.entries(tags).map(([tag, count]) => (
                    <li key={tag} className="text-md">
                      {tag}: {count}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
        <div className="flex gap-4 py-4">
          <Link
            href={`/do-quiz/${quiz.quizId}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-bold"
          >
            Làm bài
          </Link>
          <Link
            href={`/quiz/${quiz.quizId}/quiz-detail`}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-bold"
          >
            Xem chi tiết đề
          </Link>
        </div>
      </div>
      <CommentList quizId={quiz.quizId} commentList={commentList} />
    </WrapBox>
  );
};

export default QuizOverviewPage;
