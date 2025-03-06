"use client";
import { fetchBlogTagsList, IBlogTag } from "@/api/blog-tags/blog-tags.rest";
import SelectPrimary from "@/components/tags/select/select-primary";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const BlogFilter = (props: Props) => {
  const [blogTags, setBlogTags] = useState<IBlogTag[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const router = useRouter();

  useEffect(() => {
    const handleGetBlogTags = async () => {
      const { blogTag, total } = await fetchBlogTagsList({page: 1, limit: 2000})
      setBlogTags(blogTag)
    }
    handleGetBlogTags()
    return () => {
      
    }
  }, [])

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) => {
      const newTags = prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag];
      const query = newTags.length ? `?tagIds=${newTags.join(',')}` : '';
      router.push(`/blog${query}`);
      return newTags;
    });
  }

  console.log(selectedTags)

  return (
    <div>
      <div className="mb-6 flex space-x-4">
        <div className="flex gap-2 items-center">
          {
            blogTags.map((tag) => (
              <p 
                key={tag.tag_id} 
                className={`bg-primary-root-green-bold text-white p-1 cursor-pointer hover:opacity-80 rounded-md font-bold 
                  ${selectedTags.includes(tag.name) ? '!bg-primary-root-red' : ''}`} 
                onClick={() => handleTagClick(tag.name)}
              >
                {tag.name}
              </p>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default BlogFilter;
