/**
 * 고객사 데이터 — 회사소개 > 고객사 페이지(/customers)의 단일 소스.
 * 디자인(Gemiso Customers KR)의 콘텐츠를 그대로 옮겨온 것.
 *
 * 분야(category)별 고객사 목록과 대표 구축 사례를 한 곳에서 관리한다.
 * 새 고객사/사례가 추가되면 해당 배열에 항목을 더하면 된다.
 *
 * 로고: 각 고객사는 안정적인 slug를 가지며, 로고 파일을
 *   public/assets/customers/<slug>.png
 * 경로에 두면 그리드에 자동으로 표시된다. 파일이 없으면 회사명 텍스트로 대체된다.
 * (CustomersExplorer가 <img onError>로 누락/깨진 로고를 텍스트로 폴백한다.)
 */

/** 히어로 상단 요약 지표. */
export const CUSTOMER_STATS: { v: string; k: string }[] = [
  { v: "600+", k: "구축 · 개발 실적" },
  { v: "전국", k: "주요 방송사 운영" },
  { v: "8개국+", k: "해외 시스템 구축" },
  { v: "20년+", k: "쌓아온 신뢰" },
];

/** 대표 구축 사례 카드. */
export type CaseStudy = {
  /** 고객사명 */
  client: string;
  /** 모노 태그 (예: CASE STUDY, AI) */
  tag: string;
  /** 핵심 성과 한 줄 */
  outcome: string;
  /** 한 줄 설명 */
  desc: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    client: "YTN",
    tag: "CASE STUDY",
    outcome: "소재 검색 시간 70% 단축",
    desc: "MAM과 아카이브를 단일 카탈로그로 통합해 검색 속도를 크게 높였습니다.",
  },
  {
    client: "MBC",
    tag: "CASE STUDY",
    outcome: "뉴스룸 Zodiac 전면 전환",
    desc: "취재부터 송출까지 하나의 뉴스룸으로 통합했습니다.",
  },
  {
    client: "EBS",
    tag: "PARTNERSHIP",
    outcome: "콘텐츠 아카이브 고도화",
    desc: "방대한 교육 콘텐츠를 검색 가능한 장기 아카이브로 전환합니다.",
  },
  {
    client: "아리랑 TV",
    tag: "AI",
    outcome: "이중언어 AI 앵커 구현",
    desc: "한국어·영어를 동시에 전달하는 AI 앵커를 구축했습니다.",
  },
];

/** 고객사 분야 분류. id는 customer.cat과 매칭된다. */
export type CustomerCategory = { id: string; label: string };

export const CUSTOMER_CATEGORIES: CustomerCategory[] = [
  { id: "all", label: "전체" },
  { id: "media", label: "미디어" },
  { id: "gov", label: "공공" },
  { id: "enterprise", label: "기업" },
  { id: "edu", label: "교육" },
  { id: "finance", label: "금융" },
  { id: "global", label: "해외" },
];

export type Customer = {
  /** 표시 이름 (로고 파일이 없을 때 텍스트로 노출) */
  name: string;
  /** 분야 id (CustomerCategory.id) */
  cat: string;
  /** 로고 파일명 slug — /assets/customers/<slug>.png */
  slug: string;
};

/** 고객사 로고 파일 경로(basePath 없이 기록). asset()로 감싸 사용한다. */
export function customerLogo(slug: string): string {
  return `/assets/customers/${slug}.png`;
}

/** [이름, slug] 튜플 배열을 분야 cat의 Customer[]로 펼친다. */
function group(cat: string, rows: [name: string, slug: string][]): Customer[] {
  return rows.map(([name, slug]) => ({ name, slug, cat }));
}

export const CUSTOMERS: Customer[] = [
  ...group("media", [
    ["MBC", "mbc"],
    ["SBS", "sbs"],
    ["KBS", "kbs"],
    ["EBS", "ebs"],
    ["YTN", "ytn"],
    ["연합뉴스TV", "yonhapnews-tv"],
    ["채널A", "channel-a"],
    ["아리랑국제방송", "arirang"],
    ["TBS 교통방송", "tbs"],
    ["KTV 국민방송", "ktv"],
    ["CJ ENM", "cj-enm"],
    ["SBS 미디어넷", "sbs-medianet"],
    ["KNN", "knn"],
    ["대구방송 TBC", "tbc"],
    ["광주MBC", "gwangju-mbc"],
    ["가톨릭평화방송", "cpbc"],
    ["GS홈쇼핑", "gs-shop"],
    ["CJ오쇼핑", "cj-oshopping"],
  ]),
  ...group("gov", [
    ["법무부", "moj"],
    ["대검찰청", "spo"],
    ["경찰청", "police"],
    ["국회방송", "natv"],
    ["경기도청 GTV", "gtv"],
    ["한국도로공사", "ex-korea"],
    ["농촌진흥청", "rda"],
    ["한국영상자료원", "kofa"],
    ["한국전파진흥협회", "rapa"],
    ["국제방송교류재단", "kbf"],
    ["안산시청", "ansan"],
    ["해군본부", "rokn"],
    ["공군역사기록관리단", "rokaf-history"],
    ["서울시의회", "seoul-council"],
  ]),
  ...group("enterprise", [
    ["삼성전자", "samsung-electronics"],
    ["삼성화재", "samsung-fire"],
    ["현대자동차", "hyundai-motor"],
    ["현대중공업", "hhi"],
    ["SK하이닉스", "sk-hynix"],
    ["HYBE", "hybe"],
    ["YG엔터테인먼트", "yg"],
    ["KT&G", "ktng"],
    ["KT 사내방송", "kt"],
    ["제일기획", "cheil"],
    ["백남준아트센터", "njp-art-center"],
  ]),
  ...group("edu", [
    ["서울사이버대학교", "scu"],
    ["동아방송예술대학", "dima"],
    ["한국예술종합학교", "karts"],
    ["한국장학재단", "kosaf"],
    ["동아방송대학교", "dbc"],
  ]),
  ...group("finance", [
    ["신한은행", "shinhan"],
    ["우리은행", "woori"],
    ["국민은행", "kb"],
    ["하나은행", "hana"],
    ["교보생명", "kyobo"],
    ["예금보험공사", "kdic"],
  ]),
  ...group("global", [
    ["태국 TPBS", "tpbs"],
    ["베트남 VNA", "vna"],
    ["베트남 VOV", "vov"],
    ["홍콩 TVB", "tvb"],
    ["중국 후이마이그룹", "huimai"],
    ["에티오피아 교육방송", "ebc-ethiopia"],
    ["파키스탄 라디오", "radio-pakistan"],
    ["파라과이 국영TV", "py-tv"],
    ["방글라데시 교육원", "bd-edu"],
  ]),
];
