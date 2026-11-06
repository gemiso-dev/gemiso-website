import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/components/site-config";
import { siteJsonLd } from "@/components/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "제머나이소프트(GEMISO) | 방송 MAM·NRCS·APC·AI 미디어 솔루션",
    template: "%s | GEMISO",
  },
  description:
    "제머나이소프트(GEMISO)는 방송·미디어 전문 소프트웨어 기업입니다. 미디어 자산 관리(MAM), 뉴스룸(NRCS), 자동 송출(APC), AI 영상 분석, 콘텐츠 아카이브·배포 솔루션을 직접 개발합니다.",
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
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        <JsonLd data={siteJsonLd()} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
