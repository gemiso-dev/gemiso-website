import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/components/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "제미소 | GEMISO — 방송을 위한 디지털 미디어 관리 플랫폼",
    template: "%s | GEMISO",
  },
  description:
    "Geminisoft는 인제스트, 아카이브, 뉴스룸, 자동 송출까지 방송을 위한 미디어 솔루션을 직접 개발하고 보유합니다.",
  openGraph: {
    type: "website",
    siteName: "GEMISO",
    locale: "ko_KR",
    images: [{ url: "/assets/geminisoft-logo.png" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* 폰트: Pretendard(본문 한글) + Montserrat(영문 디스플레이) + IBM Plex Mono(모노 캡션) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
