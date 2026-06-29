/**
 * 페이지 SEO 메타데이터 헬퍼.
 *
 * 각 페이지가 openGraph/twitter 전체 필드를 반복 작성하지 않도록 단일 소스로 모은다.
 * (Next.js는 openGraph를 레이아웃→페이지로 깊은 병합하지 않으므로, 페이지가
 *  openGraph를 정의하면 siteName·locale 등 기본값이 사라진다 → 매번 완전한 객체를 만든다.)
 *
 * canonical·OG 경로는 asset()(basePath 부착)를 쓰지 않는다. layout의 metadataBase(=SITE_URL)가
 * 순수 경로("/...")를 운영 절대 URL로 해석한다.
 */
import type { Metadata } from "next";

const SITE_NAME = "GEMISO";
/** 임시 OG 대표 이미지(로고). 추후 1200×630 전용 이미지로 교체. */
const DEFAULT_OG_IMAGE = "/assets/geminisoft-logo.png";

type PageMeta = {
  /** 페이지 고유 제목(접미사 "| GEMISO" 없이) — 예: "연혁" */
  title: string;
  description: string;
  /** 트레일링 슬래시 포함 경로 — 예: "/history/" */
  path: string;
  /** 페이지 전용 OG 이미지(순수 경로). 없으면 기본 로고. */
  image?: string;
};

export function pageMetadata({ title, description, path, image }: PageMeta): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const img = image ?? DEFAULT_OG_IMAGE;
  return {
    // absolute: 루트 layout의 title.template("%s | GEMISO") 재적용을 막아 접미사 중복을 방지.
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "ko_KR",
      url: path,
      title: fullTitle,
      description,
      images: [{ url: img }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img],
    },
  };
}
