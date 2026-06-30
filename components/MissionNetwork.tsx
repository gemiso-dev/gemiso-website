/**
 * 미션 히어로 네트워크 비주얼 (순수 SVG).
 * 사람·시간·장소 세 허브를 직선 삼각형으로 잇고(백본), 각 허브에서 위성 노드로
 * 짧은 스포크를 뻗어 네트워크 느낌을 준다. 바깥엔 멀어질수록 사라지는 입자만 둔다.
 * 색·글로우는 globals.css의 .mission-net__* 를 따른다.
 */

type Pt = { x: number; y: number };

const PT: Record<string, Pt> = {
  // 허브 (삼각형 꼭짓점)
  people: { x: 132, y: 152 },
  time: { x: 328, y: 146 },
  places: { x: 230, y: 320 },
  // 허브에서 뻗는 위성 노드 (스포크로 연결)
  pa: { x: 56, y: 116 },
  pb: { x: 74, y: 214 },
  pc: { x: 150, y: 74 },
  ta: { x: 404, y: 116 },
  tb: { x: 406, y: 206 },
  tc: { x: 296, y: 68 },
  la: { x: 156, y: 366 },
  lb: { x: 308, y: 358 },
  // 떠다니는 입자 (연결 안 함, 가장자리로 갈수록 사라짐)
  s1: { x: 254, y: 58 },
  s2: { x: 388, y: 272 },
  s3: { x: 96, y: 300 },
  s4: { x: 236, y: 382 },
  s5: { x: 40, y: 168 },
};

// [노드키, 색조]
const DOTS: [string, "near" | "mid" | "far" | "ring"][] = [
  ["pa", "ring"],
  ["pb", "mid"],
  ["pc", "far"],
  ["ta", "mid"],
  ["tb", "ring"],
  ["tc", "far"],
  ["la", "mid"],
  ["lb", "far"],
  ["s1", "far"],
  ["s2", "ring"],
  ["s3", "far"],
  ["s4", "far"],
  ["s5", "ring"],
];

const R: Record<string, number> = { near: 4.5, mid: 3.6, far: 2.6, ring: 4 };

// 삼각형 백본 + 허브별 스포크
const LINKS: [string, string][] = [
  ["people", "time"],
  ["time", "places"],
  ["places", "people"],
  ["people", "pa"],
  ["people", "pb"],
  ["people", "pc"],
  ["time", "ta"],
  ["time", "tb"],
  ["time", "tc"],
  ["places", "la"],
  ["places", "lb"],
];

const HUBS: { key: string; ko: string; en: string; delay: number }[] = [
  { key: "people", ko: "사람", en: "PEOPLE", delay: 0 },
  { key: "time", ko: "시간", en: "TIME", delay: 1.1 },
  { key: "places", ko: "장소", en: "PLACES", delay: 2.2 },
];

// 중심에서 멀어질수록 옅어지는 투명도 (노드/스포크 공통)
const CENTER: Pt = { x: 230, y: 206 };
function fade(p: Pt): number {
  const d = Math.hypot(p.x - CENTER.x, p.y - CENTER.y);
  return Math.max(0.12, Math.min(0.9, 0.92 - (d / 235) * 0.82));
}

const HUB_KEYS = new Set(["people", "time", "places"]);

export default function MissionNetwork() {
  return (
    <svg
      className="mission-net__svg"
      viewBox="0 0 440 420"
      role="img"
      aria-label="사람·시간·장소를 잇는 미디어 네트워크"
    >
      <defs>
        <radialGradient id="netGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f62fe" stopOpacity="0.42" />
          <stop offset="55%" stopColor="#0f62fe" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0f62fe" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 삼각형 백본 + 스포크 (스포크는 바깥 끝이 옅어지도록 거리 페이드) */}
      <g className="mission-net__links">
        {LINKS.map(([from, to], idx) => {
          const a = PT[from];
          const b = PT[to];
          // 허브-허브(삼각형)는 또렷하게, 허브-위성(스포크)은 끝점 거리만큼 옅게
          const isBackbone = HUB_KEYS.has(from) && HUB_KEYS.has(to);
          const op = isBackbone ? 0.34 : Math.min(0.34, fade(b) * 0.5);
          return (
            <line
              key={idx}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className="mission-net__link"
              style={{ opacity: op }}
            />
          );
        })}
      </g>

      {/* 노드 (가장자리로 갈수록 사라짐) */}
      {DOTS.map(([key, tier], idx) => (
        <circle
          key={idx}
          cx={PT[key].x}
          cy={PT[key].y}
          r={R[tier]}
          className={`mission-net__dot mission-net__dot--${tier}`}
          style={{ opacity: fade(PT[key]) }}
        />
      ))}

      {/* 허브 + 라벨 */}
      {HUBS.map((hub) => {
        const { x, y } = PT[hub.key];
        return (
          <g key={hub.key}>
            <circle
              cx={x}
              cy={y}
              r={24}
              fill="url(#netGlow)"
              className="mission-net__glow"
              style={{ animationDelay: `${hub.delay}s` }}
            />
            <circle cx={x} cy={y} r={6} className="mission-net__core" />
            <text x={x} y={y + 30} className="mission-net__ko">
              {hub.ko}
            </text>
            <text x={x} y={y + 44} className="mission-net__en">
              {hub.en}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
