import { QuizSubmissionResponse } from "@/api/quiz/submision";
import PaginationTable from "@/components/table/table-panigation";
import TablePrimary from "@/components/table/table-primary";
import moment from "moment";
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
  if(history.total === 0 ) {
    return (
      <div className="container mx-auto pt-10 flex flex-col items-center">
        <img src="/no-data.jpeg" alt="No data" className="w-1/2 mb-4 rounded-xl" />
        <p className="text-gray-500 text-lg">No data available</p>
      </div>
    );
  }
  return (
    <section className="container px-4 space-y-6 mx-auto">
      <TablePrimary
        listHeader={listHeader}
        data={history.quizSubmission.map((item) => {
          item.last_active_time = moment(item.last_active_time).format("DD-MM-YYYY HH:MM:ss")
          return item
        })}
      />
      <PaginationTable currentPage={page} baseUrl={"/history"} totalPages={Math.ceil(history.total/take)}  />
    </section>
  );
};

export default HistoryPage;
