import type { MetadataRoute } from "next";
import { SITE_URL } from "@/components/site-config";
import { SOLUTION_SLUGS } from "@/components/solutions-data";
import { NEWS_ARTICLES } from "@/components/news-data";

// output: "export"에서 정적 sitemap.xml로 출력한다.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/mission/",
    "/history/",
    "/history/detail/",
    "/certification/",
    "/customers/",
    "/news/",
    "/support/",
    "/partners/",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${SITE_URL}${p}`,
  }));

  const solutionEntries: MetadataRoute.Sitemap = SOLUTION_SLUGS.map((s) => ({
    url: `${SITE_URL}/solutions/${s}/`,
  }));

  const newsEntries: MetadataRoute.Sitemap = NEWS_ARTICLES.map((n) => ({
    url: `${SITE_URL}/news/${n.id}/`,
    // 발행일(YYYY.MM.DD)을 ISO(YYYY-MM-DD)로 변환해 신선도 신호로 사용.
    lastModified: n.date.replace(/\./g, "-"),
  }));

  return [...staticEntries, ...solutionEntries, ...newsEntries];
}
