import { IBlog } from '@/api/blog/blogs.rest';
import WrapBox from '@/components/common/wrap-box';
import Link from 'next/link';
import React from 'react';

type Props = {
    data: IBlog[];
};

const BlogsPage = ({data}: Props) => {

    return (
        <WrapBox className=" grid grid-cols-4 space-x-4 !pt-10">
            {data.map((blog) => (
                <Link href={`/blog/${blog.blog_id}`} key={blog.blog_id} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                    <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{__html: blog.content}}></p>
                    <p className="text-sm text-gray-500">{new Date(blog.created_at).toLocaleDateString()}</p>
                </Link>
            ))}
        </WrapBox>
    );
};

export default BlogsPage;