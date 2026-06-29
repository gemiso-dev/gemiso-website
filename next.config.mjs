/**
 * 정적 export 설정.
 *
 * - 로컬 개발 / Cloudflare Pages: base path 없음(도메인 루트로 서비스).
 * - GitHub Pages(프로젝트 사이트): /<repo> 하위 경로로 서비스되므로
 *   배포 워크플로(.github/workflows/deploy-github-pages.yml)에서
 *   빌드 시 PAGES_BASE_PATH=/<repo> 를 주입한다.
 */
const basePath = process.env.PAGES_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
