import { IBlog } from '@/api/blog/blogs.rest';
import WrapBox from '@/components/common/wrap-box';
import Link from 'next/link';
import React from 'react';

type Props = {
    data: IBlog[];
};

const BlogsPage = ({data}: Props) => {

    return (
        <WrapBox>
            <h1 className='text-3xl font-bold text-center mb-16'>Blog</h1>
            <div className=" grid grid-cols-4 space-x-4">
                {data.map((blog) => (
                    <Link href={`/blog/${blog.blog_id}`} key={blog.blog_id} className="mb-6 border border-primary-foreground bg-primary-item p-4 rounded-lg shadow-md">
                        <div className='flex items-center justify-between mb-2'>
                            <h2 className="text-2xl font-bold mb-2 text-primary-text">{blog.title}</h2>
                            <p className="text-sm text-primary-text">{new Date(blog.created_at).toLocaleDateString()}</p>
                        </div>
                        <p className="mb-4 overflow-hidden h-[140px] text-primary-text" dangerouslySetInnerHTML={{__html: blog.content}}></p>
                    </Link>
                ))}
            </div>
        </WrapBox>
    );
};

export default BlogsPage;