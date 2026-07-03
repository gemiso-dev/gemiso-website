import Link from "next/link";
import Reveal from "@/components/Reveal";
import HistoryTimeline from "@/components/HistoryTimeline";
import { HISTORY_ERAS, HISTORY_STATS } from "@/components/history-data";
import { pageMetadata } from "@/components/seo";

export const metadata = pageMetadata({
  title: "연혁",
  description:
    "2002년 설립 이후 미디어 자산 관리부터 뉴스룸·아카이브·자동 송출, AI까지 — Geminisoft가 걸어온 길.",
  path: "/history/",
});

export default function HistoryPage() {
  // 데이터는 연대순(오래된 → 최신). 화면에는 최신순으로 뒤집어 보여준다.
  const count = String(HISTORY_ERAS.length).padStart(2, "0");
  const eras = HISTORY_ERAS.slice()
    .reverse()
    .map((era, ei) => {
      const items = era.items.slice().reverse();
      return {
        ...era,
        idx: String(ei + 1).padStart(2, "0"),
        count,
        items: items.map((it, i) => ({
          ...it,
          major: !!it.major,
          last: i === items.length - 1,
        })),
      };
    });

  return (
    <>
      {/* 브레드크럼 */}
      <nav className="sol-breadcrumb" aria-label="위치">
        <div className="gem-container sol-breadcrumb__inner">
          <Link href="/">홈</Link>
          <span className="gem-sep">|</span>
          <Link href="/#solutions">회사소개</Link>
          <span className="gem-sep">|</span>
          <span className="sol-breadcrumb__current">연혁</span>
        </div>
      </nav>

      {/* 히어로 */}
      <section className="hist-hero">
        <div className="gem-container hist-hero__inner">
          <Reveal className="hist-hero__intro">
            <div className="hist-eyebrow">
              <span className="hist-eyebrow__tick" />
              <span className="hist-eyebrow__label">회사소개 · 연혁</span>
            </div>
            <h1 className="hist-hero__title">Geminisoft가 걸어온 길</h1>
            <p className="hist-hero__desc">
              2002년 설립 이후, 미디어 자산 관리부터 뉴스룸·아카이브·자동 송출,
              그리고 AI까지 — 방송 미디어 기술을 직접 개발하며 고객과 함께 성장해
              왔습니다.
            </p>
          </Reveal>

          <Reveal as="div" className="hist-stats">
            {HISTORY_STATS.map((s) => (
              <div key={s.k} className="hist-stat">
                <div className="hist-stat__num">{s.v}</div>
                <div className="hist-stat__label">{s.k}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 타임라인 */}
      <section className="hist-timeline">
        <div className="hist-timeline__inner">
          <Reveal className="hist-eyebrow">
            <span className="hist-eyebrow__tick" />
            <span className="hist-eyebrow__label hist-eyebrow__label--muted">
              주요 발자취
            </span>
          </Reveal>

          <HistoryTimeline eras={eras} />

          <Reveal className="hist-foot">
            <span className="hist-foot__mark">↳</span>
            <span>
              주요 이정표를 추렸습니다. 2002년부터 오늘까지 600여 건의
              구축·개발 실적이 이어지고 있습니다.{" "}
              <Link href="/history/detail" className="hist-inline-link">
                상세 연혁 전체 보기 →
              </Link>
            </span>
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
            <Link href="/support/#inquiry" className="gem-btn gem-btn--invert">
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
