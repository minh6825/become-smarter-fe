import Link from 'next/link';
import React from 'react';
import { FcNext, FcPrevious } from 'react-icons/fc';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
};

const Pagination = ({ currentPage, totalPages, baseUrl }: PaginationProps) => {
  const createPageUrl =  (page: number) => `${baseUrl}?page=${page}`;
  return (
    <div className="flex justify-center  mt-3 space-x-2">
      {currentPage > 1 && (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-3 py-1 border flex items-center rounded hover:bg-primary-foreground"
        >
          <FcPrevious className='size-5' />
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`px-3 py-1 border rounded ${
              page === currentPage ? 'bg-blue-500 ' : 'hover:bg-primary-foreground'
            }`}
          >
            {page}
          </Link>
        );
      })}
      {currentPage < totalPages && (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-3 py-1 border rounded hover:bg-primary-foreground"
        >
          <FcNext className='size-5' />
        </Link>
      )}
    </div>
  );
};

export default Pagination;
