export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/";

  return (
    <main className="hero">
      <div className="hero__inner">
        <p className="hero__eyebrow">GEMISO</p>
        <h1 className="hero__title">제미소 홈페이지</h1>
        <p className="hero__desc">
          로컬 개발 · GitHub Pages 스테이징 · Cloudflare 운영 배포가 분리된
          Next.js 정적 사이트입니다.
        </p>
        <div className="hero__env">
          <span className="badge">base path: {basePath}</span>
        </div>
      </div>
    </main>
  );
}
