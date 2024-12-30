import { QuizSubmission } from "@/api/quiz/submision";
import React from "react";
import PaginationTable from "./table-panigation";

type Props = {
  data: QuizSubmission[];
  listHeader: string[];
};

const TablePrimary = ({ data, listHeader }: Props) => {
  return (
    <div>
      <div className="flex flex-col ">
        <div className="-mx-4 -my-2 overflow-x-auto  sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-primary-root-background-table">
                  <tr>
                  {listHeader.map(headerItem => (
                    <th key={headerItem}
                      scope="col"
                      className="font-bold px-4 py-3.5 text-sm text-left rtl:text-right text-primary"
                    >
                      {headerItem}
                    </th>
                  ))}
                  </tr>
                </thead>
                <tbody className="bg-primary-background divide-y">
                  {data.map((item) => (
                    <tr key={item.submission_id}> 
                      <td className="px-4 py-4 text-sm font-medium text-primary whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">
                          <span>{item.submission_id}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-primary whitespace-nowrap">
                        {item.last_active_time}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-primary whitespace-nowrap">
                        <div className={`inline-flex items-center px-3 py-1 
                          ${item.is_completed ? 'text-primary-root-green-bold' : 'text-primary-root-red'} 
                          rounded-full gap-x-2 bg-primary-background`}>
                        {item.is_completed ? <h2 className="text-sm font-normal">Đã nộp bài</h2> : 
                            <h2>Chưa nộp bài</h2>
                        }
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-primary whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                        {item.total_score || 0}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-primary whitespace-nowrap">
                        {item.start_time}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button className="text-primary-root-red transition-colors duration-200
                           hover:text-primary-root-red focus:outline-none">
                          Xóa
                          </button>

                          <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                            Xem thêm
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePrimary;
