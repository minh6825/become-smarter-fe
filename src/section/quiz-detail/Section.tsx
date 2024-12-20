import { ISection } from "@/api/quiz/section.rest";
import React from "react";
import GroupQuestion from "./GroupQuestion";
import { IGroupQuestion } from "@/api/quiz/group.rest";

type Props = {
  section: ISection;
  currentGroupIndex: number;
  allGroups: IGroupQuestion[];
};

const Section = ({
  section,
  currentGroupIndex,
  allGroups,
  startIndex,
}: Props & { startIndex: number }) => {
  const groupQuestionIdShow = allGroups[currentGroupIndex].group_question_id;
  let questionCounter = startIndex + 1; // Bắt đầu từ chỉ số được truyền từ parent

  return (
    <>
      {section.group_question.some(
        (group) => group.group_question_id === groupQuestionIdShow
      ) && (
        <div
          id={`section-${section.section_id}`}
          className="px-6 shadow-lg  border-x "
        >
          <h2 className="text-2xl font-bold text-indigo-600">
            {section.section_name}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {section.section_content}
          </p>
          <div className="space-y-4">
            {section.group_question.map((group) => (
              <GroupQuestion
                key={group.group_question_id}
                group={group}
                isVisible={groupQuestionIdShow === group.group_question_id}
                questionCounterRef={{ current: questionCounter }} // Bắt đầu từ chỉ số hiện tại
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Section;
