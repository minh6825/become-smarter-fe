"use client"

import { useState, useEffect } from "react"
import type { IQuestion } from "@/api/quiz/question.rest"
import { useQuizSubmissionContext } from "./quiz-context"
import { Eye, EyeOff, Volume2 } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import AudioPlayer from "./common/audio-custom"

type Props = {
  question: IQuestion
}

const QuestionItem = ({ question }: Props) => {
  const { quizSubmissionState } = useQuizSubmissionContext()
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showAnswers, setShowAnswers] = useState<boolean>(false)
  const [showExplanation, setShowExplanation] = useState<boolean>(false)
  const formattedExplain = question.explain.replace(/\n/g, "<br />")

  // Initialize value when component first renders
  useEffect(() => {
    const existingAnswer = quizSubmissionState.user_answers.find(
      (item) => item.question_id === question.question_id,
    )?.answer_text
    if (existingAnswer) {
      setSelectedAnswer(existingAnswer)
    }
  }, [quizSubmissionState.user_answers, question.question_id])

  return (
    <Card id={`question-${question.question_id}`} className="mb-4 border-l-2 border-l-primary shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-2">
          <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center font-medium">
            {question.index}
          </Badge>
          <h3 className="font-semibold text-lg">{question.question_text}</h3>
        </div>

        {/* Media content */}
        <div className="mt-3 space-y-3">
          {question.audio && (
            <AudioPlayer src={question.audio} />
          )}

          {question.image && (
            <div className="rounded-md overflow-hidden border">
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

      <CardContent>
        {/* Options */}
        <ul className="list-none list-inside flex flex-col gap-2">
          {question.options.map((option, index) => (
            <li className="w-full" key={option.answer_option_id || index}>
              <button
                onClick={() => setSelectedAnswer(option.value)}
                className={cn(
                  "w-full text-left p-3 rounded-md border transition-all duration-200 flex items-center gap-3 hover:bg-muted/50",
                  selectedAnswer === option.value ? "border-primary bg-primary/10 shadow-sm" : "border-border",
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center h-7 w-7 rounded-full border font-medium transition-all",
                    selectedAnswer === option.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-muted-foreground/30",
                  )}
                >
                  {option.value}
                </span>
                <label className="font-medium translate-y-[0.5px] w-fit">{option.label}</label>
              </button>
            </li>
          ))}
        </ul>

        <Separator className="my-4" />

        {/* Answer and Explanation */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-base">Answer</h4>
              <Button variant="outline" size="sm" onClick={() => setShowAnswers(!showAnswers)} className="h-8 px-2">
                {showAnswers ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                {showAnswers ? "Hide" : "Show"}
              </Button>
            </div>

            {showAnswers && (
              <div className="p-3 bg-muted/50 rounded-md">
                {question.answers &&
                  question.answers.map((item) => (
                    <Badge key={item} variant="secondary" className="mr-2 mb-1">
                      {item}
                    </Badge>
                  ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-base">Explanation</h4>
              <Button variant="outline" size="sm" onClick={() => setShowExplanation(!showExplanation)} className="h-8 px-2">
                {showExplanation ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                {showExplanation ? "Hide" : "Show"}
              </Button>
            </div>
            {showExplanation && <div
              className="p-3 bg-muted/30 rounded-md prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: formattedExplain }}
            />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default QuestionItem

