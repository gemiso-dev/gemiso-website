/**
 * 홈 진입 팝업(행사 안내) 데이터 — 단일 소스.
 * 슬라이드마다 노출 기간(startsAt~endsAt)을 두고, 기간 안의 슬라이드만 띄운다.
 * 2장 이상이면 옆으로 넘기기·자동 회전이 켜지고, 하나도 없으면 팝업이 뜨지 않는다.
 */

export type PopupRow = {
  label: string;
  /** 배열이면 줄을 나눠 표시한다. */
  value: string | string[];
};

export type PopupBlock = {
  /** 생략하면 제목·위 구분선 없이 앞 블록에 바로 이어 붙인다. */
  heading?: string;
  rows?: PopupRow[];
  /** 짧은 태그 목록(솔루션명 등). */
  chips?: string[];
  /** 이름 + 한 줄 설명 목록. */
  features?: { name: string; desc: string }[];
};

export type PopupSlide = {
  /** 슬라이드 구분용(React key·제목 id). */
  id: string;
  /** 노출 시작 시각(ISO, KST). 생략하면 바로 노출. */
  startsAt?: string;
  /** 노출 종료 시각(ISO, KST). 이 시각 이후로는 띄우지 않는다. */
  endsAt: string;
  eyebrow: string;
  /** 제목 줄 — 줄마다 줄바꿈한다. */
  title: string[];
  /** 본문 단락. */
  paragraphs: string[];
  blocks: PopupBlock[];
  cta?: { label: string; href: string };
};

/** 자동 회전 간격(ms). */
export const POPUP_AUTOPLAY_MS = 6000;

export const POPUP_SLIDES: PopupSlide[] = [
  {
    id: "nmf-2026-modio-launch",
    endsAt: "2026-11-12T08:00:00+09:00",
    eyebrow: "2026 차세대 미디어 페스티벌",
    title: ["통합 라디오 애플리케이션", "<모디오> 공식 론칭"],
    paragraphs: [
      "KBS·MBC·SBS·EBS·CBS, 국내 주요 라디오 방송 5개사가 참여하는 통합 라디오 애플리케이션 <모디오>가 공식 론칭됩니다.",
      "제머나이소프트는 애플리케이션 개발에 참여하여 차세대 라디오 서비스를 위한 기술을 선보입니다.",
    ],
    blocks: [
      {
        heading: "통합 라디오 애플리케이션 <모디오> 론칭쇼",
        rows: [
          { label: "일시", value: "2026년 11월 11일(수) 11:10~11:20" },
          { label: "장소", value: "서울드래곤시티 한라홀 1·2" },
        ],
      },
      {
        heading: "AI 방송·미디어 솔루션 전시",
        rows: [
          { label: "일시", value: "2026년 11월 11일(수) 10:00~18:00" },
          { label: "장소", value: "서울드래곤시티 한라홀 3" },
        ],
        chips: ["숏틱(Shorttic)", "실시간 STT", "Proxima·MAIA AI", "MAIA AI QC"],
      },
    ],
    cta: {
      label: "행사 안내 보기",
      href: "https://26nmf.website.ne.kr/",
    },
  },
  {
    id: "krs-2026",
    endsAt: "2026-11-20T15:00:00+09:00",
    eyebrow: "2026 대한민국전파산업대전",
    title: ["제머나이소프트,", "KRS 2026 참가"],
    paragraphs: [
      "보이는 라디오 제작부터 미디어 콘텐츠의 검색·활용까지, 제머나이소프트의 방송·미디어 솔루션을 현장에서 만나보세요.",
    ],
    blocks: [
      {
        heading: "2026 대한민국전파산업대전(KRS 2026)",
        rows: [
          { label: "일시", value: "2026년 11월 18일(수)~20일(금)" },
          { label: "장소", value: "코엑스 2층 더플라츠 · 제머나이소프트 C403 부스" },
          { label: "관람", value: "18, 19일 10:00~17:00 / 20일 10:00~15:00" },
        ],
      },
      {
        features: [
          {
            name: "BORA Studio",
            desc: "화면 전환, 자막, 오디오 믹싱과 라이브 송출을 하나의 환경에서 운영하는 보이는 라디오 솔루션입니다.",
          },
          {
            name: "MYMY Archive",
            desc: "영상·사진·오디오 등 다양한 콘텐츠를 AI로 검색하고 공유·활용하는 미디어 아카이브입니다.",
          },
        ],
      },
    ],
    cta: {
      label: "행사 안내 보기",
      href: "https://krshow.co.kr/kor/index.asp",
    },
  },
];
