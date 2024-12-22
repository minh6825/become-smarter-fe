'use client'
import { IGroupQuestion } from "@/api/quiz/group.rest";
import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import { useSearchParams } from "next/navigation";

type Props = {
  group: IGroupQuestion;
  isVisible: boolean;
  questionNumber: number;
};

const GroupQuestion = ({ group, isVisible, questionNumber }: Props) => {
 

  return (
    isVisible && (
      <div id={`group-${group.group_question_id}`} className="mb-4">
        <h3 className="text-lg font-medium mb-2">{group.title}</h3>
        <p className="text-gray-600 mb-2">{group.instruction}</p>
        <div>
          {group.question_list.map((question, index) => (
            <QuestionItem
              key={question.question_id}
              question={question}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default GroupQuestion;