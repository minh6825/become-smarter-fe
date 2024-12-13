import { ISection } from "@/api/quiz/section.rest";
import React from "react";
import GroupQuestion from "./GroupQuestion";
import { IGroupQuestion } from "@/api/quiz/group.rest";

type Props = {
  section: ISection;
  currentGroupIndex: number;
  allGroups: IGroupQuestion[];
};

const Section = ({ section, currentGroupIndex, allGroups, startIndex }: Props & { startIndex: number }) => {
  const groupQuestionIdShow = allGroups[currentGroupIndex].group_question_id;
  let questionCounter = startIndex + 1; // Bắt đầu từ chỉ số được truyền từ parent

  return (
    <div id={`section-${section.section_id}`} className="mb-6">
      {section.group_question.some(
        (group) => group.group_question_id === groupQuestionIdShow
      ) && (
        <div>
          <h2 className="text-xl font-semibold mb-2">{section.section_name}</h2>
          <p className="text-gray-700 mb-4">{section.section_content}</p>
        </div>
      )}
      {section.group_question.map((group) => (
        <GroupQuestion
          key={group.group_question_id}
          group={group}
          isVisible={groupQuestionIdShow === group.group_question_id}
          questionCounterRef={{ current: questionCounter }} // Truyền tham chiếu số thứ tự
        />
      ))}
    </div>
  );
};

export default Section;
