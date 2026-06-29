/**
 * 연혁 데이터 — 회사소개 > 연혁 페이지(/history)의 단일 소스.
 * 디자인(Gemiso History KR)의 타임라인 콘텐츠를 그대로 옮겨온 것.
 *
 * ── 갱신 방법 ──────────────────────────────────────────────────────────
 * 연혁은 계속 갱신된다. 데이터는 "오래된 → 최신" 순(연대순)으로 둔다.
 *   · 새 이정표가 생기면: 해당 시대(era)의 items 배열 "맨 끝"에 추가한다.
 *   · 새로운 시대 구간이 열리면: HISTORY_ERAS 배열 "맨 끝"에 era를 추가한다.
 * 페이지에서 최신순(역순)으로 뒤집어 렌더링하고, 점/연결선/번호 같은
 * 파생 값은 컴포넌트가 계산하므로 여기서는 신경 쓸 필요가 없다.
 *
 * 굵은 점(major)은 설립·특허·인증·핵심 제품처럼 강조할 이정표에만 쓴다.
 */

/** 타임라인 한 줄(이정표). */
export type HistoryItem = {
  /** 연도 또는 연·월 (예: "2002.10", "2015") */
  year: string;
  /** 모노 캡션 태그 — 없으면 생략 (예: FOUNDED, PATENT, GLOBAL) */
  tag?: string;
  /** 강조 이정표면 true(굵은 점). 기본은 약한 점. */
  major?: boolean;
  /** 이정표 제목 */
  title: string;
  /** 한 줄 설명 */
  desc: string;
};

/** 연대 구간(시대) — 제목/요약 + 그 안의 이정표들. */
export type HistoryEra = {
  /** 구간 표기 (예: "2002 — 2007") */
  range: string;
  /** 구간 제목 */
  title: string;
  /** 구간 요약 */
  desc: string;
  /** 연대순(오래된 → 최신) 이정표 목록 */
  items: HistoryItem[];
};

/** 히어로 상단 요약 지표. */
export const HISTORY_STATS: { v: string; k: string }[] = [
  { v: "2002", k: "제머나이소프트 설립" },
  { v: "20년+", k: "미디어 엔지니어링" },
  { v: "1등급 ×3", k: "GS 인증 획득" },
  { v: "8개국+", k: "해외 시스템 구축" },
  { v: "100명+", k: "미디어 핵심 엔지니어" },
];

