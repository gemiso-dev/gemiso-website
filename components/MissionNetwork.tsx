/**
 * 미션 히어로 네트워크 비주얼 (순수 SVG).
 * 사람·시간·장소 세 허브를 중심으로, 깊이감 있는 노드 메시와 흐르는 연결선으로
 * '연결하는 미디어'를 표현한다. 색·글로우는 globals.css의 .mission-net__* 를 따른다.
 */

type Pt = { x: number; y: number };

const PT: Record<string, Pt> = {
  // 허브 (라벨 노드)
  people: { x: 122, y: 140 },
  time: { x: 322, y: 116 },
  places: { x: 238, y: 308 },
  // 흐름을 잇는 중간 노드
  m1: { x: 192, y: 100 },
  m2: { x: 252, y: 92 },
  m3: { x: 162, y: 120 },
  m4: { x: 340, y: 182 },
  m5: { x: 312, y: 232 },
  m6: { x: 296, y: 272 },
  m7: { x: 172, y: 248 },
  m8: { x: 150, y: 202 },
  m9: { x: 196, y: 286 },
  c0: { x: 226, y: 188 },
  // 헤일로 (주변 장식)
  s1: { x: 60, y: 92 },
  s2: { x: 52, y: 172 },
  s3: { x: 92, y: 232 },
  s4: { x: 74, y: 300 },
  s5: { x: 250, y: 58 },
  s6: { x: 362, y: 70 },
  s7: { x: 402, y: 144 },
  s8: { x: 392, y: 246 },
  s9: { x: 356, y: 322 },
  s10: { x: 286, y: 352 },
  s11: { x: 176, y: 350 },
  s12: { x: 108, y: 332 },
};

// [노드키, 깊이] — near=선명/큼, mid=중간, far=옅음/작음, ring=테두리
const DOTS: [string, "near" | "mid" | "far" | "ring"][] = [
  ["m1", "mid"],
  ["m2", "far"],
  ["m3", "near"],
  ["m4", "mid"],
  ["m5", "far"],
  ["m6", "mid"],
  ["m7", "mid"],
  ["m8", "far"],
  ["m9", "far"],
  ["c0", "ring"],
  ["s1", "far"],
  ["s2", "ring"],
  ["s3", "far"],
  ["s4", "mid"],
  ["s5", "far"],
  ["s6", "ring"],
  ["s7", "far"],
  ["s8", "mid"],
  ["s9", "far"],
  ["s10", "ring"],
  ["s11", "far"],
  ["s12", "far"],
];

const R: Record<string, number> = { near: 5, mid: 3.6, far: 2.6, ring: 4.4 };

// [from, to, 옅게?]
const LINKS: [string, string, boolean?][] = [
  // 위쪽 흐름 (사람 → 시간)
  ["people", "m3"],
  ["m3", "m1"],
  ["m1", "m2"],
  ["m2", "time"],
  // 오른쪽 흐름 (시간 → 장소)
  ["time", "m4"],
  ["m4", "m5"],
  ["m5", "m6"],
  ["m6", "places"],
  // 왼쪽 흐름 (장소 → 사람)
  ["places", "m7"],
  ["m7", "m8"],
  ["m8", "people"],
  ["m7", "m9"],
  ["m9", "places"],
  // 중심 연결
  ["c0", "m1", true],
  ["c0", "m7", true],
  ["c0", "m4", true],
  // 은은한 삼각 구조
  ["people", "time", true],
  ["time", "places", true],
  ["places", "people", true],
  // 헤일로
  ["s1", "people", true],
  ["s2", "people", true],
  ["s1", "s2", true],
  ["s3", "s4", true],
  ["s4", "places", true],
  ["s5", "time", true],
  ["s6", "time", true],
  ["s7", "time", true],
  ["s8", "m4", true],
  ["s9", "places", true],
  ["s10", "places", true],
  ["s11", "places", true],
  ["s12", "s4", true],
];

const HUBS: { key: string; ko: string; en: string; delay: number }[] = [
  { key: "people", ko: "사람", en: "PEOPLE", delay: 0 },
  { key: "time", ko: "시간", en: "TIME", delay: 1.1 },
  { key: "places", ko: "장소", en: "PLACES", delay: 2.2 },
];

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
          <stop offset="0%" stopColor="#0f62fe" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#0f62fe" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#0f62fe" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="netHaze" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#0f62fe" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0f62fe" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 은은한 배경 헤이즈 */}
      <rect x="0" y="0" width="440" height="420" fill="url(#netHaze)" />

      {/* 연결선 */}
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

      {/* 장식 노드 */}
      {DOTS.map(([key, tier], idx) => (
        <circle
          key={idx}
          cx={PT[key].x}
          cy={PT[key].y}
          r={R[tier]}
          className={`mission-net__dot mission-net__dot--${tier}`}
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
              r={28}
              fill="url(#netGlow)"
              className="mission-net__glow"
              style={{ animationDelay: `${hub.delay}s` }}
            />
            <circle cx={x} cy={y} r={13} className="mission-net__ring" />
            <circle cx={x} cy={y} r={6.5} className="mission-net__core" />
            <text x={x} y={y + 34} className="mission-net__ko">
              {hub.ko}
            </text>
            <text x={x} y={y + 48} className="mission-net__en">
              {hub.en}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
