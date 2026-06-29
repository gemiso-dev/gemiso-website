import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import {
  NEWS_ARTICLES,
  getArticle,
  relatedArticles,
} from "@/components/news-data";
import { asset } from "@/components/site-config";

type Params = { id: string };

/** 모든 기사를 정적 페이지로 생성(output: export). */
export function generateStaticParams(): Params[] {
  return NEWS_ARTICLES.map((a) => ({ id: String(a.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const a = getArticle(id);
  if (!a) return {};
  return {
    title: `${a.title} | GEMISO 뉴스룸`,
    description: a.summary,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const active = getArticle(id);
  if (!active) notFound();

  const related = relatedArticles(active.id);
  const paragraphs = active.summary.split("\n").filter((t) => t.trim());

  return (
    <>
      {/* 돌아가기 */}
      <div className="news-back">
        <div className="news-back__inner">
          <Link href="/news/" className="news-back__link">
            ← 뉴스룸으로 돌아가기
          </Link>
        </div>
      </div>

      {/* 기사 헤더 */}
      <section className="news-detail__head">
        <Reveal className="news-detail__head-inner">
          <div className="news-card__meta">
            <span className="news-detail__code">
              {active.outlet || "보도자료"}
            </span>
            <span className="news-card__date">{active.date}</span>
          </div>
          <h1 className="news-detail__title">{active.title}</h1>
        </Reveal>
      </section>

      {/* 대표 이미지 */}
      {active.image && (
        <div className="news-detail__hero">
          <div className="news-detail__hero-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(active.image)} alt={active.title} />
          </div>
        </div>
      )}

      {/* 본문 */}
      <section className="news-detail__body">
        <div className="news-article">
          {paragraphs.map((text, i) => (
            <p key={i} className="news-article__p">
              {text}
            </p>
          ))}

          {/* 원문 보기 */}
          {active.href && (
            <a
              href={active.href}
              target="_blank"
              rel="noopener noreferrer"
              className="gem-btn gem-btn--primary news-article__source"
            >
              {active.outlet ? `${active.outlet} 원문 보기` : "원문 기사 보기"} ↗
            </a>
          )}

          {/* 태그 + 공유 */}
          <div className="news-article__foot">
            <div className="news-article__tags">
              {active.outlet && <span className="news-tag">#{active.outlet}</span>}
              <span className="news-tag">#제머나이소프트</span>
              <span className="news-tag">#방송기술</span>
            </div>
            <div className="news-article__share">
              {active.href && (
                <a href={active.href} target="_blank" rel="noopener noreferrer">
                  원문 링크
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 관련 소식 */}
      <section className="news-related">
        <div className="gem-container">
          <div className="gem-eyebrow gem-eyebrow--mono news-related__eyebrow">
            <span>관련 소식</span>
          </div>
          <div className="news-grid">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/news/${rel.id}/`}
                className="news-card news-card--compact"
              >
                <div className="news-thumb">
                  {rel.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={asset(rel.image)} alt={rel.title} loading="lazy" />
                  ) : (
                    <span className="news-thumb__ph">GEMISO NEWS</span>
                  )}
                </div>
                <div className="news-card__body">
                  <div className="news-card__meta">
                    <span className="news-card__code">
                      {rel.outlet || "보도자료"}
                    </span>
                    <span className="news-card__date">{rel.date}</span>
                  </div>
                  <h3 className="news-card__title">{rel.title}</h3>
                  <span className="gem-arrow">자세히 →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="news-related__foot">
            <Link href="/news/" className="news-more__btn">
              ← 전체 소식 보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
