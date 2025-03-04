import { Analytics } from "@vercel/analytics/react"
import type { Metadata, Viewport } from "next";
import "@/style/css/globals.css";
import HeaderHome from "@/components/common/header-home";
import { geistMono, geistSans } from "@/style/fonts/fonts";
import '@/style/css/scroll.css'
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Ôn tập là dễ",
  description: "Luyện đề nhanh chóng, dễ dàng và hiệu quả. Web của chúng tôi cung cấp cho bạn những bộ đề ôn tập đa dạng, giúp bạn luyện tập và cải thiện kỹ năng một cách tiện lợi. Với các bài tập được thiết kế khoa học và phù hợp với nhiều cấp độ, bạn sẽ có cơ hội làm quen với các dạng đề thi, kiểm tra và củng cố kiến thức mọi lúc mọi nơi. Hãy bắt đầu ôn tập ngay hôm nay để nâng cao kết quả học tập của bạn!",
  keywords: [
    "On tap la de",
    "Ôn tập là dễ",
    "Ôn tập",
    "Luyện thi",
    "Học tập",
    "Quiz",
    "Thi thử",
    "Luyện đề",
    "Ôn tập là dễ blog"
  ],
  authors: [{url: "Nhóm phát triển Quizizz"}],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://www.ontaplade.com",
    title: "Ôn tập là dễ",
    description: "Luyện đề nhanh chóng, dễ dàng và hiệu quả. Web của chúng tôi cung cấp cho bạn những bộ đề ôn tập đa dạng, giúp bạn luyện tập và cải thiện kỹ năng một cách tiện lợi. Với các bài tập được thiết kế khoa học và phù hợp với nhiều cấp độ, bạn sẽ có cơ hội làm quen với các dạng đề thi, kiểm tra và củng cố kiến thức mọi lúc mọi nơi. Hãy bắt đầu ôn tập ngay hôm nay để nâng cao kết quả học tập của bạn!",
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
    description: "Luyện đề nhanh chóng, dễ dàng và hiệu quả. Web của chúng tôi cung cấp cho bạn những bộ đề ôn tập đa dạng, giúp bạn luyện tập và cải thiện kỹ năng một cách tiện lợi. Với các bài tập được thiết kế khoa học và phù hợp với nhiều cấp độ, bạn sẽ có cơ hội làm quen với các dạng đề thi, kiểm tra và củng cố kiến thức mọi lúc mọi nơi. Hãy bắt đầu ôn tập ngay hôm nay để nâng cao kết quả học tập của bạn!",
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
        <meta property="og:description" content="Luyện đề nhanh chóng, dễ dàng và hiệu quả. Web của chúng tôi cung cấp cho bạn những bộ đề ôn tập đa dạng, giúp bạn luyện tập và cải thiện kỹ năng một cách tiện lợi. Với các bài tập được thiết kế khoa học và phù hợp với nhiều cấp độ, bạn sẽ có cơ hội làm quen với các dạng đề thi, kiểm tra và củng cố kiến thức mọi lúc mọi nơi. Hãy bắt đầu ôn tập ngay hôm nay để nâng cao kết quả học tập của bạn!" />
        <meta property="og:site_name" content="Ôn tập là dễ" />
        <meta property="og:image" content="https://www.ontaplade.com/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Ôn tập là dễ - Thumbnail" />
        <meta name="twitter:card" content="https://www.ontaplade.com/logo.png" />
        <meta name="twitter:site" content="@ontaplade" />
        <meta name="twitter:creator" content="@ontaplade" />
        <meta name="twitter:title" content="Ôn tập là dễ" />
        <meta name="twitter:description" content="Luyện đề nhanh chóng, dễ dàng và hiệu quả. Web của chúng tôi cung cấp cho bạn những bộ đề ôn tập đa dạng, giúp bạn luyện tập và cải thiện kỹ năng một cách tiện lợi. Với các bài tập được thiết kế khoa học và phù hợp với nhiều cấp độ, bạn sẽ có cơ hội làm quen với các dạng đề thi, kiểm tra và củng cố kiến thức mọi lúc mọi nơi. Hãy bắt đầu ôn tập ngay hôm nay để nâng cao kết quả học tập của bạn!" />
        <meta name="twitter:image" content="https://www.ontaplade.com/logo.png" />
        <link rel="shortcut icon" type="image/x-icon" href="https://www.ontaplade.com/favicon.ico"></link>
        </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary-background text-primary`}
      >
        <HeaderHome />
        <Analytics />
        <SpeedInsights />
        <div className="mt-header ">
          {children}
        </div>
      </body>
    </html>
  );
}
