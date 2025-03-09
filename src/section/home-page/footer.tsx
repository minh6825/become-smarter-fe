import Image from "next/image";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-gray-800 py-8 mt-10 text-white">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <Image
            src="/logo.png"
            alt="Ôn tập là dễ"
            className="mx-auto mb-4"
            width={500}
            height={500}
            style={{ width: "100px" }}
          />
          <h3 className="text-xl font-bold">Ôn tập là dễ</h3>
          <p className="text-sm">
            Nền tảng thi trắc nghiệm số 1 Việt Nam giúp bạn tạo, quản lý và chia
            sẻ bộ đề một cách nhanh chóng và dễ dàng.
          </p>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="hover:text-gray-400 transition">
            Trang Chủ
          </a>
          <a href="#features" className="hover:text-gray-400 transition">
            Tính Năng
          </a>
          <a href="#about" className="hover:text-gray-400 transition">
            Về Chúng Tôi
          </a>
          <a href="#contact" className="hover:text-gray-400 transition">
            Liên Hệ
          </a>
        </div>
        <div className="mb-4">
          <a
            href="mailto:minhnqdeveloper@gmail.com"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Gửi Email
          </a>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Ôn tập là dễ. Tất cả các quyền được
          bảo lưu.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
