/**
 * 미션 페이지(/mission) 데이터 — 단일 소스.
 * 'People, Time, Places'를 잇는 미디어라는 미션을 세 기둥으로 풀어낸다.
 */

export type MissionDiagram = "people" | "time" | "places";

export type MissionPillar = {
  /** 순번 (모노 캡션) */
  no: string;
  /** 영문 모노 라벨 */
  mono: string;
  /** 본문 영문 제목 (예: Media Connecting People) */
  en: string;
  /** 제목 2줄 (예: ["사람을", "연결하다"]) */
  title: [string, string];
  /** 도입 문장(큰 리드) */
  lead: string;
  /** 본문 문단 */
  body: string;
  /** 배경 다이어그램 종류 */
  diagram: MissionDiagram;
  /** 다이어그램 하단 캡션 */
  caption: string;
  /** 옅은 배경(surface) 섹션 여부 */
  surface?: boolean;
};

/** 히어로 하단 커넥터 노드(사람·시간·장소). */
export const MISSION_NODES: { ko: string; en: string }[] = [
  { ko: "사람", en: "PEOPLE" },
  { ko: "시간", en: "TIME" },
  { ko: "장소", en: "PLACES" },
];

export const MISSION_PILLARS: MissionPillar[] = [
  {
    no: "01",
    mono: "MEDIA CONNECTING PEOPLE",
    en: "Media Connecting People",
    title: ["사람을", "연결하다"],
    lead:
      "미디어 기술로 사람과 사람을 연결하고, 서로의 생각과 경험이 모이는 더 넓은 공동체를 만들어가고자 합니다.",
    body:
      "제머나이소프트는 TV와 디지털 플랫폼을 아우르는 매스미디어 산업을 위해 견고한 미디어 플랫폼 기술을 개발합니다. 미디어는 시간과 장소의 경계를 넘어 사람과 사람을 연결하고, 서로의 생각과 경험을 나누게 합니다.\n우리는 미디어 기술이 그 연결을 더 넓고 깊게 만들 수 있다고 믿습니다. 제머나이소프트는 그 믿음을 바탕으로, 시간과 거리의 장벽을 넘어 사람과 콘텐츠를 이어가는 기술을 만들어갑니다.",
    diagram: "people",
    caption: "PEOPLE · 연결과 상호작용",
  },
  {
    no: "02",
    mono: "MEDIA CONNECTING TIME",
    en: "Media Connecting Time",
    title: ["시간을", "연결하다"],
    lead: "미디어 기술은 시간을 넘어 과거의 기록과 현재의 경험을 연결합니다.",
    body:
      "기록된 콘텐츠는 시간이 지나도 사라지지 않고, 다시 찾아보고 활용될 때 새로운 의미를 갖습니다. 오래된 영상과 자료는 단순한 데이터가 아니라, 기억과 문화, 경험을 다음 세대로 이어주는 자산이 됩니다.\n우리는 미디어 아카이브 기술이 시간 속에 흩어진 기록을 다시 연결할 수 있다고 믿습니다. 제머나이소프트는 콘텐츠를 안정적으로 보관하고 필요한 순간 다시 활용할 수 있도록, 과거의 기록이 현재와 미래로 이어지는 기술을 만들어갑니다.",
    diagram: "time",
    caption: "TIME · 과거에서 미래로",
    surface: true,
  },
  {
    no: "03",
    mono: "MEDIA CONNECTING PLACES",
    en: "Media Connecting Places",
    title: ["장소를", "연결하다"],
    lead:
      "미디어 기술로 물리적 거리를 넘어, 서로 다른 지역의 문화와 경험, 생각이 더 넓게 이어지도록 합니다.",
    body:
      "문화와 콘텐츠는 한 장소에 머무르지 않고, 미디어를 통해 더 넓은 세계로 확장됩니다. 사람들은 같은 콘텐츠를 보고 각자의 관점과 경험을 나누며, 서로 다른 문화를 더 깊이 이해하게 됩니다.\n우리는 미디어 기술이 지역과 플랫폼의 경계를 넘어 문화와 아이디어의 흐름을 확장할 수 있다고 믿습니다. 제머나이소프트는 콘텐츠가 더 많은 사람에게 안정적으로 전달되고 공유될 수 있도록, 물리적 경계를 초월하는 미디어 기술을 만들어갑니다.",
    diagram: "places",
    caption: "PLACES · 경계를 넘어",
  },
];
