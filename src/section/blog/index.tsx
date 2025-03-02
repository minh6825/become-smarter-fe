import { IBlog } from '@/api/blog/blogs.rest';
import WrapBox from '@/components/common/wrap-box';
import Link from 'next/link';
import React from 'react';
import BlogFilter from './blog-filter';
import PaginationTable from '@/components/table/table-panigation';
import moment from 'moment';

type Props = {
  data: IBlog[];
page: number;
take: number;
total:  number;
};

const BlogsPage = ({ data, page, take, total }: Props) => {
    console.log(page, total )
  return (
    <WrapBox className='!flex !flex-col '>
      <h1 className='text-3xl font-bold text-center mb-10'>Blog</h1>
      {/* Bộ lọc */}
     <BlogFilter />
      <div className="grid grid-cols-4 space-x-4 space-y-4 mb-10 ">
        {data.map((blog) => (
          <>
          <Link href={`/blog/${blog.blog_id}`} key={blog.blog_id}  
          className="flex flex-col shadow-lg border border-collapse rounded-lg overflow-hidden bg-primary-item">
          <div className="p-4 flex flex-col gap-2">
            <span className={`px-3 py-1 text-white rounded-full text-sm`}>
              {blog.tags.map((tag) => (
                <span key={tag.tag_id} className="bg-primary-root-mint text-white px-2 py-1 rounded-md mr-2">
                  {tag.name}
                </span>
              ))}
            </span>
            <h4 className="text-xl font-semibold capitalize">{blog.title}</h4>
            <p className="text-gray-600 text-sm truncate h-[30px] w-full" 
            dangerouslySetInnerHTML={{ __html: blog.content }}
            ></p>
          </div>
          <div className="flex items-center p-4 border-t border-b-primary-root-background-table mt-auto">
            {/* <img src={} alt="user" className="w-10 h-10 rounded-full" /> */}
            <div className="w-8 h-8 rounded-full bg-green-300 " />
            <div className="ml-3">
              <h5 className="text-sm font-semibold">{blog.title}</h5>
              <small className="text-gray-500">{moment(blog.created_at).format('DD-MM-YYYY hh:mm:ss')}</small>
            </div>
          </div>
        </Link>
        </>
        ))}
      </div>
    <PaginationTable currentPage={page} totalPages={Math.ceil(total/take)} baseUrl='/blog/' />
    </WrapBox>
  );
};

export default BlogsPage;
