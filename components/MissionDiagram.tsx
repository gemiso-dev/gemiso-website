import type { MissionDiagram as DiagramKind } from "@/components/mission-data";

/**
 * 미션 기둥별 장식 다이어그램 (순수 SVG).
 * 사람=네트워크, 시간=타임라인, 장소=지리적 연결. 색은 globals.css의 --gem-accent를 따른다.
 */

// 빈(테두리만) 노드
function Node({ x, y, s = 9 }: { x: number; y: number; s?: number }) {
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

// 강조(채워진·맥동) 노드
function Hub({ x, y, s = 12 }: { x: number; y: number; s?: number }) {
  return (
    <rect
      x={x - s / 2}
      y={y - s / 2}
      width={s}
      height={s}
      className="mission-diagram__hub"
    />
  );
}

function People() {
  return (
    <>
      <g className="mission-diagram__link">
        <line x1={70} y1={61} x2={250} y2={61} />
        <line x1={70} y1={126} x2={250} y2={126} />
        <line x1={70} y1={61} x2={70} y2={126} />
        <line x1={160} y1={61} x2={160} y2={126} />
        <line x1={250} y1={61} x2={250} y2={126} />
      </g>
      <Node x={70} y={61} />
      <Node x={250} y={61} />
      <Node x={70} y={126} />
      <Node x={160} y={126} />
      <Node x={250} y={126} />
      <Hub x={160} y={61} s={13} />
    </>
  );
}

function Time() {
  return (
    <>
      <g className="mission-diagram__link">
        <line x1={32} y1={100} x2={280} y2={100} />
        <line x1={77} y1={74} x2={77} y2={100} className="mission-diagram__tick" />
        <line x1={160} y1={74} x2={160} y2={100} className="mission-diagram__tick" />
        <line x1={243} y1={74} x2={243} y2={100} className="mission-diagram__tick" />
      </g>
      {/* 오른쪽 화살촉 */}
      <path d="M280,100 l-9,-5 l0,10 z" className="mission-diagram__arrow" />
      <text x={77} y={62} className="mission-diagram__label">
        과거
      </text>
      <text x={160} y={62} className="mission-diagram__label mission-diagram__label--accent">
        현재
      </text>
      <text x={243} y={62} className="mission-diagram__label">
        미래
      </text>
      <Node x={77} y={100} s={11} />
      <Node x={243} y={100} s={11} />
      <Hub x={160} y={100} s={14} />
    </>
  );
}

function Places() {
  return (
    <>
      <path
        d="M51,54 H128 V112 H275"
        className="mission-diagram__path"
        fill="none"
      />
      <circle cx={198} cy={45} r={3.5} className="mission-diagram__dot" />
      <circle cx={232} cy={30} r={3.5} className="mission-diagram__dot" />
      <circle cx={77} cy={86} r={3.5} className="mission-diagram__dot" />
      <circle cx={262} cy={79} r={3.5} className="mission-diagram__dot" />
      <circle cx={166} cy={144} r={3.5} className="mission-diagram__dot" />
      <Node x={128} y={54} s={10} />
      <Node x={128} y={112} s={10} />
      <Node x={198} y={112} s={10} />
      <Hub x={51} y={54} s={13} />
      <Hub x={275} y={112} s={13} />
    </>
  );
}

export default function MissionDiagram({ kind }: { kind: DiagramKind }) {
  return (
    <svg
      className="mission-diagram__svg"
      viewBox="0 0 320 180"
      role="presentation"
      aria-hidden="true"
    >
      {kind === "people" && <People />}
      {kind === "time" && <Time />}
      {kind === "places" && <Places />}
    </svg>
  );
}
