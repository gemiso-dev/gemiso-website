import Link from "next/link";
import Reveal from "@/components/Reveal";
import { HISTORY_DETAIL } from "@/components/history-detail-data";
import { pageMetadata } from "@/components/seo";

export const metadata = pageMetadata({
  title: "상세 연혁",
  description:
    "2002년 설립 이후 Geminisoft의 구축·개발·계약 실적을 연도별·월별로 모두 담은 상세 연혁.",
  path: "/history/detail/",
});

export default function HistoryDetailPage() {
  // 데이터는 연대순(오래된 → 최신). 화면에는 최신순으로 뒤집어 보여준다.
  const years = HISTORY_DETAIL.slice().reverse();
  const allYears = HISTORY_DETAIL.map((y) => Number(y.year));
  const latest = Math.max(...allYears);
  const earliest = Math.min(...allYears);
  const total = HISTORY_DETAIL.reduce((n, y) => n + y.items.length, 0);

  return (
    <>
      {/* 브레드크럼 */}
      <nav className="sol-breadcrumb" aria-label="위치">
        <div className="gem-container sol-breadcrumb__inner">
          <Link href="/">홈</Link>
          <span className="gem-sep">|</span>
          <Link href="/#solutions">회사소개</Link>
          <span className="gem-sep">|</span>
          <Link href="/history">연혁</Link>
          <span className="gem-sep">|</span>
          <span className="sol-breadcrumb__current">상세 연혁</span>
        </div>
      </nav>

      {/* 히어로 */}
      <section className="hist-hero">
        <div className="gem-container hist-hero__inner">
          <Reveal className="hist-hero__intro">
            <div className="hist-eyebrow">
              <span className="hist-eyebrow__tick" />
              <span className="hist-eyebrow__label">회사소개 · 상세 연혁</span>
            </div>
            <h1 className="hist-hero__title">걸어온 길, 빠짐없이</h1>
            <p className="hist-hero__desc">
              2002년 설립 이후 이어온 구축·개발·계약 실적을 연도별·월별로 모두
              모았습니다. 주요 이정표만 보려면{" "}
              <Link href="/history" className="hist-inline-link">
                연혁
              </Link>{" "}
              페이지를 참고하세요.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 상세 타임라인 */}
      <section className="hist-timeline">
        <div className="hist-timeline__inner">
          <Reveal className="hist-eyebrow hist-detail__head">
            <span className="hist-eyebrow__tick" />
            <span className="hist-eyebrow__label hist-eyebrow__label--muted">
              전체 실적 · {latest}–{earliest} · 총 {total}건
            </span>
          </Reveal>

          <div className="hist-detail">
            {years.map((y, yi) => {
              const items = y.items.slice().reverse();
              return (
                <Reveal as="div" key={y.year} className="tl-row hist-detail__row">
                  <div className="tl-year">{y.year}</div>
                  <div className="tl-rail">
                    <span
                      className={`tl-rail__line${
                        yi === years.length - 1 ? " tl-rail__line--stub" : ""
                      }`}
                    />
                    <span className="tl-dot tl-dot--minor" />
                  </div>
                  <div className="tl-body">
                    <ul className="hist-detail__list">
                      {items.map((it, i) => (
                        <li className="hist-detail__item" key={`${it.month ?? ""}-${i}`}>
                          <span className="hist-detail__month">
                            {it.month ? `${it.month}월` : ""}
                          </span>
                          <span className="hist-detail__text">{it.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="hist-foot">
            <span className="hist-foot__mark">↳</span>
            <Link href="/history" className="hist-inline-link">
              ← 주요 연혁으로 돌아가기
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA (accent 배경) — 솔루션 페이지와 동일한 스타일 */}
      <section className="sol-cta">
        <Reveal className="gem-container sol-cta__grid">
          <div>
            <h2 className="sol-cta__title">다음 장을 함께 쓰시겠어요?</h2>
            <p className="sol-cta__desc">
              방송 워크플로우를 알려주시면, 저희 팀이 가장 알맞은 솔루션을 함께
              찾아드립니다.
            </p>
          </div>
          <div className="sol-cta__actions">
            <Link href="/#contact" className="gem-btn gem-btn--invert">
              문의하기
            </Link>
            <Link
              href="/#solutions"
              className="gem-btn gem-btn--underline-light"
            >
              솔루션 살펴보기 →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
