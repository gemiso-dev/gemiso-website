import Link from "next/link";
import Reveal from "@/components/Reveal";
import { COMPANY, asset } from "@/components/site-config";
import { PARTNER_STATS, PARTNER_GROUPS } from "@/components/partners-data";
import { pageMetadata } from "@/components/seo";

export const metadata = pageMetadata({
  title: "파트너",
  description:
    "Geminisoft는 세계적인 미디어 기술 기업, 국제 표준 얼라이언스, 그리고 대학과 협력하여 더 나은 방송 미디어 환경을 함께 만들어 갑니다.",
  path: "/partners/",
});

export default function PartnersPage() {
  return (
    <>
      {/* 브레드크럼 */}
      <nav className="sol-breadcrumb" aria-label="위치">
        <div className="gem-container sol-breadcrumb__inner">
          <Link href="/">홈</Link>
          <span className="gem-sep">/</span>
          <Link href="/support/">고객지원</Link>
          <span className="gem-sep">/</span>
          <span className="sol-breadcrumb__current">파트너</span>
        </div>
      </nav>

      {/* 히어로 */}
      <section className="hist-hero">
        <div className="gem-container hist-hero__inner">
          <Reveal className="hist-hero__intro">
            <div className="hist-eyebrow">
              <span className="hist-eyebrow__tick" />
              <span className="hist-eyebrow__label">고객지원 · 파트너</span>
            </div>
            <h1 className="hist-hero__title">함께 만드는 미디어 생태계</h1>
            <p className="hist-hero__desc">
              Geminisoft는 세계적인 미디어 기술 기업, 국제 표준 얼라이언스, 그리고
              대학과 협력하여 더 나은 방송 미디어 환경을 함께 만들어 갑니다.
            </p>
          </Reveal>

          <Reveal as="div" className="hist-stats">
            {PARTNER_STATS.map((s) => (
              <div key={s.k} className="hist-stat">
                <div className="hist-stat__num">{s.v}</div>
                <div className="hist-stat__label">{s.k}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 파트너 그룹 */}
      <section className="part-section">
        <div className="gem-container">
          {PARTNER_GROUPS.map((g, gi) => (
            <Reveal
              as="div"
              key={g.title}
              className={`part-group${gi === 0 ? " part-group--first" : ""}`}
            >
              <div className="part-group__head">
                <div className="part-group__intro">
                  <div className="hist-eyebrow">
                    <span className="hist-eyebrow__tick" />
                    <span className="hist-eyebrow__label hist-eyebrow__label--muted">
                      {g.eyebrow}
                    </span>
                  </div>
                  <h2 className="part-group__title">{g.title}</h2>
                  <p className="part-group__desc">{g.desc}</p>
                </div>
                <span className="part-group__count">
                  {String(g.items.length).padStart(2, "0")}개사
                </span>
              </div>

              <div className="part-grid">
                {g.items.map((p, i) => (
                  <a
                    key={p.name}
                    href={`https://${p.disp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="part-card"
                  >
                    <div className="part-card__top">
                      <span className="part-card__idx">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="part-card__kind">{p.kind}</span>
                    </div>
                    {p.logo && (
                      <div className="part-card__logo">
                        <img
                          src={asset(p.logo)}
                          alt={`${p.name} 로고`}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <h3 className="part-card__name">{p.name}</h3>
                    <p className="part-card__desc">{p.desc}</p>
                    <span className="part-card__link">{p.disp} ↗</span>
                  </a>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA (accent 배경) */}
      <section className="sol-cta">
        <Reveal className="gem-container sol-cta__grid">
          <div>
            <h2 className="sol-cta__title">파트너십을 제안하시겠어요?</h2>
            <p className="sol-cta__desc">
              기술 협력, 총판, 산학 협력 등 다양한 파트너십 제안을 환영합니다.
              함께할 방법을 알려주세요.
            </p>
          </div>
          <div className="sol-cta__actions">
            <a href={`mailto:${COMPANY.email}`} className="gem-btn gem-btn--invert">
              파트너십 문의
            </a>
            <Link href="/#solutions" className="gem-btn gem-btn--underline-light">
              솔루션 살펴보기 →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
