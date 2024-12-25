"use client";
import { ISection } from "@/api/quiz/section.rest";
import React from "react";
import GroupQuestion from "./GroupQuestion";
import { IGroupQuestion } from "@/api/quiz/group.rest";

type Props = {
  section: ISection;
  currentGroupIndex: number;
  allGroups: IGroupQuestion[];
  questionNumber: number;
};

const Section = ({
  section,
  currentGroupIndex,
  allGroups,
  questionNumber,
}: Props & { startIndex: number }) => {
  const groupQuestionIdShow = allGroups[currentGroupIndex].group_question_id;

  const isShow = section.group_question.some(
    (group) => group.group_question_id === groupQuestionIdShow
  );
  if (!isShow) return null;

  return (
    <div id={`section-${section.section_id}`} className="mb-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">{section.section_name}</h2>
        <p className="text-gray-700 mb-4">{section.section_content}</p>
      </div>
      {section.group_question.map((group, index) => (
        <GroupQuestion
          key={group.group_question_id}
          group={group}
          isVisible={groupQuestionIdShow === group.group_question_id}
          questionNumber={questionNumber + index}
        />
      ))}
    </div>
  );
};

export default Section;
