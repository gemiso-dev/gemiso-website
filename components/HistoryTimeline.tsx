"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

/** 페이지에서 최신순으로 가공해 넘겨주는 시대 뷰 모델. */
export type HistoryEraView = {
  range: string;
  title: string;
  desc: string;
  idx: string;
  count: string;
  items: {
    year: string;
    tag?: string;
    major: boolean;
    last: boolean;
    title: string;
    desc: string;
  }[];
};

/**
 * 연혁 타임라인 — 시대(연도 구간)별 탭.
 * 세로로 길게 쌓지 않고, 최신 구간부터 탭으로 골라 한 번에 한 구간만 보여준다.
 */
export default function HistoryTimeline({ eras }: { eras: HistoryEraView[] }) {
  const [active, setActive] = useState(0);
  const era = eras[active];
  const tabsRef = useRef<HTMLDivElement>(null);

  // 모바일에서 탭이 좌우로 잘리면 선택한 탭이 안 보일 수 있어,
  // 활성 탭을 스크롤 컨테이너 가운데로 옮겨 항상 고를 수 있게 한다.
  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const btn = container.querySelector<HTMLElement>(".hist-tab.is-active");
    if (!btn) return;
    const offset =
      btn.offsetLeft - (container.clientWidth - btn.offsetWidth) / 2;
    container.scrollTo({ left: offset, behavior: "smooth" });
  }, [active]);

  return (
    <>
      <div className="hist-tabbar">
        <div
          className="hist-tabs"
          role="tablist"
          aria-label="연혁 시대"
          ref={tabsRef}
        >
          {eras.map((e, i) => {
            const on = i === active;
            return (
              <button
                key={e.range}
                type="button"
                role="tab"
                aria-selected={on}
                className={`hist-tab${on ? " is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="hist-tab__range">{e.range}</span>
                <span className="hist-tab__name">{e.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Reveal as="div" key={era.range} className="hist-era hist-era--panel">
        <div className="hist-era-head">
          <div className="hist-era-head__main">
            <h2 className="hist-era__title">{era.title}</h2>
            <p className="hist-era__desc">{era.desc}</p>
          </div>
        </div>

        <div className="hist-rows">
          {era.items.map((it, i) => (
            <div className="tl-row" key={`${it.year}-${i}`}>
              <div className="tl-year">{it.year}</div>
              <div className="tl-rail">
                <span
                  className={`tl-rail__line${
                    it.last ? " tl-rail__line--stub" : ""
                  }`}
                />
                <span
                  className={`tl-dot${
                    it.major ? " tl-dot--major" : " tl-dot--minor"
                  }`}
                />
              </div>
              <div className="tl-body">
                {it.tag && <span className="tl-tag">{it.tag}</span>}
                <div className="tl-body__text">
                  <h3 className="tl-title">{it.title}</h3>
                  <p className="tl-desc">{it.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </>
  );
}
