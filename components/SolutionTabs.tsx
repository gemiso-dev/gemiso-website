"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { VISIBLE_SOLUTIONS } from "@/components/solutions-data";

/**
 * 솔루션 sticky 탭바 — 페이지(route)별로 이동한다.
 * 모바일에서 탭이 좌우로 잘리면 현재 활성 탭이 안 보일 수 있어,
 * 로드 시 활성 탭을 스크롤 컨테이너 가운데로 옮겨 항상 보이게 한다.
 */
export default function SolutionTabs({ activeId }: { activeId: string }) {
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const btn = container.querySelector<HTMLElement>(".sol-tab.is-active");
    if (!btn) return;
    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    const delta = bRect.left - cRect.left - (cRect.width - bRect.width) / 2;
    container.scrollTo({ left: container.scrollLeft + delta, behavior: "smooth" });
  }, [activeId]);

  return (
    <div className="sol-tabbar">
      <div
        className="gem-container sol-tabs"
        role="tablist"
        aria-label="솔루션"
        ref={tabsRef}
      >
        {VISIBLE_SOLUTIONS.map((s) => {
          const on = s.id === activeId;
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
  );
}
