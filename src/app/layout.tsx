import type { Metadata } from "next";
import "@/style/css/globals.css";
import HeaderHome from "@/components/common/header-home";
import { geistMono, geistSans } from "@/style/fonts/fonts";
import { Analytics } from "@vercel/analytics/react"
export const metadata: Metadata = {
  title: "Ôn tập là dễ",
  description: "Luyện đề nào các bạn ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary-background text-primary`}
      >
        <HeaderHome />
        <Analytics />
        <div className="mt-[64px]">
        {children}
        </div>
      </body>
    </html>
  );
}
