import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import NewsGrid from "@/components/NewsGrid";
import { NEWS_ARTICLES } from "@/components/news-data";
import { asset } from "@/components/site-config";

export const metadata: Metadata = {
  title: "뉴스룸 | GEMISO",
  description:
    "제머나이소프트의 언론보도와 보도자료, 제품 소식을 한곳에서 전해드립니다.",
};

export default function NewsListPage() {
  const [featured, ...rest] = NEWS_ARTICLES;

  return (
    <>
      {/* 히어로 */}
      <section className="news-hero">
        <div className="gem-container">
          <Reveal>
            <div className="gem-eyebrow gem-eyebrow--mono">
              <span>NEWSROOM</span>
            </div>
            <h1 className="news-hero__title">뉴스룸</h1>
            <p className="news-hero__desc">
              제머나이소프트의 언론보도와 보도자료, 제품 소식을 한곳에서
              전해드립니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 주요 소식 + 전체 소식 */}
      <section className="news-list">
        <div className="gem-container">
          <Reveal className="gem-eyebrow gem-eyebrow--mono news-list__eyebrow">
            <span>주요 소식</span>
          </Reveal>

          {/* 주요 소식 (featured) */}
          <Reveal as="div">
            <Link href={`/news/${featured.id}/`} className="news-featured">
              <div className="news-featured__img">
                <span className="news-featured__badge">FEATURED</span>
                {featured.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={asset(featured.image)} alt={featured.title} />
                ) : (
                  <span className="news-thumb__ph">GEMISO NEWS</span>
                )}
              </div>
              <div className="news-featured__body">
                <div className="news-card__meta">
                  <span className="news-card__code">
                    {featured.outlet || "보도자료"}
                  </span>
                  <span className="news-card__date">{featured.date}</span>
                </div>
                <h2 className="news-featured__title">{featured.title}</h2>
                <p className="news-featured__excerpt">{featured.summary}</p>
                <span className="gem-arrow">자세히 보기 →</span>
              </div>
            </Link>
          </Reveal>

          {/* 전체 소식 */}
          <div className="news-list__head">
            <div className="gem-eyebrow gem-eyebrow--mono">
              <span>전체 소식</span>
            </div>
            <span className="news-list__total">총 {NEWS_ARTICLES.length}건</span>
          </div>

          <Reveal as="div">
            <NewsGrid articles={rest} total={NEWS_ARTICLES.length} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
