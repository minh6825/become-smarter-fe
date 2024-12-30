"use client";
import React, { useEffect, useState } from "react";
import Drawer from "./header-drawer";
import AuthForm from "../../section/auth/auth-form";
import { getUserInfoApi } from "@/api/user/user.rest";
import UserInfo from "../../section/auth/user-info";
import Link from "next/link";
import Image from "next/image";

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
    <header className="h-[64px] top-0 fixed shadow-lg z-[100] w-full bg-primary-background max-md:justify-between border-b border-primary/100 flex items-center px-[2%]">
      <Drawer />
        <h2 className="text-2xl font-bold flex  items-center gap-2">
          <Image src={'/logo.png'} width={2000} height={2000} className="rounded-full cursor-pointer select-none w-[60px] h-[60px]" alt="logo"/>
          <Link href={'/'}>Ôn tập là dễ <span className="max-md:hidden">.com</span></Link>
        </h2>
      <div className="ml-auto flex justify-between items-center max-md:hidden px-4">
        <nav className="font-bold text-lg">
          <ul className="flex space-x-4">
            <li>
              <Link className="hover:underline hover:text-primary-blue" href={"/list-quiz"}>Danh sách bài test</Link>
            </li>
            <li>
            <Link href="/word-practice" className="hover:underline hover:text-primary-blue">
                Luyện từ vựng
              </Link>
            </li>
            <li>
              <Link href="/history" className="hover:underline hover:text-primary-blue">
                Lịch sử làm bài
              </Link>
            </li>
            <li>
              <Link href="/word-collection" className="hover:underline hover:text-primary-blue">
                Bộ từ vựng
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
