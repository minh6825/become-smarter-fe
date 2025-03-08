import React, { useState, useEffect } from "react";
import { IQuestion } from "@/api/quiz/question.rest";
import { useQuizSubmissionContext } from "./quiz-context";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AudioPlayer from "../quiz-detail/common/audio-custom";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  question: IQuestion;
};

const QuestionItem = ({ question }: Props) => {
  const { updateAnswer, quizSubmissionState } = useQuizSubmissionContext();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Khởi tạo giá trị khi component render lần đầu
  useEffect(() => {
    const existingAnswer = quizSubmissionState.user_answers.find(
      (item) => item.question_id === question.question_id
    )?.answer_text;
    if (existingAnswer) {
      setSelectedAnswer(existingAnswer);
    }
  }, [quizSubmissionState.user_answers, question.question_id]);

  const handleAnswerChange = (answerText: string) => {
    setSelectedAnswer(answerText);
    updateAnswer({
      question_id: question.question_id,
      answer_text: answerText,
      marked: true,
    });
  };

  return (
    <Card
      id={`question-${question.question_id}`}
      className={`mb-2 p-2 border-b border-primary-root-violet pb-8`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start gap-2">
          <Badge variant="outline" className="border border-primary-root-violet py-2 rounded-full text-base flex items-center justify-center font-medium">
            {question.index}. {question.question_text}
          </Badge>
          </div>
            <div className="mt-3 space-y-3">
                {question.audio && (
                  <AudioPlayer src={question.audio} />
                )}
      
                {question.image && (
                  <div className="rounded-md overflow-hidden border border-primary-root-violet">
                    <Image
                      src={question.image || "/placeholder.svg"}
                      alt="Question image"
                      width={500}
                      height={200}
                      className="w-full object-contain max-h-[300px]"
                    />
                  </div>
                )}
              </div>
      </CardHeader>
      <ul className="list-none list-inside flex flex-col gap-2 px-6 w-full">
      {question.options.map((option, index) => (
            <li className="cursor-pointer border rounded-md border-primary-root-violet" key={option.answer_option_id || index}>
            <label className={cn("w-full cursor-pointer text-left p-3 transition-all duration-200 flex items-center gap-3 hover:bg-muted/50",
                              selectedAnswer === option.value ? "border-primary bg-primary/10 shadow-sm" : "border-border",
                            )} >
              <input
              className="size-4 hidden"
              type="radio" // Nên dùng radio nếu chỉ cho phép chọn một đáp án
              name={`question-${question.question_id}`}
              value={option.value}
              checked={selectedAnswer === option.value} // Kiểm tra giá trị từ state
              onChange={() => handleAnswerChange(option.value)}
              />
              <span className={`font-medium border border-primary-root-violet rounded-full size-6 text-center transition-transform duration-300 ${selectedAnswer === option.value ? 'bg-primary-blue text-primary-text-button' : ''}`}>{option.value}</span>
              <span className="font-medium translate-y-[0.5px] w-fit">{option.label} </span>
            </label>
            </li>
        ))}
      </ul>
    </Card>
  );
};

export default QuestionItem;
