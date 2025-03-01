"use client";
import SelectPrimary from "@/components/tags/select/select-primary";
import React from "react";

type Props = {};

const BlogFilter = (props: Props) => {
  return (
    <div>
      <div className="mb-6 flex space-x-4">
        

        <select
          className="p-2 border rounded"
          onChange={(e) =>
            (window.location.href = `/blog?sortBy=${e.target.value}`)
          }
        >
          <option value="newest">Mới nhất</option>
          <option value="popular">Phổ biến nhất</option>
        </select>
      </div>
    </div>
  );
};

export default BlogFilter;
