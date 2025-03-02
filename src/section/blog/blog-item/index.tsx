import { IBlog } from "@/api/blog/blogs.rest";
import WrapBox from "@/components/common/wrap-box";
import React from "react";
import "@/components/tags/tiptap/styles.scss";
import "@/components/tags/tiptap/style.scss";
import Footer from "@/section/home-page/footer";
import moment from "moment";
type Props = {
  data: IBlog;
};

const BlogDetailPage = ({ data }: Props) => {
  return (
    <>
      <div
        className="min-h-screen bg-primary-foreground text-root-text flex flex-col"
        style={{ backgroundColor: "var(--root-background)", color: "var(--root-text)" }}
      >
        <WrapBox
          className={`tiptap-wrap rounded-md shadow-md bg-primary-background`}
        >
          {data && (
            <div className="mb-6 p-6">
              {/* Tiêu đề bài viết */}
              <h1
                className="font-bold text-center !text-4xl leading-tight mb-6"
                style={{ color: "var(--primary)" }}
              >
                {data.title}
              </h1>

              {/* Ngày tạo bài viết */}
              <p
                className="!text-base text-center italic mb-4"
                style={{ color: "var(--root-text)" }}
              >
                Published on {moment(data.created_at).format("MMMM DD, YYYY")}
              </p>

              <p className="text-center">
                {data.tags.map((tag) => (
                  <span
                    key={tag.tag_id}
                    className="bg-primary-root-mint text-white px-2 py-1 rounded-md mr-2"
                  >
                    {tag.name}
                  </span>
                ))}
              </p>

              <div className="pt-4 text-center italic">
                View: {data.view_count}
              </div>

              {/* Nội dung bài viết */}
              <div
                className="text-lg leading-relaxed tiptap tiptap-wrap"
                style={{ color: "var(--root-text)" }}
                dangerouslySetInnerHTML={{ __html: data.content }}
              ></div>
            </div>
          )}
          
        </WrapBox>
          <WrapBox>
        {/* Bài viết liên quan */}
        <div className="my-10">
          <h2
            className="text-2xl text-center font-semibold mb-4"
            style={{ color: "var(--primary)" }}
          >
            Related Articles
          </h2>
          <div className="grid grid-cols-1 min-h-[250px] sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              className="p-4 border rounded-md text-center shadow-md hover:shadow-lg transition-shadow duration-300"
              style={{
                backgroundColor: "var(--primary-foreground)",
                color: "var(--root-text)",
              }}
            >
              <h3 className="text-xl font-bold mb-2">
                How to Improve Your Blog Design
              </h3>
              <p className="text-sm text-gray-600">
                Learn tips and tricks to enhance your blog's appearance and usability.
              </p>
            </div>
            <div
              className="p-4 border text-center rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
              style={{
                backgroundColor: "var(--primary-foreground)",
                color: "var(--root-text)",
              }}
            >
              <h3 className="text-xl font-bold mb-2">
                Top Blogging Tools in 2024
              </h3>
              <p className="text-sm text-gray-600">
                Discover the best tools to elevate your blogging experience.
              </p>
            </div>
            <div
              className="p-4 border text-center rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
              style={{
                backgroundColor: "var(--primary-foreground)",
                color: "var(--root-text)",
              }}
            >
              <h3 className="text-xl font-bold mb-2">
                Writing Content that Converts
              </h3>
              <p className="text-sm text-gray-600">
                Learn the art of creating engaging and effective blog content.
              </p>
            </div>
          </div>
        </div>
          </WrapBox>
   

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default BlogDetailPage;
