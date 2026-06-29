import type { MetadataRoute } from "next";
import { SITE_URL } from "@/components/site-config";

// output: "export"에서 정적 robots.txt로 출력한다.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
