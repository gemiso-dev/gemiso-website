"use client";

import { useEffect, useState } from "react";
import { isNewArticle } from "@/components/news-data";

/**
 * 뉴스 썸네일 우상단 NEW 표시.
 * 정적 export라 빌드 시점이 아닌 방문 시점 날짜로 판정해야 하므로,
 * 마운트 후 클라이언트에서 계산한다(서버 렌더에는 나타나지 않음).
 */
export default function NewsNewBadge({ date }: { date: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isNewArticle(date));
  }, [date]);

  if (!show) return null;
  return <span className="news-new-badge">NEW</span>;
}
