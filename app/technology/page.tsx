import Link from "next/link";
import Reveal from "@/components/Reveal";
import ZoomableImage from "@/components/ZoomableImage";
import { asset } from "@/components/site-config";
import { TECHNOLOGIES } from "@/components/technology-data";
import { pageMetadata } from "@/components/seo";

export const metadata = pageMetadata({
  title: "보유기술",
  description:
    "인제스트·인코딩부터 미디어 처리, NLE 연동, 아카이브, 전송, 워크플로우, AI까지 — 제머나이소프트가 자체 연구개발로 확보한 핵심 기술을 소개합니다.",
  path: "/technology/",
});

export default function TechnologyPage() {
  return (
    <>
      {/* 브레드크럼 */}
      <nav className="sol-breadcrumb" aria-label="위치">
        <div className="gem-container sol-breadcrumb__inner">
          <Link href="/">홈</Link>
          <span className="gem-sep">|</span>
          <span className="sol-breadcrumb__current">보유기술</span>
        </div>
      </nav>

      {/* 히어로 */}
      <section className="hist-hero">
        <div className="gem-container hist-hero__inner">
          <Reveal className="hist-hero__intro">
            <div className="hist-eyebrow">
              <span className="hist-eyebrow__tick" />
              <span className="hist-eyebrow__label">보유기술</span>
            </div>
            <h1 className="hist-hero__title">
              수집부터 송출까지, 고객의 워크플로우를 함께 만드는 기술
            </h1>
            <p className="hist-hero__desc">
              인제스트·인코딩부터 미디어 처리, NLE 연동, 아카이브, 전송,
              워크플로우, AI까지 — 방송 워크플로우 전 과정을 직접 개발한 기술로
              함께합니다.
            </p>
          </Reveal>

          {/* 기술 목차 (앵커 점프) */}
          <Reveal as="nav" className="tech-toc" aria-label="기술 목차">
            {TECHNOLOGIES.map((t) => (
              <a key={t.id} href={`#${t.id}`} className="tech-toc__link">
                {t.title}
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 기술 섹션 목록 */}
      <section className="tech-list">
        {TECHNOLOGIES.map((t, i) => {
          // 평면 이미지(확대·인터랙션·프레임 없음) 처리를 적용하는 꼭지들
          const flatImages =
            t.id === "processing" || t.id === "ai-compensation";
          return (
          <Reveal as="article" key={t.id} id={t.id} className="tech-item">
            <div className="gem-container">
              <header className="tech-item__head">
                <span className="tech-item__no">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="tech-item__code">{t.code}</span>
              </header>
              <h2 className="tech-item__title">{t.title}</h2>

              {t.blocks && t.blocks.length > 0 ? (
                <>
                  {t.intro && <p className="tech-item__lead">{t.intro}</p>}
                  <div
                    className={`sol-details tech-item__details${
                      flatImages ? " tech-item__details--flat" : ""
                    }`}
                  >
                    {t.blocks.map((b) => (
                      <div key={b.code} className="sol-detail">
                        {b.image && (
                          <div
                            className={`sol-detail__media${
                              b.imageNarrow && !flatImages
                                ? " sol-detail__media--narrow"
                                : ""
                            }`}
                          >
                            {flatImages ? (
                              // 평면 이미지(확대·인터랙션 없음)
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={asset(b.image)}
                                alt={`${b.code} ${b.title} 다이어그램`}
                                style={{
                                  width: b.imageWidth,
                                  transform: b.imageScale
                                    ? `scale(${b.imageScale})`
                                    : undefined,
                                }}
                              />
                            ) : (
                              <ZoomableImage
                                src={asset(b.image)}
                                alt={`${b.code} ${b.title} 다이어그램`}
                              />
                            )}
                          </div>
                        )}
                        <div className="sol-detail__body">
                          <div className="sol-detail__heading">
                            <h3 className="sol-detail__title">{b.title}</h3>
                            <span className="sol-detail__sub">{b.sub}</span>
                          </div>
                          <p className="sol-detail__desc">{b.desc}</p>
                          <ul className="sol-detail__points">
                            {b.points.map((p, pi) => {
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
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="tech-item__placeholder">{t.summary}</p>
              )}
            </div>
          </Reveal>
          );
        })}
      </section>

      {/* CTA (accent 배경) — 솔루션 페이지와 동일한 스타일 */}
      <section className="sol-cta">
        <Reveal className="gem-container sol-cta__grid">
          <div>
            <h2 className="sol-cta__title">필요한 기술을 함께 설계해요</h2>
            <p className="sol-cta__desc">
              방송 워크플로우를 알려주시면, 저희 팀이 가장 알맞은 기술과 솔루션을
              함께 찾아드립니다.
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
              href="/solutions/proxima/"
              className="gem-btn gem-btn--underline-light"
            >
              솔루션 보기
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
