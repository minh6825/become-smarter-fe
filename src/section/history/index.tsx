import { QuizSubmissionResponse } from "@/api/quiz/submision";
import PaginationTable from "@/components/table/table-panigation";
import TablePrimary from "@/components/table/table-primary";
import React from "react";

type Props = {
  history: QuizSubmissionResponse;
  take: number;
  page: number;
};

const listHeader = [
  "Id",
  "Submitted At",
  "Status",
  "Score",
  "Start quiz",
  "Action",
];
const HistoryPage = ({ history, page, take }: Props) => {
  return (
    <section className="container px-4 space-y-6 mx-auto">
      <TablePrimary
        listHeader={listHeader}
        data={history.quizSubmission}
      />
      <PaginationTable currentPage={page} baseUrl={"/history"} totalPages={Math.ceil(history.total/take)}  />
    </section>
  );
};

export default HistoryPage;
