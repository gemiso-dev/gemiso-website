/**
 * 미션 히어로 네트워크 비주얼 (순수 SVG).
 * 사람·시간·장소 세 허브를 직선 삼각형으로 깔끔하게 연결하고,
 * 주변에는 중심에서 멀어질수록 사라지는 입자만 흩어 둔다.
 * 색·글로우는 globals.css의 .mission-net__* 를 따른다.
 */

type Pt = { x: number; y: number };

const PT: Record<string, Pt> = {
  // 허브 (삼각형 꼭짓점)
  people: { x: 132, y: 148 },
  time: { x: 330, y: 142 },
  places: { x: 228, y: 320 },
  // 떠다니는 입자 (서로 연결 안 함, 가장자리로 갈수록 사라짐)
  s1: { x: 66, y: 108 },
  s2: { x: 56, y: 200 },
  s3: { x: 92, y: 288 },
  s4: { x: 152, y: 70 },
  s5: { x: 256, y: 60 },
  s6: { x: 382, y: 94 },
  s7: { x: 404, y: 184 },
  s8: { x: 386, y: 268 },
  s9: { x: 318, y: 344 },
  s10: { x: 160, y: 360 },
  s11: { x: 100, y: 348 },
  s12: { x: 300, y: 230 },
};

// [노드키, 색조] — near=accent, mid=중간 블루, far=옅은 블루, ring=테두리
const DOTS: [string, "near" | "mid" | "far" | "ring"][] = [
  ["s1", "ring"],
  ["s2", "far"],
  ["s3", "mid"],
  ["s4", "far"],
  ["s5", "ring"],
  ["s6", "far"],
  ["s7", "mid"],
  ["s8", "far"],
  ["s9", "ring"],
  ["s10", "far"],
  ["s11", "mid"],
  ["s12", "far"],
];

const R: Record<string, number> = { near: 4.5, mid: 3.4, far: 2.6, ring: 4 };

// 세 허브를 잇는 직선 삼각형
const LINKS: [string, string][] = [
  ["people", "time"],
  ["time", "places"],
  ["places", "people"],
];

const HUBS: { key: string; ko: string; en: string; delay: number }[] = [
  { key: "people", ko: "사람", en: "PEOPLE", delay: 0 },
  { key: "time", ko: "시간", en: "TIME", delay: 1.1 },
  { key: "places", ko: "장소", en: "PLACES", delay: 2.2 },
];

// 중심에서 멀어질수록 옅어지는 투명도
const CENTER: Pt = { x: 230, y: 204 };
function fade(p: Pt): number {
  const d = Math.hypot(p.x - CENTER.x, p.y - CENTER.y);
  return Math.max(0.1, Math.min(0.88, 0.9 - (d / 230) * 0.85));
}

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

      {/* 삼각형 연결선 */}
      <g className="mission-net__links">
        {LINKS.map(([from, to], idx) => (
          <line
            key={idx}
            x1={PT[from].x}
            y1={PT[from].y}
            x2={PT[to].x}
            y2={PT[to].y}
            className="mission-net__link"
          />
        ))}
      </g>

      {/* 떠다니는 입자 (가장자리로 갈수록 사라짐) */}
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
