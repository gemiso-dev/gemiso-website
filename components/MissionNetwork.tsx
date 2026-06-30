/**
 * 미션 히어로 네트워크 비주얼 (순수 SVG).
 * 사람·시간·장소 세 허브를 직선 삼각형으로 잇고(백본), 허브마다 길이·개수·방향이
 * 다른 불규칙한 가지를 뻗어 비대칭적이고 자연스러운 네트워크를 만든다.
 * 색·글로우는 globals.css의 .mission-net__* 를 따른다.
 */

type Pt = { x: number; y: number };

const PT: Record<string, Pt> = {
  // 허브 (불균등 삼각형 꼭짓점)
  people: { x: 128, y: 154 },
  time: { x: 336, y: 124 },
  places: { x: 222, y: 320 },
  // 가지 노드 (허브마다 다른 형태로 연결)
  pa: { x: 64, y: 110 }, // people 위쪽
  pb: { x: 42, y: 192 }, // pa 에서 한 단계 더 (왼쪽 체인)
  ta: { x: 400, y: 90 }, // time 위쪽 단독
  tb: { x: 408, y: 200 }, // time 오른쪽
  tc: { x: 372, y: 272 }, // tb 에서 한 단계 더 (오른쪽 체인)
  la: { x: 306, y: 356 }, // places 오른쪽 단독
  // 떠다니는 입자 (연결 안 함, 불규칙 분포, 가장자리로 갈수록 사라짐)
  s1: { x: 92, y: 286 },
  s2: { x: 250, y: 52 },
  s3: { x: 158, y: 374 },
  s4: { x: 158, y: 244 },
  s5: { x: 296, y: 206 },
};

// [노드키, 색조]
const DOTS: [string, "near" | "mid" | "far" | "ring"][] = [
  ["pa", "mid"],
  ["pb", "ring"],
  ["ta", "ring"],
  ["tb", "mid"],
  ["tc", "far"],
  ["la", "mid"],
  ["s1", "far"],
  ["s2", "ring"],
  ["s3", "far"],
  ["s4", "far"],
  ["s5", "far"],
];

const R: Record<string, number> = { near: 4.5, mid: 3.6, far: 2.6, ring: 4 };

// 삼각형 백본 + 비대칭 가지
const LINKS: [string, string][] = [
  ["people", "time"],
  ["time", "places"],
  ["places", "people"],
  // people: 왼쪽으로 2단 체인
  ["people", "pa"],
  ["pa", "pb"],
  // time: 위로 하나 + 오른쪽으로 2단 체인 (오른쪽이 더 빽빽)
  ["time", "ta"],
  ["time", "tb"],
  ["tb", "tc"],
  // places: 오른쪽으로 하나만
  ["places", "la"],
];

const HUBS: { key: string; ko: string; en: string; delay: number }[] = [
  { key: "people", ko: "사람", en: "PEOPLE", delay: 0 },
  { key: "time", ko: "시간", en: "TIME", delay: 1.1 },
  { key: "places", ko: "장소", en: "PLACES", delay: 2.2 },
];

// 중심에서 멀어질수록 옅어지는 투명도
const CENTER: Pt = { x: 228, y: 206 };
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

      {/* 삼각형 백본 + 가지 (가지는 바깥 끝이 옅어지도록 거리 페이드) */}
      <g className="mission-net__links">
        {LINKS.map(([from, to], idx) => {
          const a = PT[from];
          const b = PT[to];
          const isBackbone = HUB_KEYS.has(from) && HUB_KEYS.has(to);
          const op = isBackbone ? 0.34 : Math.min(0.32, fade(b) * 0.5);
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
