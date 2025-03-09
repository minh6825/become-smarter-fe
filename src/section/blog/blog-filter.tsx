"use client";
import { IBlogTag } from "@/api/blog-tags/blog-tags.rest";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  blogTagsList: IBlogTag[];
};

const BlogFilter = ({blogTagsList}: Props) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const router = useRouter();

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) => {
      const newTags = prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag];
      const query = newTags.length ? `?tagIds=${newTags.join(',')}` : '';
      router.push(`/blog${query}`);
      return newTags;
    });
  }

  return (
    <div>
      <div className="mb-6 flex space-x-4">
        <div className="flex gap-2 items-center">
          {
            blogTagsList.map((tag) => (
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
