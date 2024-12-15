import { Analytics } from "@vercel/analytics/react"
import type { Metadata, Viewport } from "next";
import "@/style/css/globals.css";
import HeaderHome from "@/components/common/header-home";
import { geistMono, geistSans } from "@/style/fonts/fonts";
import '@/style/css/scroll.css'

export const metadata: Metadata = {
  title: "Ôn tập là dễ",
  description: "Luyện đề nào các bạn ui",
  keywords: [
    "On tap la de",
    "Ôn tập là dễ",
    "Ôn tập",
    "Luyện thi",
    "Học tập",
    "Quiz",
    "Thi thử",
    "Luyện đề",
  ],
  authors: [{url: "Nhóm phát triển Quizizz"}],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://www.ontaplade.com",
    title: "Ôn tập là dễ",
    description: "Luyện đề nào các bạn ui",
    siteName: "Ôn tập là dễ",
    images: [
      {
        url: "https://www.ontaplade.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Ôn tập là dễ - Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    creator: "@yourtwitterhandle",
    title: "Ôn tập là dễ",
    description: "Luyện đề nào các bạn ui",
    images: ["https://www.ontaplade.com/logo.png"],
  },
};
 
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Ôn tập, Luyện thi, Học tập, Quiz, Thi thử, Luyện đề" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:url" content="https://www.ontaplade.com" />
        <meta property="og:title" content="Ôn tập là dễ" />
        <meta property="og:description" content="Luyện đề nào các bạn ui" />
        <meta property="og:site_name" content="Ôn tập là dễ" />
        <meta property="og:image" content="https://www.ontaplade.com/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Ôn tập là dễ - Thumbnail" />
        <meta name="twitter:card" content="https://www.ontaplade.com/logo.png" />
        <meta name="twitter:site" content="@ontaplade" />
        <meta name="twitter:creator" content="@ontaplade" />
        <meta name="twitter:title" content="Ôn tập là dễ" />
        <meta name="twitter:description" content="Luyện đề nào các bạn ui" />
        <meta name="twitter:image" content="https://www.ontaplade.com/logo.png" />
        <link rel="shortcut icon" type="image/x-icon" href="https://www.ontaplade.com/favicon.ico"></link>
        </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary-background text-primary`}
      >
        <HeaderHome />
        <Analytics />
        <div className="mt-[64px] ">
          {children}
        </div>
      </body>
    </html>
  );
}
