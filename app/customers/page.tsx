import Link from "next/link";
import Reveal from "@/components/Reveal";
import CustomersExplorer from "@/components/CustomersExplorer";
import { CASE_STUDIES, CUSTOMER_STATS } from "@/components/customers-data";
import { pageMetadata } from "@/components/seo";

export const metadata = pageMetadata({
  title: "고객사",
  description:
    "지상파와 보도 채널부터 공공·기업·교육·금융, 해외 방송사까지 — Geminisoft의 미디어 기술이 현장에서 매일 운영되고 있습니다.",
  path: "/customers/",
});

export default function CustomersPage() {
  return (
    <>
      {/* 브레드크럼 */}
      <nav className="sol-breadcrumb" aria-label="위치">
        <div className="gem-container sol-breadcrumb__inner">
          <Link href="/">홈</Link>
          <span className="gem-sep">|</span>
          <Link href="/#solutions">회사소개</Link>
          <span className="gem-sep">|</span>
          <span className="sol-breadcrumb__current">고객사</span>
        </div>
      </nav>

      {/* 히어로 */}
      <section className="hist-hero">
        <div className="gem-container hist-hero__inner">
          <Reveal className="hist-hero__intro">
            <div className="hist-eyebrow">
              <span className="hist-eyebrow__tick" />
              <span className="hist-eyebrow__label">회사소개 · 고객사</span>
            </div>
            <h1 className="hist-hero__title">방송이 신뢰하는 미디어 파트너</h1>
            <p className="hist-hero__desc">
              지상파와 보도 채널부터 공공·기업·교육·금융, 그리고 해외 방송사까지
              — Geminisoft의 미디어 기술이 현장에서 매일 운영되고 있습니다.
            </p>
          </Reveal>

          <Reveal as="div" className="hist-stats">
            {CUSTOMER_STATS.map((s) => (
              <div key={s.k} className="hist-stat">
                <div className="hist-stat__num">{s.v}</div>
                <div className="hist-stat__label">{s.k}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 구축 사례 */}
      <section className="cust-cases">
        <div className="gem-container">
          <Reveal className="cust-cases__head">
            <div className="hist-eyebrow">
              <span className="hist-eyebrow__tick" />
              <span className="hist-eyebrow__label hist-eyebrow__label--muted">
                구축 사례 · CASE STUDIES
              </span>
            </div>
            <h2 className="gem-title">도입의 결과로 증명합니다</h2>
          </Reveal>

          <Reveal as="div" className="cust-cases__grid">
            {CASE_STUDIES.map((c) => (
              <a
                href={c.href}
                key={c.client}
                className="case-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="case-card__top">
                  <span className="case-card__client">{c.client}</span>
                  <span className="case-card__tag">{c.tag}</span>
                </div>
                <h3 className="case-card__outcome">{c.outcome}</h3>
                <p className="case-card__desc">{c.desc}</p>
                <span className="gem-arrow case-card__more">
                  구축 사례
                  <span className="gem-arrow-slide" aria-hidden="true">
                    <span>→</span>
                    <span>→</span>
                  </span>
                </span>
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 고객사 섹션 헤더 */}
      <div className="gem-container cust-intro">
        <Reveal>
          <div className="hist-eyebrow">
            <span className="hist-eyebrow__tick" />
            <span className="hist-eyebrow__label hist-eyebrow__label--muted">
              고객사 · CUSTOMERS
            </span>
          </div>
          <h2 className="gem-title cust-intro__title">함께하는 고객들</h2>
          <p className="gem-lead cust-intro__lead">
            분야별로 살펴보세요. 도입처는 계속 늘어나고 있습니다.
          </p>
        </Reveal>
      </div>

      {/* 분야 필터 + 고객사 그리드 (클라이언트) */}
      <CustomersExplorer />

      {/* CTA (accent 배경) */}
      <section className="sol-cta">
        <Reveal className="gem-container sol-cta__grid">
          <div>
            <h2 className="sol-cta__title">다음 도입처를 함께 만들어요</h2>
            <p className="sol-cta__desc">
              방송 워크플로우를 알려주시면, 저희 팀이 가장 알맞은 솔루션을 함께
              설계해 드립니다.
            </p>
          </div>
          <div className="sol-cta__actions">
            <Link href="/support/#inquiry" className="gem-btn gem-btn--invert">
              문의하기
              <span className="gem-arrow-slide" aria-hidden="true">
                <span>→</span>
                <span>→</span>
              </span>
            </Link>
            <Link
              href="/#solutions"
              className="gem-btn gem-btn--underline-light"
            >
              솔루션 살펴보기
              <span className="gem-arrow-slide" aria-hidden="true">
                <span>→</span>
                <span>→</span>
              </span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
