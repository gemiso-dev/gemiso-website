/**
 * 홈 진입 팝업(행사 안내) 데이터 — 단일 소스.
 * 노출 기간이 지나면(endsAt 이후) 팝업은 자동으로 뜨지 않는다.
 * 다음 행사로 교체할 때는 id를 바꿔 "오늘 하루 보지 않기" 기록을 초기화한다.
 */

export type EventPopup = {
  /** 저장소 키 구분용. 팝업 내용을 갈아끼우면 함께 바꾼다. */
  id: string;
  /** 노출 종료 시각(ISO, KST). 이 시각 이후로는 팝업을 띄우지 않는다. */
  endsAt: string;
  eyebrow: string;
  title: { lead: string; name: string; tail: string };
  /** 본문 단락. */
  paragraphs: string[];
  launch: {
    heading: string;
    rows: { label: string; value: string }[];
  };
  exhibition: {
    heading: string;
    note: string;
    rows: { label: string; value: string }[];
    items: string[];
  };
  cta: { label: string; href: string };
};

export const EVENT_POPUP: EventPopup = {
  id: "nmf-2026-modio-launch",
  endsAt: "2026-11-11T18:00:00+09:00",
  eyebrow: "2026 차세대 미디어 페스티벌",
  title: {
    lead: "통합 라디오 애플리케이션",
    name: "<모디오>",
    tail: "공식 론칭",
  },
  paragraphs: [
    "KBS·MBC·SBS·EBS·CBS, 국내 주요 라디오 방송 5개사가 참여하는 통합 라디오 애플리케이션 <모디오>가 공식 론칭됩니다.",
    "제머나이소프트는 플랫폼 구축에 참여하여 실시간 AI 자막 등 차세대 라디오 서비스를 위한 기술을 선보입니다.",
  ],
  launch: {
    heading: "통합 라디오 애플리케이션 론칭쇼",
    rows: [
      { label: "일시", value: "2026년 11월 11일(수) 11:10~11:20" },
      { label: "장소", value: "서울드래곤시티 한라홀 1·2" },
    ],
  },
  exhibition: {
    heading: "AI 방송·미디어 솔루션 전시",
    note: "행사 당일 한라홀 3에서는 제머나이소프트의 AI 방송·미디어 솔루션 전시도 함께 진행됩니다.",
    rows: [
      { label: "장소", value: "서울드래곤시티 한라홀 3" },
      { label: "운영", value: "10:00~18:00" },
    ],
    items: ["숏틱(Shorttic)", "실시간 STT", "Proxima·MAIA AI", "MAIA AI QC"],
  },
  cta: {
    label: "행사 안내 보기",
    href: "https://26nmf.website.ne.kr/",
  },
};