/** 연대순(오래된 → 최신) 시대 목록. 페이지에서 역순으로 렌더링한다. */
export const HISTORY_ERAS: HistoryEra[] = [
  {
    range: "2002 — 2007",
    title: "창립과 첫 솔루션",
    desc: "방송 미디어 소프트웨어 한 길로 출발해, 디지털 아카이브와 자산 관리의 기초 기술을 직접 쌓았습니다.",
    items: [
      {
        year: "2002.10",
        tag: "FOUNDED",
        major: true,
        title: "(주)제머나이소프트 설립",
        desc: "방송을 위한 디지털 미디어 소프트웨어 개발을 시작했습니다.",
      },
      {
        year: "2002.12",
        tag: "PRODUCT",
        title: "SANit 스토리지 관리 프로그램 등록",
        desc: "미디어 스토리지 관리 소프트웨어로 첫 제품을 등록했습니다.",
      },
      {
        year: "2003",
        tag: "PRODUCT",
        title: "SyncRobo · SANit Share 출시",
        desc: "미디어 동기화·공유 솔루션 라인업을 갖추기 시작했습니다.",
      },
      {
        year: "2006",
        tag: "PRODUCT",
        major: true,
        title: "Ariel 멀티미디어 디지털 아카이브 솔루션 개발",
        desc: "자체 아카이브 엔진 Ariel을 개발하며 핵심 제품의 토대를 마련했습니다.",
      },
      {
        year: "2007",
        tag: "CLIENT",
        title: "CJ미디어 Mnet · 삼성전자 · 우리은행 아카이브 공급",
        desc: "방송사와 기업으로 디지털 아카이브 솔루션 공급을 넓혔습니다.",
      },
    ],
  },
  {
    range: "2008 — 2013",
    title: "기술 자립과 연구",
    desc: "핵심 원천 기술을 특허로 확보하고 기업부설연구소를 세워, 뉴스 제작과 해외 시장으로 영역을 넓혔습니다.",
    items: [
      {
        year: "2008",
        tag: "PATENT",
        major: true,
        title: "MXF 전송 기술 특허 출원 · MBC에 MXF PFR 공급",
        desc: "미디어 데이터 구조와 부분 복원(PFR) 기술을 원천 확보했습니다.",
      },
      {
        year: "2008",
        tag: "PRODUCT",
        title: "Ariel 상표 출원 · 등록",
        desc: "대표 제품 브랜드 Ariel을 공식 상표로 등록했습니다.",
      },
      {
        year: "2010.03",
        tag: "R&D",
        major: true,
        title: "기업부설연구소 설립",
        desc: "미디어 처리 기술을 지속 연구하는 전담 조직을 신설했습니다.",
      },
      {
        year: "2010",
        tag: "GLOBAL",
        title: "태국 TPBS 아카이브·MAM 시스템 구축",
        desc: "해외 공영방송으로 첫 시스템을 수출했습니다.",
      },
      {
        year: "2011",
        tag: "CLIENT",
        title: "아리랑국제방송 보도정보 · YTN 통합 뉴스 시스템 구축",
        desc: "보도·뉴스 제작 시스템으로 사업 영역을 확장했습니다.",
      },
      {
        year: "2013",
        tag: "GLOBAL",
        title: "베트남 VNA 미디어 자산 관리 시스템 구축",
        desc: "국가 통신사 규모의 해외 구축을 이어갔습니다.",
      },
    ],
  },
  {
    range: "2014 — 2018",
    title: "국산화와 인정",
    desc: "글로벌 표준과 손잡고 기술력을 공식 인정받으며, 국내 주요 방송사와 해외로 도입을 확대했습니다.",
    items: [
      {
        year: "2014.11",
        tag: "PARTNER",
        title: "SONY ODA 라이선스 협약 체결",
        desc: "광 디스크 아카이브(ODA) 기술과의 연동 기반을 확보했습니다.",
      },
      {
        year: "2015.07",
        tag: "AWARD",
        major: true,
        title: "방송장비 분야 '히든챔피언' 선정",
        desc: "한국전파진흥협회가 기술력과 시장성을 인정해 선정했습니다.",
      },
      {
        year: "2015",
        tag: "PATENT",
        title: "프로덕션 자산 관리 어플라이언스 특허 출원",
        desc: "자산 관리 전용 장치 기술을 추가로 출원했습니다.",
      },
      {
        year: "2016",
        tag: "PRODUCT",
        title: "MBC UHD 아카이브 · CJ오쇼핑 비디오 서버 개발",
        desc: "UHD 시대에 맞춰 아카이브와 송출 기술을 고도화했습니다.",
      },
      {
        year: "2018",
        tag: "GLOBAL",
        major: true,
        title: "홍콩 TVB · 에티오피아 · 중국으로 글로벌 확대",
        desc: "아시아·아프리카 방송사로 솔루션 공급을 넓혔습니다.",
      },
    ],
  },
  {
    range: "2019 — 2022",
    title: "플랫폼과 품질 인증",
    desc: "대표 플랫폼이 국가 공인 최고 등급을 잇따라 획득하고, 엔터테인먼트·AI 영역으로 고객을 확장했습니다.",
    items: [
      {
        year: "2019.07",
        tag: "CERTIFIED",
        major: true,
        title: "Proxima v3.0 GS 인증 1등급 획득",
        desc: "대표 미디어 자산 관리 플랫폼이 소프트웨어 품질 최고 등급을 충족했습니다.",
      },
      {
        year: "2019.12",
        tag: "MILESTONE",
        title: "제미소타운(사택) 오픈",
        desc: "구성원을 위한 사택을 마련하며 기반을 다졌습니다.",
      },
      {
        year: "2020.04",
        tag: "CERTIFIED",
        major: true,
        title: "Ariel GPU 트랜스코더 · 이미지 아카이브 GS 1등급",
        desc: "핵심 미디어 처리 제품군이 연이어 1등급 인증을 받았습니다.",
      },
      {
        year: "2020",
        tag: "CLIENT",
        title: "빅히트 엔터테인먼트 콘텐츠 미디어 관리 구축",
        desc: "엔터테인먼트 영역으로 미디어 관리 솔루션을 넓혔습니다.",
      },
      {
        year: "2021",
        tag: "CLIENT",
        title: "백남준아트센터 · MBC STT HUB · 국회방송 NRCS 구축",
        desc: "문화·공공 기관까지 도입처를 다양화했습니다.",
      },
      {
        year: "2022",
        tag: "AI",
        major: true,
        title: "SBS 프리미어 NLE AI 플러그인 · SAM 자막 기술 개발",
        desc: "편집·자막 워크플로우에 AI 기술을 본격 적용했습니다.",
      },
    ],
  },
  {
    range: "2023 — 2025",
    title: "AI와 차세대 미디어",
    desc: "차세대 뉴스 제작과 자동 송출, AI 학습 데이터까지 — 방송 미디어 관리의 기준을 다시 그리고 있습니다.",
    items: [
      {
        year: "2023",
        tag: "CLIENT",
        major: true,
        title: "연합뉴스TV 차세대 뉴스제작 시스템 구축",
        desc: "차세대 뉴스 제작 환경을 새롭게 설계해 구축했습니다.",
      },
      {
        year: "2023",
        tag: "CLIENT",
        title: "지역 MBC 16개사 통합 보도정보시스템 구축",
        desc: "전국 지역 방송을 하나의 보도 시스템으로 통합했습니다.",
      },
      {
        year: "2023",
        tag: "GLOBAL",
        title: "파라과이 국영TV MAM 시스템 구축",
        desc: "남미 공영방송으로 해외 구축을 이어갔습니다.",
      },
      {
        year: "2024",
        tag: "CLIENT",
        major: true,
        title: "MBC 차세대 제작 NPS · KBS 재난 콘텐츠 자동송출 구축",
        desc: "지상파 차세대 제작·재난 송출 시스템을 구축했습니다.",
      },
      {
        year: "2025.01",
        tag: "AI",
        major: true,
        title: "한국전파진흥협회 방송영상 AI 학습용 데이터 구축",
        desc: "방송 도메인 AI를 위한 학습 데이터 사업을 수행했습니다.",
      },
      {
        year: "2025",
        tag: "PRODUCT",
        title: "MYMY 콘텐츠 관리 솔루션 확산 · SBS 차세대 PDS 개발",
        desc: "KTV·한국장학재단·예금보험공사 등으로 MYMY를 넓혔습니다.",
      },
    ],
  },
];
