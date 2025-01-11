import Link from "next/link";
import React from "react";
import moment from "moment";

type Props = {
  data: {
    created_at: string;
    description: string;
    name: string;
    updated_at: string;
    word_list_id: number;
  }[];
};

const WordPracticeListPage = ({ data }: Props) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">Word Practice Lists</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <li
            key={index}
            className="p-6 bg-primary-background border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <Link
              href={`/word-practice/${item.word_list_id}`}
              className="block text-primary"
            >
              <h2 className="text-2xl font-bold mb-2 truncate">{item.name}</h2>
              <p className="text-sm text-gray-700 mb-4 truncate">
                {item.description || "No description available"}
              </p>
              <div className="mt-4 space-y-1 text-sm text-gray-500">
                <p>
                  <span className="font-medium">Word List ID:</span>{" "}
                  {item.word_list_id}
                </p>
                <p>
                  <span className="font-medium">Created At:</span>{" "}
                  {moment(item.created_at).format("DD-MM-YYYY HH:mm:ss")}
                </p>
                <p>
                  <span className="font-medium">Updated At:</span>{" "}
                  {moment(item.updated_at).format("DD-MM-YYYY HH:mm:ss")}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordPracticeListPage;
