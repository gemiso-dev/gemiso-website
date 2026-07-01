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
      "제머나이소프트가 개발하는 기술을 통해 사람들을 연결하고, 공동체를 만들겠다는 의지를 보여줍니다.",
    body:
      "제머나이소프트는 TV 및 유튜브와 같은 매스미디어 산업의 강력한 미디어 플랫폼 기술을 개발합니다. 이러한 미디어들은 시간과 장소에 관계없이 개인 간의 연결과 상호 작용을 도울 수 있습니다. 우리는 미디어 기술을 활용하여 시간과 거리의 장벽을 넘어 사람들의 다양성을 존중하면서도 하나로 모으고자 하는 조금은 순진한 꿈을 꾸고 있습니다.",
    diagram: "people",
    caption: "PEOPLE · 연결과 상호작용",
  },
  {
    no: "02",
    mono: "MEDIA CONNECTING TIME",
    en: "Media Connecting Time",
    title: ["시간을", "연결하다"],
    lead: "미디어가 시간을 넘어 존재하면서 과거와 현재를 연결함을 이야기합니다.",
    body:
      "천 년 전의 책을 이용해 우리는 과거를 들여다보고 새로운 콘텐츠를 만들어 미래 세대로 넘겨줍니다. 영상과 같은 미디어 콘텐츠가 아카이브 되었을 때, 우리들은 역사의 서로 다른 시기, 서로 다른 순간을 조금 더 가깝게 연결할 수 있을 것입니다. 제머나이소프트는 아카이브가 가장 힘든 영상이라는 데이터를 아카이브할 수 있는 기술을 개발합니다. 이렇게 우리 기술로 아카이빙 된 미디어를 통해 사람들은 과거의 사건과 문화를 경험할 수 있게 될 것이고, 이러한 아카이브 콘텐츠를 활용하여 과거에서 미래까지 다양한 시간대에 걸쳐 연결될 수 있을 것이라고 믿습니다.",
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
      "미디어를 통해 서로 다른 장소에 있는 사람들이 문화, 아이디어, 경험을 확장하고 공유할 수 있을 것이라는 우리의 믿음을 보여줍니다.",
    body:
      "우리는 지리적 한계를 넘어, 한 장소의 문화와 콘텐츠가 다른 장소로 확장될 수 있도록 돕는 미디어 기술 개발에 도전하고 있습니다. 미디어는 새로운 문화적 경험과 가치를 발견하고 전달하는 매개체입니다. 우리는 미디어를 통해 서로의 세계에 대한 더 나은 통찰을 제공하여 다양한 지역의 사람들을 연결할 것입니다. 우리가 만드는 미디어 기술로 물리적 경계를 초월해 다양한 문화와 관점을 공유하고 감상할 수 있는 글로벌 연결을 만들어가겠습니다.",
    diagram: "places",
    caption: "PLACES · 경계를 넘어",
  },
];
