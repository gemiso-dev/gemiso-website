"use client";

/**
 * 히어로 하단 스크롤 화살표.
 * 클릭 시 스테이트먼트 섹션의 최상단이 sticky 헤더 바로 아래(화면 최상단)에
 * 정확히 맞도록 스크롤한다.
 */
export default function HeroScrollButton() {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const sec = document.getElementById("statement");
    if (!sec) return;
    const headerH =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--gem-header-h",
        ),
        10,
      ) || 0;
    const target = sec.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top: Math.max(0, Math.round(target)), behavior: "smooth" });
  };

  return (
    <a
      href="#statement"
      className="gem-hero__scroll"
      aria-label="아래로 스크롤"
      onClick={onClick}
    >
      <svg width="28" height="15" viewBox="0 0 28 15" fill="none" aria-hidden="true">
        <path
          d="M2 2 14 13 26 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
