import type { MissionDiagram as DiagramKind } from "@/components/mission-data";
import MissionPeopleFlow from "@/components/MissionPeopleFlow";
import MissionPlacesOrb from "@/components/MissionPlacesOrb";

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

function Time() {
  return (
    <>
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
      <Node x={77} y={100} s={11} />
      <Node x={160} y={100} s={11} />
      <Node x={243} y={100} s={11} />
      {/* 선택 커서 — 과거 → 현재 → 미래로 이동(기준 위치: 현재 x=160) */}
      <rect
        x={160 - 7}
        y={100 - 7}
        width={14}
        height={14}
        className="mission-diagram__cursor"
      />
    </>
  );
}

/**
 * 장소 — 구면 좌표를 정사영해 앞면 반구의 삼각 네트워크 메시를 만든다.
 * 노드는 위/경도 격자 교차점, 간선은 이웃+대각으로 삼각화한다. 깊이(z)로 옅어져 입체감을 준다.
 */
export default function MissionDiagram({ kind }: { kind: DiagramKind }) {
  return (
    <svg
      className="mission-diagram__svg"
      viewBox="0 0 320 180"
      role="presentation"
      aria-hidden="true"
    >
      {kind === "people" && <MissionPeopleFlow />}
      {kind === "time" && <Time />}
      {kind === "places" && <MissionPlacesOrb />}
    </svg>
  );
}
