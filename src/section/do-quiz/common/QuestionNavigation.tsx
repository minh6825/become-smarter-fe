import { IQuestion } from "@/api/quiz/question.rest";
import { ISection } from "@/api/quiz/section.rest";
import ButtonChooseQuestion from "@/components/tags/button/button-choose-question/button-choose-question";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQuizSubmissionContext } from "../quiz-context";

type Props = {
  sectionAndGroup: ISection[];
  setCurrentGroupIndex: React.Dispatch<React.SetStateAction<number>>
};

const QuestionNavigation = ({ sectionAndGroup, setCurrentGroupIndex }: Props) => {
  const { currentQuestionId, setCurrentQuestionId } = useQuizSubmissionContext(); 
  
    return (
    <div className="mt-4 ml-4 shadow-lg rounded-lg w-64">
      <h2 className="text-xl font-semibold mb-2">Thứ tự câu hỏi</h2>
      <div className="gap-2 flex border w-full flex-col p-2 rounded-md border-primary-root-violet">
        {sectionAndGroup.map((section) => (
          <div key={section.section_id} className="flex flex-col w-full gap-2">
            <p>{section.section_name}</p>
            {section.group_question.map((group, index) => (
              <div key={group.index || index} className="border rounded-md grid grid-cols-4 gap-2 flex-wrap p-2 border-primary-root-violet">
                {group.question_list.map((question) => (
                  <Link onClick={() => {setCurrentGroupIndex(group.index); setCurrentQuestionId(question.question_id)}}
                    scroll={true}
                    key={question.question_id} className={`${currentQuestionId == question.question_id && 'bg-primary-root-violet'}`}
                    href={`#question-${question.question_id}`}
                  >
                    <ButtonChooseQuestion>Q{question.index}</ButtonChooseQuestion>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionNavigation;
