/**
 * 미션 히어로 네트워크 비주얼 (순수 SVG).
 * 사람·시간·장소 세 허브를 직선 삼각형으로 잇고(백본), 허브마다 방향이 다른
 * 불규칙한 가지를 뻗어 비대칭적이고 자연스러운 네트워크를 만든다.
 * 밝은 노드는 부드러운 글로우를 갖고, 중심에서 멀어질수록 옅어진다.
 * 색·글로우는 globals.css의 .mission-net__* 를 따른다.
 */

type Pt = { x: number; y: number };

const PT: Record<string, Pt> = {
  // 허브 (불균등 삼각형 꼭짓점)
  people: { x: 128, y: 154 },
  time: { x: 336, y: 124 },
  places: { x: 222, y: 320 },
  // people 가지 (위 분기 + 왼쪽 아래로)
  pa: { x: 64, y: 108 },
  pb: { x: 40, y: 188 },
  pc: { x: 100, y: 58 },
  pl: { x: 28, y: 252 }, // 왼쪽-아래로 뻗음
  // time 가지 (위 둘 + 오른쪽)
  ta: { x: 402, y: 88 },
  td: { x: 296, y: 58 },
  tb: { x: 408, y: 202 },
  tc: { x: 372, y: 272 },
  tr: { x: 434, y: 190 }, // 오른쪽으로 뻗음
  // places 가지 (왼쪽 가로 + 오른쪽 가로 아래)
  lc: { x: 168, y: 358 },
  ll: { x: 86, y: 366 }, // 왼쪽 가로로 뻗음
  lr1: { x: 334, y: 352 }, // 오른쪽 아래
  lr2: { x: 430, y: 350 }, // 오른쪽 가로로 더 뻗음
  // 떠다니는 입자 (연결 안 함, 불규칙 분포, 가장자리로 갈수록 사라짐)
  s1: { x: 96, y: 292 },
  s2: { x: 250, y: 50 },
  s3: { x: 160, y: 382 },
  s6: { x: 372, y: 168 },
  s7: { x: 202, y: 96 },
  s8: { x: 120, y: 322 },
  s9: { x: 286, y: 232 },
  s10: { x: 36, y: 132 },
};

// [노드키, 색조] — near/mid 는 부드러운 글로우를 갖는다
const DOTS: [string, "near" | "mid" | "far" | "ring"][] = [
  ["pa", "near"],
  ["pb", "ring"],
  ["pc", "far"],
  ["pl", "far"],
  ["ta", "ring"],
  ["td", "far"],
  ["tb", "near"],
  ["tc", "far"],
  ["tr", "far"],
  ["lc", "ring"],
  ["ll", "far"],
  ["lr1", "mid"],
  ["lr2", "far"],
  ["s1", "far"],
  ["s2", "ring"],
  ["s3", "far"],
  ["s6", "far"],
  ["s7", "ring"],
  ["s8", "far"],
  ["s9", "far"],
  ["s10", "far"],
];

const R: Record<string, number> = { near: 4.6, mid: 3.6, far: 2.5, ring: 4 };

// 삼각형 백본 + 비대칭 가지
const LINKS: [string, string][] = [
  ["people", "time"],
  ["time", "places"],
  ["places", "people"],
  // people: 위 분기 + 왼쪽 아래
  ["people", "pa"],
  ["pa", "pb"],
  ["pa", "pc"],
  ["pb", "pl"],
  // time: 위 둘 + 오른쪽 (+ 오른쪽 아래)
  ["time", "ta"],
  ["time", "td"],
  ["time", "tb"],
  ["tb", "tc"],
  ["tb", "tr"],
  // places: 왼쪽 가로 + 오른쪽 가로
  ["places", "lc"],
  ["lc", "ll"],
  ["places", "lr1"],
  ["lr1", "lr2"],
];

const HUBS: { key: string; ko: string; en: string; delay: number }[] = [
  { key: "people", ko: "사람", en: "PEOPLE", delay: 0 },
  { key: "time", ko: "시간", en: "TIME", delay: 1.1 },
  { key: "places", ko: "장소", en: "PLACES", delay: 2.2 },
];

// 중심에서 멀어질수록 옅어지는 투명도 (가장자리에서 더 강하게 사라짐)
const CENTER: Pt = { x: 228, y: 206 };
function fade(p: Pt): number {
  const d = Math.hypot(p.x - CENTER.x, p.y - CENTER.y);
  return Math.max(0.06, Math.min(0.92, 1.02 - (d / 208) * 0.98));
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
        <radialGradient id="netDotGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="65%" stopColor="#3b82f6" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 삼각형 백본 + 가지 (가지는 바깥 끝이 옅어지도록 거리 페이드) */}
      <g className="mission-net__links">
        {LINKS.map(([from, to], idx) => {
          const a = PT[from];
          const b = PT[to];
          const isBackbone = HUB_KEYS.has(from) && HUB_KEYS.has(to);
          const op = isBackbone ? 0.34 : Math.min(0.3, fade(b) * 0.5);
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

      {/* 노드 (밝은 노드는 부드러운 글로우, 가장자리로 갈수록 사라짐) */}
      {DOTS.map(([key, tier], idx) => {
        const { x, y } = PT[key];
        const op = fade(PT[key]);
        const glowy = tier === "near" || tier === "mid";
        return (
          <g key={idx}>
            {glowy && (
              <circle
                cx={x}
                cy={y}
                r={R[tier] * 3.2}
                fill="url(#netDotGlow)"
                style={{ opacity: op * 0.9 }}
              />
            )}
            <circle
              cx={x}
              cy={y}
              r={R[tier]}
              className={`mission-net__dot mission-net__dot--${tier}`}
              style={{ opacity: op }}
            />
          </g>
        );
      })}

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
            <rect
              x={x - 6}
              y={y - 6}
              width={12}
              height={12}
              className="mission-net__core"
            />
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
