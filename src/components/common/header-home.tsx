"use client";
import React, { useEffect, useState } from "react";
import Drawer from "./header-drawer";
import AuthForm from "../../section/auth/auth-form";
import { getUserInfoApi } from "@/api/user/user.rest";
import UserInfo from "../../section/auth/user-info";
import Link from "next/link";
import Image from "next/image";
import { FcSettings } from "react-icons/fc";
import { MdNotificationAdd, MdNotifications } from "react-icons/md";

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
    <header className="h-header top-0 fixed shadow-lg z-[100] w-full bg-primary-background max-md:justify-between border-b border-border-color flex items-center px-[2%]">
      <Drawer />
        <h2 className="text-2xl font-bold flex  items-center gap-2">
          <Image src={'/logo.png'} width={2000} height={2000} className="rounded-full cursor-pointer select-none w-[50px] h-[50px] max-md:h-[40px] max-md:w-[40px]" alt="logo"/>
          <Link href={'/'}>Ôn tập là dễ <span className="max-md:hidden">.com</span></Link>
        </h2>
      <div className="ml-auto mr-10 flex justify-between items-center max-md:hidden px-4">
        <nav className="font-bold text-lg">
          <ul className="flex space-x-4">
            <li>
              <Link className="hover:underline hover:text-primary-blue" href={"/list-quiz"}>Bài test</Link>
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
            <li>
                <Link href="/blog" className="hover:underline hover:text-primary-blue">
                  Bài viết
                </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-4 mr-4">
        <button><MdNotifications size={24}/></button>
        <button className="max-md:hidden"><FcSettings size={24}/></button>
      </div>
      <div className="flex gap-4">
        {userInfo ? <UserInfo userInfo={userInfo} /> : <AuthForm />}
      </div>
    </header>
  );
};

export default HeaderHome;
