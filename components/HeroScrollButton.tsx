"use client";

/**
 * 히어로 하단 스크롤 화살표.
 * 클릭 시 스테이트먼트 하이라이트 애니메이션이 "막 완료되는" 지점(p=1)으로 스크롤한다.
 * (ScrollHighlightText의 완료 조건: 문장 top이 뷰포트 25% 지점에 도달)
 */
export default function HeroScrollButton() {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const vh = window.innerHeight || 1;
    const textEl = document.querySelector<HTMLElement>(".gem-statement__text");
    let target: number;
    if (textEl) {
      // 하이라이트 완료 지점: 문장 top === vh*0.25
      target = textEl.getBoundingClientRect().top + window.scrollY - vh * 0.25;
    } else {
      const sec = document.getElementById("statement");
      target = sec
        ? sec.getBoundingClientRect().top + window.scrollY
        : window.scrollY + vh;
    }
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
