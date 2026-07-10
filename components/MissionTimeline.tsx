"use client";

import { useInView } from "@/components/useInView";

// 빈(테두리만) 노드
function Node({ x, y, s = 11 }: { x: number; y: number; s?: number }) {
  return (
    <rect
      x={x - s / 2}
      y={y - s / 2}
      width={s}
      height={s}
      className="mission-diagram__node"
    />
  );
}

/**
 * 시간 — 타임라인 위 선택 커서가 과거 → 현재 → 미래로 이동한다(CSS 애니메이션).
 * 화면에 들어오면 재생되도록 감싸는 <g>에 is-inview를 붙인다(그 전에는 paused).
 */
export default function MissionTimeline() {
  const [viewRef, inView] = useInView<SVGGElement>();
  return (
    <g ref={viewRef} className={inView ? "is-inview" : undefined}>
      <g className="mission-diagram__link">
        <line x1={32} y1={100} x2={285} y2={100} />
        <line x1={77} y1={74} x2={77} y2={100} className="mission-diagram__tick" />
        <line x1={160} y1={74} x2={160} y2={100} className="mission-diagram__tick" />
        <line x1={243} y1={74} x2={243} y2={100} className="mission-diagram__tick" />
      </g>
      <text x={77} y={62} className="mission-diagram__label mission-diagram__label--t0">
        과거
      </text>
      <text x={160} y={62} className="mission-diagram__label mission-diagram__label--t1">
        현재
      </text>
      <text x={243} y={62} className="mission-diagram__label mission-diagram__label--t2">
        미래
      </text>
      <Node x={77} y={100} />
      <Node x={160} y={100} />
      <Node x={243} y={100} />
      {/* 선택 커서 — 과거 → 현재 → 미래로 이동(기준 위치: 현재 x=160) */}
      <rect
        x={160 - 7}
        y={100 - 7}
        width={14}
        height={14}
        className="mission-diagram__cursor"
      />
    </g>
  );
}
