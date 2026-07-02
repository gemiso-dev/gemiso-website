import Link from "next/link";
import Reveal from "@/components/Reveal";
import { COMPANY } from "@/components/site-config";
import {
  SUPPORT_HERO_TAGS,
  CONTACT_METHODS,
  OFFICES,
} from "@/components/support-data";
import { pageMetadata } from "@/components/seo";

export const metadata = pageMetadata({
  title: "고객지원",
  description:
    "글로벌 미디어 기술 기업 Geminisoft의 솔루션 도입 상담과 기술 지원을 안내합니다. 전화·이메일 연락처와 서울·호치민 거점 정보를 확인하세요.",
  path: "/support/",
});

export default function SupportPage() {
  return (
    <>
      {/* 브레드크럼 */}
      <nav className="sol-breadcrumb" aria-label="위치">
        <div className="gem-container sol-breadcrumb__inner">
          <Link href="/">홈</Link>
          <span className="gem-sep">|</span>
          <span className="sol-breadcrumb__current">고객지원</span>
        </div>
      </nav>

      {/* 히어로 */}
      <section className="hist-hero">
        <div className="gem-container hist-hero__inner">
          <Reveal className="hist-hero__intro">
            <div className="hist-eyebrow">
              <span className="hist-eyebrow__tick" />
              <span className="hist-eyebrow__label">고객지원 · CONTACT</span>
            </div>
            <h1 className="hist-hero__title">기술지원 · 문의</h1>
            <p className="hist-hero__desc">
              글로벌 미디어 기술 기업 Geminisoft의 솔루션 도입 상담과 기술 지원을
              안내합니다. 방송 워크플로우에 대한 어떤 문의든 환영합니다.
            </p>
            <div className="sup-tags">
              {SUPPORT_HERO_TAGS.map((t) => (
                <span key={t} className="sup-tag">
                  <span className="sup-tag__dot" />
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 연락처 밴드 */}
      <section className="sup-contact-section">
        <div className="gem-container">
          <div className="hist-eyebrow sup-section-eyebrow">
            <span className="hist-eyebrow__tick" />
            <span className="hist-eyebrow__label hist-eyebrow__label--muted">
              연락처 · GET IN TOUCH
            </span>
          </div>
          <div className="sup-contact">
            {CONTACT_METHODS.map((c) => {
              const inner = (
                <>
                  <div className="sup-contact__label">{c.label}</div>
                  <div className="sup-contact__value">{c.value}</div>
                  <div className="sup-contact__note">{c.note}</div>
                </>
              );
              return c.href ? (
                <a key={c.label} href={c.href} className="sup-contact__cell">
                  {inner}
                </a>
              ) : (
                <div key={c.label} className="sup-contact__cell">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 오피스 */}
      <section className="sup-offices">
        <div className="gem-container">
          <div className="sup-offices__head">
            <div className="sup-offices__intro">
              <div className="hist-eyebrow">
                <span className="hist-eyebrow__tick" />
                <span className="hist-eyebrow__label hist-eyebrow__label--muted">
                  오피스 · OFFICES
                </span>
              </div>
              <h2 className="sup-offices__title">서울과 호치민, 3개 거점</h2>
              <p className="sup-offices__desc">
                본사와 미디어 컨트롤 센터, 베트남 대표 사무소가 방송 고객을
                가까이에서 지원합니다.
              </p>
            </div>
          </div>

          <div className="sup-office-grid">
            {OFFICES.map((o, i) => (
              <div key={o.name} className="sup-office">
                <div className="sup-office__top">
                  <span className="sup-office__tag">{o.tag}</span>
                  <span className="sup-office__idx">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="sup-office__name">{o.name}</h3>
                <p className="sup-office__addr">{o.addr}</p>
                <a
                  href={o.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sup-office__map"
                >
                  지도에서 보기 ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (accent 배경) */}
      <section className="sol-cta">
        <Reveal className="gem-container sol-cta__grid">
          <div>
            <h2 className="sol-cta__title">솔루션 도입을 검토 중이신가요?</h2>
            <p className="sol-cta__desc">
              방송 워크플로우와 규모를 알려주시면, 가장 알맞은 구성과 견적을
              제안해 드립니다.
            </p>
          </div>
          <div className="sol-cta__actions">
            <a href={`mailto:${COMPANY.email}`} className="gem-btn gem-btn--invert">
              문의하기
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
