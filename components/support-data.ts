/**
 * 고객지원 데이터 — 고객지원 페이지(/support)의 단일 소스.
 * 디자인(Gemiso Support KR, 변형 A)의 콘텐츠를 그대로 옮겨온 것.
 *
 * 히어로 태그 / 연락처 / 오피스 세 묶음으로 나눠 관리한다.
 */

/** 히어로 하단 안내 칩. */
export const SUPPORT_HERO_TAGS: string[] = [
  "1영업일 이내 회신",
  "원격 · 현장 기술 지원",
  "솔루션 도입 상담",
];

/** 연락처 한 칸(전화/팩스/이메일/운영시간). */
export type ContactMethod = {
  /** 모노 라벨 (예: TEL, E-MAIL) */
  label: string;
  /** 표시값 */
  value: string;
  /** 보조 설명 */
  note: string;
  /** 클릭 가능한 경우의 링크 (tel: / mailto:) */
  href?: string;
};

export const CONTACT_METHODS: ContactMethod[] = [
  { label: "TEL", value: "02-857-1101", note: "대표 전화", href: "tel:+82285711101" },
  { label: "FAX", value: "02-6009-9031", note: "팩스" },
  {
    label: "E-MAIL",
    value: "sales@gemiso.com",
    note: "영업 · 기술 문의",
    href: "mailto:sales@gemiso.com",
  },
  { label: "HOURS", value: "09:00–18:00", note: "평일 · KST" },
];

/** 오피스(거점) 한 곳. */
export type Office = {
  /** 모노 태그 (예: KR · SEOUL) */
  tag: string;
  /** 거점명 */
  name: string;
  /** 주소 */
  addr: string;
  /** 구글 지도 검색 링크 */
  mapHref: string;
};

/** 구글 지도 검색 URL을 만든다. */
function mapHref(query: string): string {
  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(query)
  );
}

export const OFFICES: Office[] = [
  {
    tag: "KR · SEOUL",
    name: "서울 본사",
    addr: "서울특별시 마포구 월드컵북로 402, 케이지아이티센터 1802호",
    mapHref: mapHref("서울특별시 마포구 월드컵북로 402 케이지아이티센터"),
  },
  {
    tag: "KR · SEOUL",
    name: "MCC · 미디어 컨트롤 센터",
    addr: "서울특별시 구로구 디지털로33길 11, 에이스테크노타워8차 408호",
    mapHref: mapHref("서울특별시 구로구 디지털로33길 11 에이스테크노타워8차"),
  },
  {
    tag: "VN · HO CHI MINH",
    name: "베트남 대표 사무소",
    addr: "1444 Đường 3/2, Phường 2, Quận 11, Thành phố Hồ Chí Minh, Vietnam",
    mapHref: mapHref("1444 Duong 3/2 Phuong 2 Quan 11 Ho Chi Minh Vietnam"),
  },
];
