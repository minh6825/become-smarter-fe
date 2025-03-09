import { fetchBlogList, IBlog } from "@/api/blog/blogs.rest";
import { NEXT_PUBLIC_CLIENT } from "@/assets/constant";
import BlogsPage from "@/section/blog";
import { Metadata } from "next";
import React from "react";
import NotFound from "../not-found";
import { fetchBlogTagsList, IBlogTag } from "@/api/blog-tags/blog-tags.rest";

export const revalidate = 60;

// SEO Metadata function
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Danh sách bài viết | Your Website",
    description: "Khám phá những bài viết mới nhất về lập trình, công nghệ và nhiều chủ đề hấp dẫn khác.",
    openGraph: {
      title: "Danh sách bài viết | Your Website",
      description: "Khám phá những bài viết mới nhất về lập trình, công nghệ và nhiều chủ đề hấp dẫn khác.",
      url: `${NEXT_PUBLIC_CLIENT}/blog`,
      type: "website",
      images: [
        {
          url: `https://www.ontaplade.com/logo.png`,
          width: 1200,
          height: 630,
          alt: "Danh sách bài viết",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Danh sách bài viết | Your Website",
      description: "Khám phá những bài viết mới nhất về lập trình, công nghệ và nhiều chủ đề hấp dẫn khác.",
      images: ["https://www.ontaplade.com/logo.png"],
    },
  };
}

const BlogListPage = async ( {
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {

  const searchParamsFinal = await Promise.resolve(searchParams);
  const currentPage = searchParamsFinal?.page ? Number(searchParamsFinal?.page) : 1;
  const take = searchParamsFinal?.take ? Number(searchParamsFinal?.take) : 12;
  const tagIds = searchParamsFinal?.tagIds ? searchParamsFinal?.tagIds : '';

  let blogs: IBlog[] = [];
  let blogTagsList:IBlogTag[] = [] 
  let total = 0
  try {
    const data = (await fetchBlogList({ page: currentPage, take: take, tagIds: tagIds }));
    const dataTagList = await fetchBlogTagsList({page: 1, limit: 2000})
    blogTagsList = dataTagList.blogTag
    total = data.total;
    blogs = data.blogs;
  } catch (error) {
    return <NotFound />
  }

  return (
    <main>
      <BlogsPage data={blogs} page={currentPage} total={total} take={take} blogTagsList={blogTagsList} />
      {/* Thêm structured data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Danh sách bài viết",
            "description": "Khám phá những bài viết mới nhất về lập trình, công nghệ và nhiều chủ đề hấp dẫn khác.",
            "url": `${NEXT_PUBLIC_CLIENT}/blog`,
            "hasPart": blogs.map((blog:any) => ({
              "@type": "BlogPosting",
              "headline": blog.title,
              "datePublished": blog.created_at,
              "dateModified": blog.updated_at,
              "author": {
                "@type": "Person",
                "name": "Your Author Name",
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${NEXT_PUBLIC_CLIENT}/blog/${blog.blog_id}`,
              },
            })),
          }),
        }}
      />
    </main>
  );
};

export default BlogListPage;
