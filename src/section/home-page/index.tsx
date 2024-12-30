import { div } from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const LadingPage = (props: Props) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-primary">
            Nền Tảng Quản Lý Bộ Đề Tốt Nhất
          </h1>
          <p className="text-lg  mb-8">
            Ôn tập là dễ giúp bạn tạo, quản lý và chia sẻ bộ đề một cách nhanh chóng
            và dễ dàng.
          </p>
          <Link
            href="/list-quiz"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Bắt Đầu Ngay
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tính Năng Nổi Bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="shadow-lg border p-6 rounded-lg text-center bg-primary-background">
              <h3 className="text-xl font-bold mb-4">Tạo Bộ Đề Dễ Dàng</h3>
              <p className="text-primary">
                Dễ dàng tạo các bộ đề phù hợp với mục đích học tập và luyện thi.
              </p>
            </div>
            <div className=" shadow-lg border p-6 rounded-lg text-center bg-primary-background">
              <h3 className="text-xl font-bold mb-4">Quản Lý Hiệu Quả</h3>
              <p className="text-primary">
                Sắp xếp, chỉnh sửa và theo dõi bộ đề một cách chuyên nghiệp.
              </p>
            </div>
            <div className=" shadow-lg p-6 border rounded-lg text-center bg-primary-background">
              <h3 className="text-xl font-bold mb-4">Chia Sẻ Dễ Dàng</h3>
              <p className="text-primary">
                Cộng tác với bạn bè, học viên hoặc đồng nghiệp một cách tiện
                lợi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold  mb-6">Về ôn tập là dễ</h2>
          <p className="text-lg text-primary">
            Ôn tập là dễ là nền tảng được thiết kế để hỗ trợ học viên và giáo viên
            trong việc quản lý tài nguyên học tập. Với giao diện thân thiện và
            công cụ mạnh mẽ, chúng tôi cam kết mang lại trải nghiệm tuyệt vời.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Liên Hệ</h2>
          <p className="text-lg text-primary mb-8">
            Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi ngay!
          </p>
          <a
            href="mailto:minhnqdeveloper@gmail.com"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Gửi Email
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-white">
        <div className="container mx-auto text-center">
          <div className="mb-4">
        <Image src="/logo.png" alt="Ôn tập là dễ" className="mx-auto mb-4" width={500} height={500} style={{ width: '100px' }} />
        <h3 className="text-xl font-bold">Ôn tập là dễ</h3>
        <p className="text-sm">
          Nền tảng quản lý bộ đề tốt nhất cho học viên và giáo viên.
        </p>
          </div>
          <div className="flex justify-center space-x-4 mb-4">
        <a href="#" className="hover:text-gray-400 transition">Trang Chủ</a>
        <a href="#features" className="hover:text-gray-400 transition">Tính Năng</a>
        <a href="#about" className="hover:text-gray-400 transition">Về Chúng Tôi</a>
        <a href="#contact" className="hover:text-gray-400 transition">Liên Hệ</a>
          </div>
          <div className="mb-4">
        <a href="mailto:minhnqdeveloper@gmail.com" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Gửi Email
        </a>
          </div>
          <p className="text-sm">
        &copy; {new Date().getFullYear()} Ôn tập là dễ. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LadingPage;
