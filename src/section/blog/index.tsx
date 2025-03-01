import { IBlog } from '@/api/blog/blogs.rest';
import WrapBox from '@/components/common/wrap-box';
import Link from 'next/link';
import React from 'react';
import BlogFilter from './blog-filter';
import PaginationTable from '@/components/table/table-panigation';

type Props = {
  data: IBlog[];
page: number;
take: number;
total:  number;
};

const BlogsPage = ({ data, page, take, total }: Props) => {
    
  return (
    <WrapBox className='!flex !flex-col'>
      <h1 className='text-3xl font-bold text-center mb-16'>Blog</h1>
      {/* Bộ lọc */}
     <BlogFilter />
      <div className="grid grid-cols-4 space-x-4 ">
        {data.map((blog) => (
          <Link href={`/blog/${blog.blog_id}`} key={blog.blog_id} 
            className="mb-6 border bg-primary-item p-4 rounded-lg shadow-xl">
            <div className='flex items-center justify-between mb-2'>
              <h2 className="text-2xl font-bold mb-2 text-primary-text">{blog.title}</h2>
              <p className="text-sm text-primary-text">{new Date(blog.created_at).toLocaleDateString()}</p>
            </div>
            <p className="mb-4 overflow-hidden h-[140px] text-primary-text" dangerouslySetInnerHTML={{ __html: blog.content }}></p>
            <p>
              {blog.tags.map((tag) => (
                <span key={tag.tag_id} className="bg-primary-root-mint text-white px-2 py-1 rounded-md mr-2">
                  {tag.name}
                </span>
              ))}
            </p>
          </Link>
        ))}
      </div>
    <PaginationTable currentPage={page} totalPages={Math.ceil(total/page)} baseUrl='/blog/' />
    </WrapBox>
  );
};

export default BlogsPage;
