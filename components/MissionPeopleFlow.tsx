"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/**
 * 미션 '사람을 연결하다' 다이어그램(애니메이션).
 * 간선을 따라 흐름이 이동하며 도착 노드를 활성화한다. 랜덤 순서로 모든 노드가
 * 활성화되면 잠시 멈춘 뒤 리셋해 반복한다. (SVG 내부에 렌더 — MissionDiagram이 <svg>로 감싼다)
 */

const NODES = [
  { x: 70, y: 61 }, // 0
  { x: 250, y: 61 }, // 1
  { x: 70, y: 126 }, // 2
  { x: 160, y: 126 }, // 3
  { x: 250, y: 126 }, // 4
  { x: 160, y: 61 }, // 5
];

/** 인접 간선(선 세그먼트). 연결 그래프라 임의 활성→비활성 워크로 전부 도달한다. */
const EDGES: [number, number][] = [
  [0, 5],
  [5, 1],
  [2, 3],
  [3, 4],
  [0, 2],
  [5, 3],
  [1, 4],
];

const NODE_S = 11; // 노드 크기(활성/비활성 동일 — 채움색만 전환)

type Flow = { from: number; to: number; key: number };

export default function MissionPeopleFlow() {
  // 초기값은 결정적(SSR 일치) — 애니메이션은 마운트 후 effect에서 시작한다.
  const [active, setActive] = useState<number[]>([]);
  const [litEdges, setLitEdges] = useState<number[]>([]);
  const [flow, setFlow] = useState<Flow | null>(null);
  const timers = useRef<number[]>([]);
  const keyRef = useRef(0);

  useEffect(() => {
    // 모션 최소화: 애니메이션 없이 전부 활성 상태로 고정
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive([0, 1, 2, 3, 4, 5]);
      setLitEdges(EDGES.map((_, i) => i));
      return;
    }

    const after = (ms: number, fn: () => void) => {
      timers.current.push(window.setTimeout(fn, ms));
    };
    const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

    let activeSet = new Set<number>();
    let litSet = new Set<number>();

    const step = () => {
      if (litSet.size >= EDGES.length) {
        after(1900, reset); // 모든 간선 점등 완료 — 잠시 보여준 뒤 전체 페이드아웃
        return;
      }
      // 아직 점등 안 된 간선 중, 한쪽 끝이 활성인 것(활성 노드에서 흐름 시작)
      const cands = EDGES.map((e, i) => ({ e, i })).filter(
        ({ e: [a, b], i }) =>
          !litSet.has(i) && (activeSet.has(a) || activeSet.has(b)),
      );
      if (cands.length === 0) {
        after(900, start);
        return;
      }
      const { e, i } = pick(cands);
      const from = activeSet.has(e[0]) ? e[0] : e[1];
      const to = from === e[0] ? e[1] : e[0];
      keyRef.current += 1;
      setFlow({ from, to, key: keyRef.current });
      // 흐름 그리기(1.1s) 후 도착 노드 활성 + 간선 점등, 다음 스텝
      after(1100, () => {
        activeSet.add(to);
        litSet.add(i);
        setActive([...activeSet]);
        setLitEdges([...litSet]);
        setFlow(null);
        after(750, step);
      });
    };

    // 전체 페이드아웃 → 완전히 꺼진 뒤 다시 시작
    const reset = () => {
      activeSet = new Set();
      litSet = new Set();
      setActive([]);
      setLitEdges([]);
      setFlow(null);
      after(1000, start); // 페이드아웃(0.8s) 완료 후 페이드인 시작
    };

    const start = () => {
      activeSet = new Set([Math.floor(Math.random() * NODES.length)]);
      litSet = new Set();
      setActive([...activeSet]);
      setLitEdges([]);
      setFlow(null);
      after(800, step);
    };

    after(600, start);

    const ids = timers.current;
    return () => {
      ids.forEach((id) => clearTimeout(id));
      timers.current = [];
    };
  }, []);

  return (
    <>
      {/* 간선 — 점등/소등이 강조색 트랜지션으로 부드럽게 전환된다 */}
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          className={`mission-people__edge${litEdges.includes(i) ? " is-on" : ""}`}
        />
      ))}
      {/* 흐르는 간선 빔 (from → to로 그려진다) */}
      {flow &&
        (() => {
          const f = NODES[flow.from];
          const t = NODES[flow.to];
          const len = Math.hypot(t.x - f.x, t.y - f.y);
          return (
            <line
              key={flow.key}
              x1={f.x}
              y1={f.y}
              x2={t.x}
              y2={t.y}
              className="mission-people__beam"
              style={{ "--len": len } as CSSProperties}
            />
          );
        })()}
      {/* 노드 — 활성 시 채움색이 부드럽게 전환된다(같은 엘리먼트 유지) */}
      {NODES.map((n, i) => (
        <rect
          key={i}
          x={n.x - NODE_S / 2}
          y={n.y - NODE_S / 2}
          width={NODE_S}
          height={NODE_S}
          className={`mission-people__node${active.includes(i) ? " is-on" : ""}`}
        />
      ))}
    </>
  );
}
