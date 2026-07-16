import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import SolutionClientsMarquee from "@/components/SolutionClientsMarquee";
import SolutionMock from "@/components/SolutionMock";
import SolutionTabs from "@/components/SolutionTabs";
import ZoomableImage from "@/components/ZoomableImage";
import { asset } from "@/components/site-config";
import { VISIBLE_SOLUTIONS, getSolution } from "@/components/solutions-data";
import { pageMetadata } from "@/components/seo";

type Params = { slug: string };

/** 노출 솔루션만 정적 페이지로 생성(output: export). 숨김 솔루션은 빌드 제외. */
export function generateStaticParams(): Params[] {
  return VISIBLE_SOLUTIONS.map((s) => ({ slug: s.id }));
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

  const others = VISIBLE_SOLUTIONS.filter((s) => s.id !== active.id);
  const steps = active.workflow.map((w, i, arr) => ({
    n: String(i + 1).padStart(2, "0"),
    label: w,
    notLast: i < arr.length - 1,
  }));
  // 목적격 조사(을/를) — ko의 마지막 글자 받침 여부로 결정
  const lastCode = active.ko.charCodeAt(active.ko.length - 1);
  const koParticle =
    lastCode >= 0xac00 &&
    lastCode <= 0xd7a3 &&
    (lastCode - 0xac00) % 28 !== 0
      ? "을"
      : "를";

  return (
    <>
      {/* 브레드크럼 */}
      <nav className="sol-breadcrumb" aria-label="위치">
        <div className="gem-container sol-breadcrumb__inner">
          <Link href="/">홈</Link>
          <span className="gem-sep">|</span>
          <Link href="/#solutions">솔루션</Link>
          <span className="gem-sep">|</span>
          <span className="sol-breadcrumb__current">{active.ko}</span>
        </div>
      </nav>

      {/* 솔루션 탭 (sticky) */}
      <SolutionTabs activeId={active.id} />

      {/* 히어로 */}
      <section className="sol-hero">
        <div className="gem-container sol-hero__grid">
          <Reveal>
            <div className="sol-hero__eyebrow">
              <span className="sol-hero__tick" />
              <span className="sol-hero__code">{active.code}</span>
              <span className="sol-hero__cat">{active.cat}</span>
            </div>
            <h1 className="sol-hero__title">
              {active.tagline.includes("\n")
                ? active.tagline
                    .split("\n")
                    .flatMap((seg, i) =>
                      i === 0
                        ? [
                            <span key={i} className="sol-hero__title-seg">
                              {seg}
                            </span>,
                          ]
                        : [
                            " ",
                            <span key={i} className="sol-hero__title-seg">
                              {seg}
                            </span>,
                          ],
                    )
                : active.tagline}
            </h1>
            <p className="sol-hero__desc">{active.desc}</p>
            <div className="sol-hero__actions">
              <Link href="/support/#inquiry" className="gem-btn gem-btn--primary">
                문의하기
                <span className="gem-arrow-slide" aria-hidden="true">
                  <span>→</span>
                  <span>→</span>
                </span>
              </Link>
              <p className="sol-hero__trust">{active.trust}</p>
            </div>
          </Reveal>

          <Reveal>
            {active.image ? (
              <div className="sol-shot">
                <ZoomableImage
                  src={asset(active.image)}
                  alt={`${active.name} ${active.ko} 화면`}
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
            <h2 className="gem-title">{active.ko}에 필요한 모든 것</h2>
          </Reveal>

          <Reveal as="div" className="sol-features">
            {active.features.map((f) => (
              <div
                key={f.t}
                className={`sol-feature${
                  f.ai ? " sol-feature--ai" : f.mark ? " sol-feature--mark" : ""
                }`}
              >
                <h3>{f.t}</h3>
                {f.ai ? (
                  <span className="sol-feature__badge">AI</span>
                ) : f.mark ? (
                  <span className="sol-feature__badge sol-feature__badge--mark">
                    {f.mark}
                  </span>
                ) : null}
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
                {active.detailsHeading ?? `다섯 개의 엔진, 하나의 ${active.name}`}
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
                      <ZoomableImage src={asset(d.image)} alt={`${d.code} ${d.title} 화면`} />
                    ) : (
                      <SolutionMock
                        type={d.mock ?? active.mock}
                        name={active.name}
                        ko={d.title}
                      />
                    )}
                  </div>
                  <div className="sol-detail__body">
                    <div className="sol-detail__heading">
                      <h3 className="sol-detail__title">{d.title}</h3>
                      <span className="sol-detail__sub">{d.sub}</span>
                    </div>
                    <p className="sol-detail__desc">{d.desc}</p>
                    <ul
                      className={`sol-detail__points${
                        d.wideGap ? " sol-detail__points--wide" : ""
                      }`}
                    >
                      {d.points.map((p, pi) => {
                        const i = p.indexOf(" — ");
                        return (
                          <li key={p} className="sol-detail__point">
                            <span className="sol-detail__point-num">
                              {String(pi + 1).padStart(2, "0")}
                            </span>
                            <span className="sol-detail__point-body">
                              {i === -1 ? (
                                p
                              ) : (
                                <>
                                  <strong className="sol-detail__point-label">
                                    {p.slice(0, i)}
                                  </strong>
                                  <br />
                                  {p.slice(i + 3)}
                                </>
                              )}
                            </span>
                          </li>
                        );
                      })}
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
            <h2 className="gem-title">한 흐름으로 이어지는 워크플로우</h2>
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
            <h2 className="gem-title">검증된 기술, 측정된 성과</h2>
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
              {active.name}를 선택한 고객
            </h2>
          </Reveal>
          <SolutionClientsMarquee clients={active.clients} />
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
              <h2 className="gem-title gem-title--sm">미디어 라이프사이클 전체를 하나로</h2>
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
                <span className="gem-arrow">
                  자세히 보기
                  <span className="gem-arrow-slide" aria-hidden="true">
                    <span>→</span>
                    <span>→</span>
                  </span>
                </span>
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
              방송 워크플로우를 알려주시면, 저희 팀이 {active.ko}
              {koParticle} 어떻게 적용할지 함께 설계해 드립니다.
            </p>
          </div>
          <div className="sol-cta__actions">
            <Link
              href="/support/#inquiry"
              className="gem-btn gem-btn--invert"
            >
              문의하기
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
