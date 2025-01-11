import { fetchBlogList } from "@/api/blog/blogs.rest";
import BlogsPage from "@/section/blog";
import React from "react";

type Props = {};

export const revalidate = 10;

const page = async (props: Props) => {
  const data = await fetchBlogList();
  return (
    <div>
      <BlogsPage data={data} />
    </div>
  );
};

export default page;
