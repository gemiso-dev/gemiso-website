/**
 * 사이트 공통 설정 — 내비게이션/푸터/회사 정보.
 * 헤더·푸터 등 공통 레이아웃이 이 데이터를 공유한다.
 */

import { SOLUTION_NAV } from "@/components/solutions-data";
import { TECHNOLOGY_NAV } from "@/components/technology-data";

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const PRIMARY_NAV: NavItem[] = [
  {
    label: "회사소개",
    href: "/mission/",
    children: [
      { label: "미션", href: "/mission/" },
      { label: "연혁", href: "/history/" },
      { label: "인증 현황", href: "/certification/" },
      { label: "고객사", href: "/customers/" },
    ],
  },
  {
    label: "솔루션",
    href: SOLUTION_NAV[0].href,
    children: SOLUTION_NAV,
  },
  {
    label: "보유기술",
    href: "/technology/",
    children: TECHNOLOGY_NAV,
  },
  { label: "뉴스", href: "/news/" },
  {
    label: "고객지원",
    href: "/support/",
    children: [
      { label: "고객지원", href: "/support/" },
      { label: "파트너", href: "/partners/" },
    ],
  },
];

/** 운영(Cloudflare) 절대 URL 기준. canonical·sitemap·OG 절대경로에 사용한다.
 *  basePath와 무관하게 항상 운영 도메인을 가리킨다(미리보기에서도 canonical은 운영을 향함). */
export const SITE_URL = "https://www.gemiso.co.kr";

export const COMPANY = {
  name: "(주) 제머나이소프트",
  location: "대한민국 서울",
  tel: "+82‑2‑857‑1101",
  telHref: "tel:+82285711101",
  fax: "+82‑2‑6009‑9031",
  email: "sales@gemiso.com",
  addressLines: ["서울특별시 마포구", "월드컵북로 402 (03925)"],
};

export const FOOTER_COLUMNS: { heading: string; links: NavItem[] }[] = [
  {
    heading: "회사",
    links: [
      { label: "미션", href: "/mission/" },
      { label: "연혁", href: "/history/" },
      { label: "인증 현황", href: "/certification/" },
      { label: "고객사", href: "/customers/" },
    ],
  },
  {
    heading: "솔루션",
    links: SOLUTION_NAV,
  },
  {
    heading: "고객지원",
    links: [
      { label: "고객지원", href: "/support/" },
      { label: "파트너", href: "/partners/" },
      { label: "뉴스", href: "/news/" },
    ],
  },
];

/** /public 자산 경로에 basePath를 붙인다(GitHub Pages 하위 경로 대응). */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
