/**
 * 미션 히어로 네트워크 비주얼 (순수 SVG).
 * 사람·시간·장소 세 허브를 중심으로 한 미니멀 네트워크.
 * 중심에서 멀어질수록 점이 옅어지고, 가장자리 입자는 서로 잇지 않는다.
 * 색·글로우는 globals.css의 .mission-net__* 를 따른다.
 */

type Pt = { x: number; y: number };

const PT: Record<string, Pt> = {
  // 허브 (라벨 노드)
  people: { x: 132, y: 150 },
  time: { x: 322, y: 130 },
  places: { x: 234, y: 312 },
  // 허브를 잇는 중간 노드 (연결됨)
  m1: { x: 198, y: 108 },
  m2: { x: 256, y: 104 },
  m3: { x: 172, y: 130 },
  m4: { x: 332, y: 196 },
  m5: { x: 300, y: 238 },
  m6: { x: 282, y: 274 },
  m7: { x: 178, y: 250 },
  m8: { x: 158, y: 206 },
  m9: { x: 198, y: 288 },
  c0: { x: 232, y: 196 },
  // 떠다니는 입자 (서로 연결 안 함, 가장자리로 갈수록 사라짐)
  s1: { x: 64, y: 104 },
  s2: { x: 70, y: 196 },
  s3: { x: 96, y: 286 },
  s4: { x: 258, y: 56 },
  s5: { x: 372, y: 80 },
  s6: { x: 398, y: 168 },
  s7: { x: 380, y: 262 },
  s8: { x: 330, y: 330 },
  s9: { x: 168, y: 352 },
  s10: { x: 108, y: 344 },
};

// [노드키, 색조] — near=accent, mid=중간 블루, far=옅은 블루, ring=테두리
const DOTS: [string, "near" | "mid" | "far" | "ring"][] = [
  ["m1", "mid"],
  ["m2", "near"],
  ["m3", "near"],
  ["m4", "mid"],
  ["m5", "far"],
  ["m6", "mid"],
  ["m7", "mid"],
  ["m8", "far"],
  ["m9", "far"],
  ["c0", "ring"],
  ["s1", "ring"],
  ["s2", "far"],
  ["s3", "mid"],
  ["s4", "far"],
  ["s5", "ring"],
  ["s6", "far"],
  ["s7", "mid"],
  ["s8", "far"],
  ["s9", "far"],
  ["s10", "ring"],
];

const R: Record<string, number> = { near: 4.5, mid: 3.4, far: 2.6, ring: 4 };

// 연결선 — 허브와 중간 노드만 잇는다 (가장자리 입자는 제외)
const LINKS: [string, string, boolean?][] = [
  ["people", "m3"],
  ["m3", "m1"],
  ["m1", "m2"],
  ["m2", "time"],
  ["time", "m4"],
  ["m4", "m5"],
  ["m5", "m6"],
  ["m6", "places"],
  ["places", "m7"],
  ["m7", "m8"],
  ["m8", "people"],
  ["m7", "m9"],
  ["m9", "places"],
  ["c0", "m1", true],
  ["c0", "m7", true],
  ["c0", "m4", true],
  ["people", "time", true],
  ["time", "places", true],
  ["places", "people", true],
];

const HUBS: { key: string; ko: string; en: string; delay: number }[] = [
  { key: "people", ko: "사람", en: "PEOPLE", delay: 0 },
  { key: "time", ko: "시간", en: "TIME", delay: 1.1 },
  { key: "places", ko: "장소", en: "PLACES", delay: 2.2 },
];

// 중심에서 멀어질수록 옅어지는 투명도
const CENTER: Pt = { x: 224, y: 208 };
function fade(p: Pt): number {
  const d = Math.hypot(p.x - CENTER.x, p.y - CENTER.y);
  return Math.max(0.1, Math.min(0.92, 0.95 - (d / 230) * 0.85));
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

      {/* 연결선 (허브·중간 노드만) */}
      <g className="mission-net__links">
        {LINKS.map(([from, to, soft], idx) => (
          <line
            key={idx}
            x1={PT[from].x}
            y1={PT[from].y}
            x2={PT[to].x}
            y2={PT[to].y}
            className={`mission-net__link${soft ? " mission-net__link--soft" : ""}`}
          />
        ))}
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
