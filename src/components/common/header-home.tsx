"use client";
import React, { useEffect, useState } from "react";
import Drawer from "./header-drawer";
import AuthForm from "../../section/auth/auth-form";
import { getUserInfoApi } from "@/api/user/user.rest";
import UserInfo from "../../section/auth/user-info";
import Link from "next/link";

const HeaderHome = () => {
  const [userInfo, setUserInfo] = useState();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const handleGetUserInfo = async () => {
      try {
        const res = await getUserInfoApi();
        if (res.success) {
          setUserInfo(res.data);
        }
      } catch (error) {}
    };
    setIsClient(true);
    handleGetUserInfo();
  }, []);

  if (!isClient) return null;
  return (
    <header className="h-[64px] top-0 fixed z-[100] w-full bg-primary-background  border-b border-primary/100 flex items-center px-[2%]">
      <Drawer />
        <h2 className="text-2xl font-bold">
          <Link href={'/'}>Ôn tập là dễ .com</Link>
        </h2>
      <div className="ml-auto flex justify-between items-center px-4">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link className="hover:underline" href={"/list-quiz"}>Danh sách bài test</Link>
            </li>
            <li>
              <a href="#features" className="hover:underline">
                Tính Năng
              </a>
            </li>
            <li>
              <a href="#about" className="hover:underline">
                Về Chúng Tôi
              </a>
            </li>
            <li>
              <Link href="/history" className="hover:underline">
                Lịch sử làm bài
              </Link>
            </li>
           
          </ul>
        </nav>
      </div>
      <div className="flex gap-4">
        {userInfo ? <UserInfo userInfo={userInfo} /> : <AuthForm />}
      </div>
    </header>
  );
};

export default HeaderHome;
