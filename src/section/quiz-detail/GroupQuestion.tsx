import { IGroupQuestion } from "@/api/quiz/group.rest";
import React from "react";
import QuestionItem from "./QuestionItem";
import { useSearchParams } from "next/navigation";

type Props = {
  group: IGroupQuestion;
  isVisible: boolean;
};

const GroupQuestion = ({ group, isVisible, questionCounterRef }: Props & { questionCounterRef: { current: number } }) => {


  return (
    isVisible && (
      <div id={`group-${group.group_question_id}`} className="mb-4">
          <h3 className="text-lg font-medium mb-1">{group.title}</h3>
          <p className="text-gray-600 mb-2">{group.instruction}</p>
        <div>
          {group.question_list.map((question) => {
            const globalIndex = questionCounterRef.current++;
            return (
              <QuestionItem 
                key={question.question_id} 
                question={question} 
                index={globalIndex} 
              />
            );
          })}
        </div>
      </div>
    )
  );
};


export default GroupQuestion;