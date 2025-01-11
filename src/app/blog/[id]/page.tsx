import { fetchBlog, fetchBlogList } from '@/api/blog/blogs.rest';
import BlogDetailPage from '@/section/blog/blog-item';
import React from 'react'

type PageProps = {
    params: Promise<{ id: string }>;
  };
export const revalidate = 10;

const page = async ({params}: PageProps) => {
      const { id } = await params;
      const data = await fetchBlog(id);
  return (
    <div >
        <BlogDetailPage data={data} />
    </div>
  )
}

export default page