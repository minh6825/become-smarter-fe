import { IBlog } from '@/api/blog/blogs.rest'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    blog: IBlog
}

const BlogDetailItem = ({ blog }: Props) => {
  return (
    <Link href={`/blog/${blog.blog_id}`} className="flex flex-col shadow-lg border border-collapse  border-border-color rounded-lg overflow-hidden bg-item-background w-[24%] max-md:w-[48%] max-sm:w-[100%]">
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
    <h4 className="text-[18px] font-semibold capitalize w-full h-[50px] overflow-hidden line-clamp-2">
      {blog.title}
    </h4>
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
  )
}

export default BlogDetailItem