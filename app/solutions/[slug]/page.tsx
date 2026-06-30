import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import SolutionMock from "@/components/SolutionMock";
import { asset } from "@/components/site-config";
import { SOLUTIONS, getSolution } from "@/components/solutions-data";
import { pageMetadata } from "@/components/seo";

type Params = { slug: string };

/** 모든 솔루션을 정적 페이지로 생성(output: export). */
export function generateStaticParams(): Params[] {
  return SOLUTIONS.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return pageMetadata({
    title: `${s.name} · ${s.ko}`,
    description: s.desc,
    path: `/solutions/${s.id}/`,
    image: s.image,
  });
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const active = getSolution(slug);
  if (!active) notFound();

  const others = SOLUTIONS.filter((s) => s.id !== active.id);
  const steps = active.workflow.map((w, i, arr) => ({
    n: String(i + 1).padStart(2, "0"),
    label: w,
    notLast: i < arr.length - 1,
  }));

  return (
    <>
      {/* 브레드크럼 */}
      <nav className="sol-breadcrumb" aria-label="위치">
        <div className="gem-container sol-breadcrumb__inner">
          <Link href="/">홈</Link>
          <span className="gem-sep">/</span>
          <Link href="/#solutions">솔루션</Link>
          <span className="gem-sep">/</span>
          <span className="sol-breadcrumb__current">{active.ko}</span>
        </div>
      </nav>

      {/* 솔루션 탭 (sticky) */}
      <div className="sol-tabbar">
        <div className="gem-container sol-tabs" role="tablist" aria-label="솔루션">
          {SOLUTIONS.map((s) => {
            const on = s.id === active.id;
            return (
              <Link
                key={s.id}
                href={`/solutions/${s.id}/`}
                className={`sol-tab${on ? " is-active" : ""}${
                  s.badge ? " sol-tab--featured" : ""
                }`}
                aria-current={on ? "page" : undefined}
              >
                <span className="sol-tab__code">
                  {s.code}
                  {s.badge && <span className="sol-tab__badge">{s.badge}</span>}
                </span>
                <span className="sol-tab__name">{s.ko}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 히어로 */}
      <section className="sol-hero">
        <div className="gem-container sol-hero__grid">
          <Reveal>
            <div className="sol-hero__eyebrow">
              <span className="sol-hero__tick" />
              <span className="sol-hero__code">{active.code}</span>
              <span className="sol-hero__cat">{active.cat}</span>
            </div>
            <h1 className="sol-hero__title">{active.tagline}</h1>
            <p className="sol-hero__desc">{active.desc}</p>
            <div className="sol-hero__actions">
              <Link href="/#contact" className="gem-btn gem-btn--primary">
                문의
              </Link>
              <a href="#features" className="gem-btn gem-btn--link">
                핵심 기능 보기 →
              </a>
            </div>
            <p className="sol-hero__trust">{active.trust}</p>
          </Reveal>

          <Reveal>
            {active.image ? (
              <div className="sol-shot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(active.image)}
                  alt={`${active.name} ${active.ko} 화면`}
                  loading="lazy"
                />
              </div>
            ) : (
              <SolutionMock type={active.mock} name={active.name} ko={active.ko} />
            )}
          </Reveal>
        </div>
      </section>

      {/* 핵심 기능 */}
      <section id="features" className="gem-section">
        <div className="gem-container">
          <Reveal className="sol-section__head">
            <div className="gem-eyebrow gem-eyebrow--mono">
              <span>핵심 기능</span>
            </div>
            <h2 className="gem-title">{active.ko}에 필요한 모든 것.</h2>
          </Reveal>

          <Reveal as="div" className="sol-features">
            {active.features.map((f) => (
              <div
                key={f.t}
                className={`sol-feature${
                  f.ai ? " sol-feature--ai" : f.mark ? " sol-feature--mark" : ""
                }`}
              >
                {f.ai ? (
                  <span className="sol-feature__badge">AI</span>
                ) : f.mark ? (
                  <span className="sol-feature__badge sol-feature__badge--mark">
                    {f.mark}
                  </span>
                ) : (
                  <span className="sol-feature__tick" />
                )}
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 기능 상세 (있는 경우만) */}
      {active.details && active.details.length > 0 && (
        <section className="gem-section gem-section--alt">
          <div className="gem-container">
            <Reveal className="sol-section__head">
              <div className="gem-eyebrow gem-eyebrow--mono">
                <span>기능 상세</span>
              </div>
              <h2 className="gem-title">
                {active.detailsHeading ?? `다섯 개의 엔진, 하나의 ${active.name}.`}
              </h2>
            </Reveal>

            <div className="sol-details">
              {active.details.map((d) => (
                <Reveal as="div" key={d.code} className="sol-detail">
                  <div
                    className={`sol-detail__media${
                      d.image
                        ? d.imageNarrow
                          ? " sol-detail__media--narrow"
                          : ""
                        : " sol-detail__media--mock"
                    }`}
                  >
                    {d.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={asset(d.image)} alt={`${d.code} ${d.title} 화면`} loading="lazy" />
                    ) : (
                      <SolutionMock
                        type={d.mock ?? active.mock}
                        name={active.name}
                        ko={d.title}
                      />
                    )}
                  </div>
                  <div className="sol-detail__body">
                    <span className="sol-detail__code">{d.code}</span>
                    <h3 className="sol-detail__title">{d.title}</h3>
                    <span className="sol-detail__sub">{d.sub}</span>
                    <p className="sol-detail__desc">{d.desc}</p>
                    <ul className="sol-detail__points">
                      {d.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 작동 방식 */}
      <section className="gem-section">
        <div className="gem-container">
          <Reveal className="sol-section__head">
            <div className="gem-eyebrow gem-eyebrow--mono">
              <span>작동 방식</span>
            </div>
            <h2 className="gem-title">한 흐름으로 이어지는 워크플로우.</h2>
          </Reveal>

          <Reveal as="div" className="sol-steps">
            {steps.map((st) => (
              <div key={st.n} className="sol-step">
                <span className="sol-step__num">{st.n}</span>
                <span className="sol-step__label">{st.label}</span>
                {st.notLast && <span className="sol-step__arrow">→</span>}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 성과 · 사양 */}
      <section className="gem-section gem-section--alt">
        <div className="gem-container">
          <Reveal className="sol-section__head">
            <div className="gem-eyebrow gem-eyebrow--mono">
              <span>성과 · 사양</span>
            </div>
            <h2 className="gem-title">검증된 기술, 측정된 성과.</h2>
          </Reveal>

          <Reveal as="div" className="sol-perf">
            <div className="sol-stats">
              {active.stats.map((s) => (
                <div key={s.k} className="sol-stat">
                  <div className="sol-stat__num">{s.v}</div>
                  <div className="sol-stat__label">{s.k}</div>
                </div>
              ))}
            </div>
            <div className="sol-specs">
              {active.specs.map((sp) => (
                <div key={sp.k} className="sol-spec">
                  <span className="sol-spec__k">{sp.k}</span>
                  <span className="sol-spec__v">{sp.v}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 도입 고객 마키 */}
      {active.clients && active.clients.length > 0 && (
        <section className="gem-marquee" aria-label={`${active.name} 도입 고객`}>
          <Reveal className="gem-marquee__head">
            <div className="gem-eyebrow gem-eyebrow--mono">
              <span>도입 고객</span>
            </div>
            <h2 className="gem-title gem-title--sm">
              {active.name}를 선택한 고객.
            </h2>
          </Reveal>
          <div className="gem-marquee__track sol-clients__track">
            {[0, 1, 2, 3].flatMap((rep) =>
              active.clients!.map((c, i) => (
                <div
                  key={`${rep}-${i}`}
                  className="gem-logo-cell"
                  aria-hidden={rep > 0 ? "true" : undefined}
                >
                  {c}
                </div>
              )),
            )}
          </div>
        </section>
      )}

      {/* 다른 솔루션 */}
      <section className="gem-section">
        <div className="gem-container">
          <Reveal className="sol-others__head">
            <div>
              <div className="gem-eyebrow gem-eyebrow--mono">
                <span>다른 솔루션</span>
              </div>
              <h2 className="gem-title gem-title--sm">미디어 생애주기 전체를 하나로.</h2>
            </div>
            <Link href="/#solutions" className="gem-news__more">
              솔루션 전체 보기 →
            </Link>
          </Reveal>

          <Reveal as="div" className="sol-others">
            {others.map((o) => (
              <Link key={o.id} href={`/solutions/${o.id}/`} className="sol-other">
                <span className="sol-other__code">{o.code}</span>
                <h3 className="sol-other__title">{o.ko}</h3>
                <p className="sol-other__desc">{o.tagline}</p>
                <span className="gem-arrow">자세히 보기 →</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 솔루션 CTA (accent 배경) */}
      <section className="sol-cta">
        <Reveal className="gem-container sol-cta__grid">
          <div>
            <h2 className="sol-cta__title">{active.name} 도입을 검토 중이신가요?</h2>
            <p className="sol-cta__desc">
              방송 워크플로우를 알려주시면, 저희 팀이 {active.ko}을(를) 어떻게
              적용할지 함께 설계해 드립니다.
            </p>
          </div>
          <div className="sol-cta__actions">
            <Link
              href="/support/"
              className="gem-btn gem-btn--invert"
            >
              영업팀 문의 →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
