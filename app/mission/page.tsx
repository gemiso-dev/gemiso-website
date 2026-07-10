import Link from "next/link";
import Reveal from "@/components/Reveal";
import MissionDiagram from "@/components/MissionDiagram";
import MissionNetwork from "@/components/MissionNetwork";
import { MISSION_PILLARS } from "@/components/mission-data";
import { pageMetadata } from "@/components/seo";

export const metadata = pageMetadata({
  title: "미션",
  description:
    "‘사람, 시간, 장소를 연결하는 미디어’라는 미션 아래, 제머나이소프트는 미디어 기술을 개발합니다.",
  path: "/mission/",
});

export default function MissionPage() {
  return (
    <>
      {/* 브레드크럼 */}
      <nav className="sol-breadcrumb" aria-label="위치">
        <div className="gem-container sol-breadcrumb__inner">
          <Link href="/">홈</Link>
          <span className="gem-sep">|</span>
          <Link href="/#solutions">회사소개</Link>
          <span className="gem-sep">|</span>
          <span className="sol-breadcrumb__current">미션</span>
        </div>
      </nav>

      {/* 히어로 — 좌: 인트로, 우: 네트워크 비주얼 */}
      <section className="hist-hero">
        <div className="gem-container hist-hero__inner mission-hero__inner">
          <Reveal className="hist-hero__intro">
            <div className="hist-eyebrow">
              <span className="hist-eyebrow__tick" />
              <span className="hist-eyebrow__label">회사소개 · 미션</span>
            </div>
            <h1 className="hist-hero__title">
              <span className="hist-hero__title-seg">
                Media connecting{" "}
                <span className="mission-hero__hl">People</span>,{" "}
                <span className="mission-hero__hl">Time</span>,
              </span>{" "}
              <span className="hist-hero__title-seg">
                and <span className="mission-hero__hl">Places</span>
              </span>
            </h1>
            <p className="hist-hero__desc">
              ‘사람, 시간, 장소를 연결하는 미디어’라는 미션 아래, 제머나이소프트는
              미디어 기술을 개발합니다.
            </p>
          </Reveal>

          <Reveal as="div" className="mission-net">
            <MissionNetwork />
          </Reveal>
        </div>
      </section>

      {/* 세 기둥 */}
      {MISSION_PILLARS.map((p) => (
        <section
          key={p.no}
          className={`mission-pillar-sec${
            p.surface ? " mission-pillar-sec--surface" : ""
          }`}
        >
          <div className="gem-container">
            <Reveal as="div" className="mission-pillar">
              {/* 좌측 상단: 번호 + 제목(한 줄) — 우측 영문제목과 하단 정렬 */}
              <div className="mission-pillar__header">
                <div className="mission-pillar__meta">
                  <span className="mission-pillar__no">{p.no}</span>
                  <span className="mission-pillar__mono">{p.mono}</span>
                </div>
                <h2 className="mission-pillar__title">
                  {p.title[0]} {p.title[1]}
                </h2>
              </div>
              {/* 우측 상단: 영문 제목 (제목과 하단 정렬) */}
              <p className="mission-pillar__en">‘{p.en}’</p>
              {/* 좌측 하단: 다이어그램 (우측 리드와 상단 정렬) */}
              <div className="mission-diagram">
                <MissionDiagram kind={p.diagram} />
                <span className="mission-diagram__caption">{p.caption}</span>
              </div>
              {/* 우측 하단: 리드 + 본문 */}
              <div className="mission-pillar__body">
                <p className="mission-pillar__lead">{p.lead}</p>
                {p.body.split("\n").map((para, i) => (
                  <p key={i} className="mission-pillar__text">
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* CTA (accent 배경) — 솔루션 페이지와 동일한 스타일 */}
      <section className="sol-cta">
        <Reveal className="gem-container sol-cta__grid">
          <div>
            <h2 className="sol-cta__title">미디어로 더 가깝게, 함께 연결해요</h2>
            <p className="sol-cta__desc">
              방송 워크플로우를 알려주시면, 저희 팀이 가장 알맞은 솔루션을 함께
              찾아드립니다.
            </p>
          </div>
          <div className="sol-cta__actions">
            <Link href="/support/#inquiry" className="gem-btn gem-btn--invert">
              문의하기
            </Link>
            <Link href="/history/" className="gem-btn gem-btn--underline-light">
              연혁 보기 →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
