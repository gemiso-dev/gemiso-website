/**
 * 구조화 데이터(JSON-LD, schema.org) 빌더 — 단일 소스.
 *
 * - 페이지에 실제로 표시되는 정보만 넣는다(구조화 데이터는 화면 내용과 일치해야 한다).
 * - URL은 운영 절대 URL(SITE_URL) 기준. basePath(asset())는 붙이지 않는다.
 * - 회사(Organization)는 @id로 한 번 정의하고, 다른 노드는 @id로 참조한다.
 */
import { COMPANY, SITE_URL } from "@/components/site-config";
import { SOLUTION_SEO, type Solution } from "@/components/solutions-data";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

type JsonLd = Record<string, unknown>;

const abs = (path: string) => `${SITE_URL}${path}`;

/** 회사 + 웹사이트(전 페이지 공통, 루트 레이아웃에서 출력). */
export function siteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "제머나이소프트",
        legalName: COMPANY.name,
        alternateName: ["GEMISO", "Geminisoft", "제미소"],
        url: abs("/"),
        logo: abs("/assets/geminisoft-logo.png"),
        description:
          "방송·미디어 전문 소프트웨어 기업. 미디어 자산 관리(MAM), 뉴스룸(NRCS), 자동 송출(APC), 라디오, AI 영상 분석, 콘텐츠 아카이브·배포 솔루션을 개발합니다.",
        email: COMPANY.email,
        telephone: COMPANY.telHref.replace(/^tel:/, ""),
        address: {
          "@type": "PostalAddress",
          streetAddress: "월드컵북로 402",
          addressLocality: "마포구",
          addressRegion: "서울특별시",
          postalCode: "03925",
          addressCountry: "KR",
        },
        sameAs: ["https://www.gemiso.com/"],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: abs("/"),
        name: "GEMISO",
        inLanguage: "ko-KR",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/** 솔루션 상세 — 소프트웨어 제품. */
export function softwareJsonLd(s: Solution): JsonLd {
  const seo = SOLUTION_SEO[s.id];
  const url = abs(`/solutions/${s.id}/`);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: s.name,
    url,
    description: seo?.description ?? s.desc,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: seo?.category ?? s.ko,
    ...(s.image ? { image: abs(s.image) } : {}),
    featureList: s.features.map((f) => f.t),
    publisher: { "@id": ORG_ID },
  };
}

/** 브레드크럼 — 마지막 항목 외에는 URL이 있어야 한다. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}
