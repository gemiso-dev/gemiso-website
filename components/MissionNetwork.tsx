/**
 * 미션 히어로 네트워크 비주얼 (순수 SVG).
 * 사람·시간·장소 세 허브를 중심으로 노드와 연결선이 입체적으로 얽힌 네트워크로,
 * '연결하는 미디어'라는 미션을 시각화한다. 색은 globals.css의 --gem-accent 계열을 따른다.
 */

type Pt = { x: number; y: number };

const PT: Record<string, Pt> = {
  // 허브 (라벨 노드)
  people: { x: 112, y: 120 },
  time: { x: 332, y: 152 },
  places: { x: 198, y: 292 },
  // 주변 장식 노드
  a: { x: 52, y: 60 },
  b: { x: 56, y: 172 },
  c: { x: 154, y: 48 },
  d: { x: 176, y: 158 },
  e: { x: 100, y: 34 },
  f: { x: 396, y: 100 },
  g: { x: 400, y: 208 },
  h: { x: 300, y: 60 },
  i: { x: 360, y: 236 },
  j: { x: 276, y: 196 },
  k: { x: 122, y: 348 },
  l: { x: 262, y: 352 },
  m: { x: 142, y: 244 },
  n: { x: 270, y: 258 },
  o: { x: 214, y: 366 },
  p: { x: 244, y: 112 },
  q: { x: 166, y: 214 },
  r: { x: 296, y: 248 },
  s: { x: 68, y: 250 },
  t: { x: 366, y: 314 },
};

// [노드키, 톤, 반지름]
const DOTS: [string, "solid" | "soft" | "ring", number][] = [
  ["a", "solid", 4],
  ["b", "soft", 3],
  ["c", "ring", 5],
  ["d", "solid", 3.5],
  ["e", "soft", 2.5],
  ["f", "solid", 4],
  ["g", "ring", 4.5],
  ["h", "soft", 3],
  ["i", "solid", 3.5],
  ["j", "ring", 3],
  ["k", "soft", 3],
  ["l", "solid", 4],
  ["m", "ring", 4],
  ["n", "soft", 3],
  ["o", "solid", 3.5],
  ["p", "soft", 3],
  ["q", "solid", 3.5],
  ["r", "ring", 4],
  ["s", "soft", 3],
  ["t", "solid", 3.5],
];

const LINKS: [string, string][] = [
  ["people", "a"],
  ["people", "b"],
  ["people", "c"],
  ["people", "d"],
  ["people", "e"],
  ["time", "f"],
  ["time", "g"],
  ["time", "h"],
  ["time", "i"],
  ["time", "j"],
  ["places", "k"],
  ["places", "l"],
  ["places", "m"],
  ["places", "n"],
  ["places", "o"],
  ["people", "time"],
  ["time", "places"],
  ["places", "people"],
  ["p", "people"],
  ["p", "time"],
  ["q", "people"],
  ["q", "places"],
  ["r", "time"],
  ["r", "places"],
  ["s", "people"],
  ["s", "b"],
  ["t", "time"],
  ["t", "i"],
  ["c", "h"],
  ["d", "q"],
  ["j", "r"],
];

const HUBS: { key: string; ko: string; en: string }[] = [
  { key: "people", ko: "사람", en: "PEOPLE" },
  { key: "time", ko: "시간", en: "TIME" },
  { key: "places", ko: "장소", en: "PLACES" },
];

export default function MissionNetwork() {
  return (
    <svg
      className="mission-net__svg"
      viewBox="0 0 440 400"
      role="img"
      aria-label="사람·시간·장소를 잇는 미디어 네트워크"
    >
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

      {DOTS.map(([key, tone, r], idx) => (
        <circle
          key={idx}
          cx={PT[key].x}
          cy={PT[key].y}
          r={r}
          className={`mission-net__dot mission-net__dot--${tone}`}
        />
      ))}

      {HUBS.map((hub) => {
        const { x, y } = PT[hub.key];
        const s = 15;
        return (
          <g key={hub.key}>
            <rect
              x={x - s / 2}
              y={y - s / 2}
              width={s}
              height={s}
              className="mission-net__hub"
            />
            <text x={x} y={y + 28} className="mission-net__ko">
              {hub.ko}
            </text>
            <text x={x} y={y + 41} className="mission-net__en">
              {hub.en}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
