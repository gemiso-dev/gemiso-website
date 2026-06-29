"use client";

import Link from "next/link";
import { useState } from "react";
import type { NewsArticle } from "@/components/news-data";
import { asset } from "@/components/site-config";

type NewsGridProps = {
  /** 주요 소식을 제외한 그리드 기사 목록 */
  articles: NewsArticle[];
  /** 전체 기사 수(주요 소식 포함) — 카운트 표시용 */
  total: number;
  /** 처음 노출 개수 */
  initial?: number;
  /** "더 보기" 1회당 추가 개수 */
  step?: number;
};

/**
 * 뉴스룸 목록 그리드 + "더 보기" 페이지네이션.
 * visible 상태를 다루므로 클라이언트 컴포넌트.
 */
export default function NewsGrid({
  articles,
  total,
  initial = 9,
  step = 9,
}: NewsGridProps) {
  const [visible, setVisible] = useState(initial);
  const gridVisible = articles.slice(0, visible);
  const hasMore = visible < articles.length;
  const shown = 1 + gridVisible.length; // 주요 소식 1건 포함

  return (
    <>
      <div className="news-grid">
        {gridVisible.map((art) => (
          <Link key={art.id} href={`/news/${art.id}/`} className="news-card">
            <div className="news-thumb">
              {art.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={asset(art.image)} alt={art.title} loading="lazy" />
              ) : (
                <span className="news-thumb__ph">GEMISO NEWS</span>
              )}
            </div>
            <div className="news-card__body">
              <div className="news-card__meta">
                <span className="news-card__code">{art.outlet || "보도자료"}</span>
                <span className="news-card__date">{art.date}</span>
              </div>
              <h3 className="news-card__title">{art.title}</h3>
              <p className="news-card__desc">{art.summary}</p>
              <span className="gem-arrow">자세히 →</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="news-more">
        {hasMore && (
          <button
            type="button"
            className="news-more__btn"
            onClick={() => setVisible((v) => v + step)}
          >
            더 보기
          </button>
        )}
        <div className="news-more__count">
          전체 {total}건 중 {shown}건 표시
        </div>
      </div>
    </>
  );
}
