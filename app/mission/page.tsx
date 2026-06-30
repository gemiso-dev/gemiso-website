import Link from "next/link";
import Reveal from "@/components/Reveal";
import MissionDiagram from "@/components/MissionDiagram";
import { COMPANY } from "@/components/site-config";
import { MISSION_NODES, MISSION_PILLARS } from "@/components/mission-data";
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
          <span className="gem-sep">/</span>
          <Link href="/#solutions">회사소개</Link>
          <span className="gem-sep">/</span>
          <span className="sol-breadcrumb__current">미션</span>
        </div>
      </nav>

      {/* 히어로 */}
      <section className="hist-hero">
        <div className="gem-container hist-hero__inner">
          <Reveal className="hist-hero__intro">
            <div className="hist-eyebrow">
              <span className="hist-eyebrow__tick" />
              <span className="hist-eyebrow__label">회사소개 · 미션</span>
            </div>
            <h1 className="hist-hero__title">
              Media connecting{" "}
              <span className="mission-hero__hl">People</span>,{" "}
              <span className="mission-hero__hl">Time</span>, and{" "}
              <span className="mission-hero__hl">Places</span>
            </h1>
            <p className="hist-hero__desc">
              ‘사람, 시간, 장소를 연결하는 미디어’라는 미션 아래, 제머나이소프트는
              미디어 기술을 개발합니다.
            </p>
          </Reveal>

          <Reveal as="div" className="mission-connector">
            {MISSION_NODES.map((n) => (
              <div className="mission-connector__node" key={n.en}>
                <span className="mission-connector__dot">
                  <span />
                </span>
                <div className="mission-connector__labels">
                  <div className="mission-connector__ko">{n.ko}</div>
                  <div className="mission-connector__en">{n.en}</div>
                </div>
              </div>
            ))}
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
              <div className="mission-pillar__head">
                <div className="mission-pillar__meta">
                  <span className="mission-pillar__no">{p.no}</span>
                  <span className="mission-pillar__mono">{p.mono}</span>
                </div>
                <h2 className="mission-pillar__title">
                  {p.title[0]}
                  <br />
                  {p.title[1]}
                </h2>
                <div className="mission-diagram">
                  <MissionDiagram kind={p.diagram} />
                  <span className="mission-diagram__caption">{p.caption}</span>
                </div>
              </div>
              <div className="mission-pillar__body">
                <p className="mission-pillar__en">‘{p.en}’</p>
                <p className="mission-pillar__lead">{p.lead}</p>
                <p className="mission-pillar__text">{p.body}</p>
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
            <a href={`mailto:${COMPANY.email}`} className="gem-btn gem-btn--invert">
              데모 신청
            </a>
            <Link href="/history/" className="gem-btn gem-btn--underline-light">
              연혁 보기 →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
