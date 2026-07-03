import Link from "next/link";
import Reveal from "@/components/Reveal";
import { asset } from "@/components/site-config";
import { CERT_STATS, GS_CERTS, PATENTS } from "@/components/certification-data";
import { pageMetadata } from "@/components/seo";

export const metadata = pageMetadata({
  title: "인증 현황",
  description:
    "Geminisoft의 핵심 솔루션은 국가 공인 소프트웨어 품질 인증 GS 1등급과 원천 기술 특허로 완성도를 입증합니다.",
  path: "/certification/",
});

export default function CertificationPage() {
  return (
    <>
      {/* 브레드크럼 */}
      <nav className="sol-breadcrumb" aria-label="위치">
        <div className="gem-container sol-breadcrumb__inner">
          <Link href="/">홈</Link>
          <span className="gem-sep">|</span>
          <Link href="/#solutions">회사소개</Link>
          <span className="gem-sep">|</span>
          <span className="sol-breadcrumb__current">인증 현황</span>
        </div>
      </nav>

      {/* 히어로 */}
      <section className="hist-hero">
        <div className="gem-container hist-hero__inner">
          <Reveal className="hist-hero__intro">
            <div className="hist-eyebrow">
              <span className="hist-eyebrow__tick" />
              <span className="hist-eyebrow__label">회사소개 · 인증 현황</span>
            </div>
            <h1 className="hist-hero__title">검증된 기술, 공인된 품질</h1>
            <p className="hist-hero__desc">
              Geminisoft의 핵심 솔루션은 국가 공인 소프트웨어 품질 인증 GS
              1등급과 원천 기술 특허로 그 완성도를 입증합니다.
            </p>
          </Reveal>

          <Reveal as="div" className="hist-stats">
            {CERT_STATS.map((s) => (
              <div key={s.k} className="hist-stat">
                <div className="hist-stat__num">{s.v}</div>
                <div className="hist-stat__label">{s.k}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* GS 인증 */}
      <section className="cert-section cert-section--top">
        <div className="gem-container">
          <Reveal className="gem-section__head">
            <div className="gem-eyebrow gem-eyebrow--mono">
              <span>GS 인증 · GOOD SOFTWARE</span>
            </div>
            <h2 className="gem-title">국가 공인 소프트웨어 품질, 최고 등급</h2>
            <p className="gem-lead">
              한국정보통신기술협회(TTA)가 기능성 · 신뢰성 · 사용성을 평가해
              부여하는 GS 인증에서, 핵심 솔루션이 최고 등급인{" "}
              <span className="cert-lead__hl">1등급</span>을 획득했습니다.
            </p>
          </Reveal>

          <Reveal as="div" className="cert-grid">
            {GS_CERTS.map((c) => (
              <div className="cert-card" key={c.name}>
                <div className="cert-card__top">
                  <span className="cert-card__kind">GS 인증서</span>
                  <span className="cert-card__grade">1등급</span>
                </div>
                <div className="cert-card__shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(c.img)}
                    alt={`${c.name} GS 인증서`}
                    loading="lazy"
                  />
                </div>
                <div className="cert-card__info">
                  <span className="cert-card__tag">{c.tag}</span>
                  <h3 className="cert-card__name">{c.name}</h3>
                  <span className="cert-card__cat">{c.cat}</span>
                  <span className="cert-card__org">
                    TTA · 한국정보통신기술협회
                  </span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 특허 */}
      <section className="cert-section cert-section--bottom">
        <div className="gem-container">
          <Reveal className="gem-section__head">
            <div className="gem-eyebrow gem-eyebrow--mono">
              <span>특허 · PATENTS</span>
            </div>
            <h2 className="gem-title">원천 기술을 특허로</h2>
            <p className="gem-lead">
              미디어 데이터 처리의 핵심 기술을 특허로 확보해, 외산에 의존하지
              않는 독자적인 경쟁력을 갖췄습니다.
            </p>
          </Reveal>

          <Reveal as="div" className="pat-grid">
            {PATENTS.map((p) => (
              <div className="pat-card" key={p.no}>
                <div className="pat-shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(p.img)} alt={`${p.title} 특허증`} loading="lazy" />
                  <span className="pat-shot__label">PATENT</span>
                </div>
                <div className="pat-body">
                  <div className="pat-body__meta">
                    <span className="pat-no">{p.no}</span>
                    <span className="pat-status">{p.status}</span>
                  </div>
                  <h3 className="pat-title">{p.title}</h3>
                  <p className="pat-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="hist-foot">
            <span className="hist-foot__mark">↳</span>
            <span>
              인증서 · 특허증 사본 등 기술 검증 자료는 영업팀을 통해 제공해
              드립니다.
            </span>
          </Reveal>
        </div>
      </section>

      {/* CTA (accent 배경) — 솔루션 페이지와 동일한 스타일 */}
      <section className="sol-cta">
        <Reveal className="gem-container sol-cta__grid">
          <div>
            <h2 className="sol-cta__title">기술 검증 자료가 필요하신가요?</h2>
            <p className="sol-cta__desc">
              인증서·특허 사본 등 도입 검토에 필요한 자료를 영업팀이 빠르게
              안내해 드립니다.
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
