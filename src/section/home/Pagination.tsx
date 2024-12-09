import { NEXT_PUBLIC_SERVER } from '@/assets/constant';
import Link from 'next/link';
import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
};

const Pagination = ({ currentPage, totalPages, baseUrl }: PaginationProps) => {
  const createPageUrl =  (page: number) => `${baseUrl}?page=${page}`;
  return (
    <div className="flex justify-center mt-4 space-x-2">
      {currentPage > 1 && (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Previous
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`px-3 py-1 border rounded ${
              page === currentPage ? 'bg-blue-500 ' : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </Link>
        );
      })}
      {currentPage < totalPages && (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
