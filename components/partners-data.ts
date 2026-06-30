/**
 * 파트너 데이터 — 고객지원 > 파트너 페이지(/partners)의 단일 소스.
 * 디자인(Gemiso Partners KR)의 콘텐츠를 그대로 옮겨온 것.
 *
 * 기술 협력 / 얼라이언스·학회 / 산학 협력 세 그룹으로 나눠 관리한다.
 * 새 파트너가 추가되면 해당 그룹의 items 배열에 항목을 더하면 된다.
 */

/** 히어로 상단 요약 지표. */
export const PARTNER_STATS: { v: string; k: string }[] = [
  { v: "13", k: "협력 파트너" },
  { v: "7개국+", k: "글로벌 협업" },
  { v: "SRT", k: "국제 표준 얼라이언스" },
  { v: "산학", k: "가족 대학 협력" },
];

/** 개별 파트너 항목. */
export type Partner = {
  /** 파트너명 */
  name: string;
  /** 분류 태그 (예: 공유 스토리지, 학회) */
  kind: string;
  /** 한 줄 설명 */
  desc: string;
  /** 표시용 도메인 (예: www.elecard.com) — href는 https://disp로 만든다 */
  disp: string;
  /** 로고 이미지 경로(basePath 없이 기록). 있으면 카드에 로고를 표시한다. asset()로 감싼다. */
  logo?: string;
};

/** 파트너 그룹(섹션). */
export type PartnerGroup = {
  /** 모노 머리말 (예: 기술 협력 · TECHNOLOGY) */
  eyebrow: string;
  /** 그룹 제목 */
  title: string;
  /** 그룹 설명 */
  desc: string;
  items: Partner[];
};

export const PARTNER_GROUPS: PartnerGroup[] = [
  {
    eyebrow: "기술 협력 · TECHNOLOGY",
    title: "글로벌 기술 협력",
    desc: "세계적인 미디어 기술 기업들과 함께 최고 수준의 솔루션을 만듭니다.",
    items: [
      {
        name: "Dynamic Drive Pool",
        kind: "공유 스토리지",
        desc: "미디어 제작을 위한 공유 스토리지(SAN) 솔루션",
        disp: "www.ddpsan.com",
        logo: "/assets/partners/dynamic-drive-pool.png",
      },
      {
        name: "Elecard",
        kind: "코덱 · 분석",
        desc: "영상 압축 코덱과 스트림 분석 기술",
        disp: "www.elecard.com",
        logo: "/assets/partners/elecard.png",
      },
      {
        name: "Masstech",
        kind: "미디어 관리",
        desc: "클라우드 기반 미디어 자산 관리와 아카이브",
        disp: "www.masstech.com",
        logo: "/assets/partners/masstech.png",
      },
      {
        name: "Nablet",
        kind: "코덱 SDK",
        desc: "방송용 코덱과 편집 엔진 컴포넌트",
        disp: "www.nablet.com",
        logo: "/assets/partners/nablet.png",
      },
      {
        name: "Bluefish444",
        kind: "I/O 하드웨어",
        desc: "방송용 SDI 영상 입출력 하드웨어",
        disp: "www.bluefish444.com",
        logo: "/assets/partners/bluefish444.png",
      },
      {
        name: "Matrox",
        kind: "I/O · 인코딩",
        desc: "영상 캡처와 인코딩 하드웨어",
        disp: "www.matrox.com",
        logo: "/assets/partners/matrox.png",
      },
      {
        name: "Nanocosmos",
        kind: "저지연 스트리밍",
        desc: "초저지연 라이브 스트리밍 기술",
        disp: "www.nanocosmos.de",
        logo: "/assets/partners/nanocosmos.png",
      },
      {
        name: "Solveig Multimedia",
        kind: "편집 SDK",
        desc: "영상 트리밍과 편집 SDK",
        disp: "www.solveigmm.com",
        logo: "/assets/partners/solveig-multimedia.png",
      },
      {
        name: "Advance Digital Tech",
        kind: "미디어 기술",
        desc: "방송·미디어 기술 솔루션 파트너",
        disp: "www.advancedigitaltech.com",
        logo: "/assets/partners/advance-digital-tech.png",
      },
    ],
  },
  {
    eyebrow: "얼라이언스 및 학회 · ALLIANCE",
    title: "표준과 학술 협력",
    desc: "국제 표준과 학술 연구에 참여하며 기술의 방향을 함께 그립니다.",
    items: [
      {
        name: "SRT ALLIANCE",
        kind: "표준 · 프로토콜",
        desc: "안정적 저지연 전송(SRT) 표준을 이끄는 글로벌 얼라이언스",
        disp: "www.srtalliance.org",
        logo: "/assets/partners/srt-alliance.png",
      },
      {
        name: "한국방송미디어공학회",
        kind: "학회",
        desc: "방송·미디어 공학 연구를 위한 국내 대표 학회",
        disp: "www.kibme.org",
        logo: "/assets/partners/kibme.png",
      },
    ],
  },
  {
    eyebrow: "가족 대학 · 학교 · ACADEMIA",
    title: "산학 협력",
    desc: "미디어 인재 양성을 위해 대학과 손잡고 산학 협력을 이어갑니다.",
    items: [
      {
        name: "동아방송예술대학교",
        kind: "가족 대학",
        desc: "방송·미디어 인재를 함께 양성하는 산학 협력 대학",
        disp: "www.dima.ac.kr",
        logo: "/assets/partners/dima.png",
      },
      {
        name: "서울미디어대학원대학교",
        kind: "가족 대학원",
        desc: "미디어 기술 전문 인력을 양성하는 대학원",
        disp: "www.smit.ac.kr",
        logo: "/assets/partners/smit.png",
      },
    ],
  },
];
