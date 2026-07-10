"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/**
 * 미션 '장소를 연결하다' 다이어그램(애니메이션).
 * 동심 폴리곤 오브(중심 허브 + 안쪽 5각 링 + 바깥 10각 링)를 삼각 메시로 잇는다.
 * 중앙에서 바깥으로, 매 단계 2~3개씩 활성 노드에서 선(빔)이 뻗어나가 다음 노드를 활성화한다.
 * 전부 켜지면 잠시 멈춘 뒤 전체가 꺼지고 다시 중앙부터 반복한다.
 * (SVG 내부에 렌더 — MissionDiagram이 <svg>로 감싼다)
 */

function buildOrbNet() {
  const cx = 160;
  const cy = 92;
  const innerR = 34;
  const outerR = 72;
  const innerN = 5;
  const outerN = 10;
  const TOP = -Math.PI / 2;
  const nodes: { x: number; y: number; r: number; a: number }[] = [
    { x: cx, y: cy, r: 0, a: 0 }, // 0: 중심
  ];
  const inner: number[] = [];
  for (let j = 0; j < innerN; j++) {
    const a = TOP + (2 * Math.PI * j) / innerN;
    inner.push(nodes.length);
    nodes.push({ x: cx + innerR * Math.cos(a), y: cy + innerR * Math.sin(a), r: innerR, a });
  }
  const outer: number[] = [];
  for (let j = 0; j < outerN; j++) {
    const a = TOP + (2 * Math.PI * j) / outerN;
    outer.push(nodes.length);
    nodes.push({ x: cx + outerR * Math.cos(a), y: cy + outerR * Math.sin(a), r: outerR, a });
  }
  const edges: [number, number][] = [];
  for (let j = 0; j < innerN; j++) {
    edges.push([inner[j], inner[(j + 1) % innerN]]); // 안쪽 링
    edges.push([0, inner[j]]); // 중심 스포크
  }
  for (let j = 0; j < outerN; j++) {
    edges.push([outer[j], outer[(j + 1) % outerN]]); // 바깥 링
  }
  for (let j = 0; j < innerN; j++) {
    edges.push([inner[j], outer[(2 * j) % outerN]]); // 안 → 바깥(삼각화)
    edges.push([inner[j], outer[(2 * j + 1) % outerN]]);
    edges.push([inner[j], outer[(2 * j - 1 + outerN) % outerN]]);
  }
  return { nodes, edges };
}

const { nodes, edges } = buildOrbNet();

// 반경 → 각도 순 등장 순서, 노드별 순위
const ORDER = nodes
  .map((_, i) => i)
  .sort((a, b) => nodes[a].r - nodes[b].r || nodes[a].a - nodes[b].a);
const RANK: number[] = [];
ORDER.forEach((idx, pos) => (RANK[idx] = pos));

// 인접 리스트
const ADJ: number[][] = nodes.map(() => []);
edges.forEach(([a, b]) => {
  ADJ[a].push(b);
  ADJ[b].push(a);
});

// 부모 = 자신보다 먼저(안쪽) 켜지는 이웃 중 가장 중앙에 가까운 노드 → 빔이 여기서 뻗어나온다
const PARENT: number[] = nodes.map((_, i) => {
  let best = -1;
  let bestRank = Infinity;
  for (const j of ADJ[i]) {
    if (RANK[j] < RANK[i] && RANK[j] < bestRank) {
      bestRank = RANK[j];
      best = j;
    }
  }
  return best;
});

const CENTER = ORDER[0];
const BEAM_MS = 1000;

type Beam = { from: number; to: number; key: number };

export default function MissionPlacesOrb() {
  const [active, setActive] = useState<number[]>([]);
  const [beams, setBeams] = useState<Beam[]>([]);
  const timers = useRef<number[]>([]);
  const keyRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(nodes.map((_, i) => i));
      return;
    }
    const after = (ms: number, fn: () => void) => {
      timers.current.push(window.setTimeout(fn, ms));
    };

    let activeSet = new Set<number>();

    const step = () => {
      if (activeSet.size >= nodes.length) {
        after(2600, reset); // 전부 등장 — 잠시 멈춘 뒤 리셋
        return;
      }
      // 경계 후보: 아직 안 켜졌고, 부모(안쪽 이웃)가 켜진 노드
      const frontier: number[] = [];
      for (let n = 0; n < nodes.length; n++) {
        if (!activeSet.has(n) && PARENT[n] >= 0 && activeSet.has(PARENT[n])) {
          frontier.push(n);
        }
      }
      if (frontier.length === 0) {
        after(2600, reset);
        return;
      }
      // 무작위로 2~3개 선택
      const want = Math.min(frontier.length, 2 + Math.floor(Math.random() * 2));
      const pool = frontier.slice();
      const chosen: number[] = [];
      for (let i = 0; i < want; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        chosen.push(pool.splice(idx, 1)[0]);
      }
      const bs = chosen.map((n) => {
        keyRef.current += 1;
        return { from: PARENT[n], to: n, key: keyRef.current };
      });
      setBeams(bs);
      after(BEAM_MS, () => {
        chosen.forEach((n) => activeSet.add(n)); // 빔 도착 → 노드 활성
        setActive([...activeSet]);
        setBeams([]);
        after(420, step);
      });
    };

    const reset = () => {
      activeSet = new Set();
      setActive([]);
      setBeams([]);
      after(1700, start); // 전체 페이드아웃 후 다시
    };

    const start = () => {
      activeSet = new Set([CENTER]);
      setActive([CENTER]);
      setBeams([]);
      after(700, step); // 중심이 먼저 켜지고 잠시 후 뻗어나감
    };

    after(600, start);

    const ids = timers.current;
    return () => {
      ids.forEach((id) => clearTimeout(id));
      timers.current = [];
    };
  }, []);

  const on = (i: number) => active.includes(i);

  return (
    <>
      {/* 삼각 메시(선) — 양 끝이 켜지면 이어진다 */}
      <g>
        {edges.map(([a, b], e) => {
          // 빔이 지나가는(부모) 간선은 즉시 점등, 그 외는 부드럽게 페이드인
          const soft = !(PARENT[a] === b || PARENT[b] === a);
          return (
            <line
              key={e}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              className={`mission-orb__edge${soft ? " mission-orb__edge--soft" : ""}${
                on(a) && on(b) ? " is-on" : ""
              }`}
            />
          );
        })}
      </g>
      {/* 뻗어나가는 빔 (부모 → 노드로 그려진다) */}
      {beams.map((b) => {
        const f = nodes[b.from];
        const t = nodes[b.to];
        const len = Math.hypot(t.x - f.x, t.y - f.y);
        return (
          <line
            key={b.key}
            x1={f.x}
            y1={f.y}
            x2={t.x}
            y2={t.y}
            className="mission-orb__beam"
            style={{ "--len": len } as CSSProperties}
          />
        );
      })}
      {/* 사각형 노드(모두 동일 크기) */}
      {nodes.map((n, i) => {
        const s = 8;
        return (
          <rect
            key={i}
            x={n.x - s / 2}
            y={n.y - s / 2}
            width={s}
            height={s}
            className={`mission-people__node${on(i) ? " is-on" : ""}`}
          />
        );
      })}
    </>
  );
}
