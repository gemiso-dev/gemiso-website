/**
 * 문의 폼 데이터 — 고객지원 페이지(/support) 문의 폼의 단일 소스.
 *
 * 백엔드는 구글폼이다: 별도 서버 없이 브라우저에서 구글폼의
 * formResponse 엔드포인트로 POST하면 응답이 구글폼(연결된 스프레드시트)에
 * 그대로 쌓인다. 정적 사이트(output: "export")에서도 동작한다.
 *
 * 주의: entry ID와 선택형 옵션의 `value` 문자열은 구글폼 정의와
 * 바이트 단위로 일치해야 한다(일부 옵션은 이중 공백 포함 — 다르면
 * 해당 항목이 접수되지 않는다). 화면 표시는 `label`을 쓴다.
 * 구글폼 필드를 수정하면 이 파일의 ID·옵션도 함께 갱신할 것.
 */

const FORM_ID = "1FAIpQLSdrCyHy6eAktvfy7OfLjyKaA5KORIYan1n9GoctA4fTvBRvtQ";

/** 구글폼 제출 엔드포인트. */
export const INQUIRY_FORM_ACTION = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

/** 구글폼 필드별 entry ID. */
export const INQUIRY_ENTRY = {
  /** 고객사명 (필수) */
  company: "entry.442751590",
  /** 담당자 성함 (필수) */
  name: "entry.1210470433",
  /** 연락처 (전화번호) */
  phone: "entry.666300350",
  /** 이메일 주소 (필수) */
  email: "entry.1084158093",
  /** 관심 있는 솔루션 분야 (체크박스, 복수) */
  solutions: "entry.905502190",
  /** 솔루션 도입 희망 시기 (객관식) */
  timeline: "entry.635518458",
  /** 문의 상세 내용 (장문) */
  message: "entry.440341019",
  /** 우리 서비스를 어떻게 알게 되셨나요? (드롭다운) */
  referral: "entry.570624548",
} as const;

/** 선택형 옵션 한 개 — label은 화면 표시용, value는 구글폼 제출용 원본. */
export type InquiryOption = {
  label: string;
  value: string;
};

/** 관심 있는 솔루션 분야 (복수 선택). */
export const INQUIRY_SOLUTIONS: InquiryOption[] = [
  { label: "미디어 자산 관리 Proxima", value: "미디어 자산 관리 Proxima" },
  { label: "뉴스룸 Zodiac (조디악)", value: "뉴스룸 Zodiac (조디악)" },
  { label: "자동 송출 Talos", value: "자동 송출 Talos" },
  { label: "라디오 Emotion", value: "라디오 Emotion" },
  { label: "오디오 파일 시스템 Winner S", value: "오디오 파일 시스템 Winner S" },
  { label: "AI 기술 MAIA", value: "AI 기술  MAIA" },
  { label: "콘텐츠 아카이브 MYMY", value: "콘텐츠 아카이브 MYMY" },
  { label: "콘텐츠 배포 G-SAM", value: "콘텐츠 배포  G-SAM" },
];

/** 솔루션 도입 희망 시기 (단일 선택). */
export const INQUIRY_TIMELINES: InquiryOption[] = [
  { label: "즉시 도입 희망", value: "즉시 도입 희망" },
  { label: "1개월 이내", value: "1개월 이내" },
  { label: "3개월 이내", value: "3개월 이내" },
  { label: "도입 시기 미정 · 정보 수집 단계", value: "도입 시기 미정/정보 수집 단계" },
];

/** 우리 서비스를 알게 된 경로 (드롭다운). */
export const INQUIRY_REFERRALS: InquiryOption[] = [
  { label: "검색 엔진 (Google, Naver 등)", value: "검색 엔진 (Google, Naver 등)" },
  { label: "SNS 광고", value: "SNS 광고" },
  { label: "지인 추천", value: "지인 추천" },
  { label: "기존 거래처", value: "기존 거래처" },
  { label: "기타", value: "기타" },
];
