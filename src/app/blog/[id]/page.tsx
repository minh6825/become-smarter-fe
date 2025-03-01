import { fetchBlog, IBlog } from "@/api/blog/blogs.rest";
import { NEXT_PUBLIC_CLIENT } from "@/assets/constant";
import BlogDetailPage from "@/section/blog/blog-item";
import moment from "moment";
import { Metadata } from "next";
import React from "react";

type PageProps = {
  params: Promise<{ id: string }>;
};
export const revalidate = 10;

// SEO Metadata function
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } =  await params;
  console.log(id)
  const data:IBlog = await fetchBlog(id);

  return {
    title: data.title,
    description: data.content.slice(0, 160), // Giới hạn mô tả để hiển thị tốt trên Google
    openGraph: {
      title: data.title,
      description: data.content.slice(0, 160),
      url: `${NEXT_PUBLIC_CLIENT}/blog/${id}`,
      type: "article",
      publishedTime: moment(data.created_at).format("YYYY-MM-DDTHH:mm:ssZ"),
      modifiedTime: moment(data.updated_at).format("YYYY-MM-DDTHH:mm:ssZ"),
      tags: data.tags.map(tag => tag.name), // Nếu có tags
      images: [
        {
          url: `https://www.ontaplade.com/logo.png`, // Thay thế bằng URL ảnh thực tế
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.content.slice(0, 160),
      images: [`https://www.ontaplade.com/logo.png`],
    },
  };
}

const BlogPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const data = await fetchBlog(id);
  console.log(data)
  return (
    <main>
      <h1>{data.title}</h1>
      <BlogDetailPage data={data} />
      {/* Thêm structured data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": data.title,
            "datePublished": data.created_at,
            "dateModified": data.updated_at,
            "author": {
              "@type": "Person",
              "name": "Nguyễn Quang Minh",
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${NEXT_PUBLIC_CLIENT}/blog/${id}`,
            },
          }),
        }}
      />
    </main>
  );
};

export default BlogPage;
