import Link from "next/link";
import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
};

const PaginationTable: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  baseUrl,
}) => {
  const createPageUrl = (page: number) => `${baseUrl}?page=${page}`;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between ">
      <Link
        href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
        className={`flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200
            border rounded-md gap-x-2 text-primary ${
          currentPage === 1 ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <span>Previous</span>
      </Link>

      <div className="items-center hidden md:flex gap-x-3">
        {getPageNumbers().map((page) => (
          <Link 
            key={page}
            href={createPageUrl(page)}
            className={`px-2 py-1 text-sm rounded-md ${
              currentPage === page
                ? "text-blue-500 border border-primary bg-primary-background pointer-events-none"
                : "text-gray-500"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"}
        className={`flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200
            border rounded-md gap-x-2 text-primary ${
          currentPage === totalPages ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <span>Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </Link>
    </div>
  );
};

export default PaginationTable;
