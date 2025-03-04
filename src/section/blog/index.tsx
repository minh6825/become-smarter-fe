import { IBlog } from '@/api/blog/blogs.rest';
import WrapBox from '@/components/common/wrap-box';
import Link from 'next/link';
import React from 'react';
import BlogFilter from './blog-filter';
import PaginationTable from '@/components/table/table-panigation';
import moment from 'moment';
import Image from 'next/image';

type Props = {
  data: IBlog[];
page: number;
take: number;
total:  number;
};

const BlogsPage = ({ data, page, take, total }: Props) => {

  return (
    <WrapBox className='!flex !flex-col max-md:px-4'>
      <h1 className='text-3xl font-bold text-center mb-10'>Blog</h1>
      {/* Bộ lọc */}
     <BlogFilter />
      <div className="flex mb-10 flex-wrap gap-y-4 gap-[calc(4%/3)] max-md::gap-y-6 max-sm::gap-y-8 w-full">
        {data.length ? data.map((blog) => (
          <>
          <Link href={`/blog/${blog.blog_id}`} key={blog.blog_id}  
          className="flex flex-col shadow-lg border border-collapse  rounded-lg overflow-hidden bg-primary-item w-[24%] max-md:w-[48%] max-sm:w-[100%]">
          <div >
            <Image src={'https://www.ontaplade.com/logo.png'} alt='Logo' width={1000} height={1000} className='w-full h-[150px] object-cover' />
          </div>
          <div className='p-4'>
          <div className=''>
            <div className={`h-7 text-white rounded-full text-sm`}>
              {blog.tags.length ? blog.tags.map((tag) => (
                <span key={tag.tag_id} className="underline text-primary-root-green py-1 rounded-md mr-2">
                  {tag.name}
                </span>
              )) : <span className='underline text-primary-root-green'>No tags</span>}
            </div>
            <h4 className="text-[18px] font-semibold capitalize w-full">{blog.title}</h4>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-300 " />
            <div className="ml-3">
              <h5 className="text-sm font-semibold text-nowrap w-[200px] truncate">{blog.title}</h5>
              <small className="text-gray-500">{moment(blog.created_at).format('DD-MM-YYYY hh:mm:ss')}</small>
            </div>
          </div>
          </div>
        </Link>
        </>
        )) : <BlogsPageSkeleton />}
      </div>
    <PaginationTable currentPage={page} totalPages={Math.ceil(total/take)} baseUrl='/blog/' />
    </WrapBox>
  );
};

export default BlogsPage;

const BlogsPageSkeleton = () => {
  return (
      <div className='flex mb-10 flex-wrap gap-y-4 gap-[calc(4%/3)] w-full'>
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className='flex flex-col shadow-lg border border-collapse rounded-lg overflow-hidden bg-primary-item w-[24%] animate-pulse'
          >
            <div className='p-4 flex flex-col gap-2'>
              <div className='h-4 w-16 bg-gray-300 rounded-md'></div>
              <div className='h-6 w-3/4 bg-gray-300 rounded-md'></div>
              <div className='h-6 w-full bg-gray-300 rounded-md'></div>
            </div>
            <div className='flex items-center p-4 border-t border-b-primary-root-background-table mt-auto'>
              <div className='w-8 h-8 rounded-full bg-gray-300'></div>
              <div className='ml-3'>
                <div className='h-4 w-24 bg-gray-300 rounded-md'></div>
                <div className='h-3 w-16 bg-gray-300 rounded-md mt-1'></div>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
};