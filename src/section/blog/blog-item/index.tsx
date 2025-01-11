import { IBlog } from "@/api/blog/blogs.rest";
import WrapBox from "@/components/common/wrap-box";
import React from "react";
import '@/components/tags/tiptap/style.scss'
import styles from '@/components/tags/tiptap/style.module.scss';

type Props = {
  data: IBlog;
};

const BlogDetailPage = ({ data }: Props) => {
  return (
    <WrapBox className={`tiptap-wrap border rounded-md ${styles.tiptap}`}>
      {data && (
        <div className="mb-6 p-4 ">
          <h2 className="text-2xl font-bold text-center mb-10">{data.title}</h2>
          <p className="text-sm ">
            {new Date(data.created_at).toLocaleDateString()}
          </p>
          <p
            className="text-primary mb-4"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></p>
        </div>
      )}
    </WrapBox>
  );
};

export default BlogDetailPage;
