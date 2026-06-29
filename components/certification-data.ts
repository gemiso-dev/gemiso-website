/**
 * 인증 현황 데이터 — 회사소개 > 인증 현황 페이지(/certification)의 단일 소스.
 * 디자인(Gemiso Certification KR)의 콘텐츠를 그대로 옮겨온 것.
 *
 * GS 인증(한국정보통신기술협회·TTA)과 보유 특허를 한 곳에서 관리한다.
 * 새 인증/특허가 추가되면 해당 배열에 항목을 더하면 된다.
 */

/** 히어로 상단 요약 지표. */
export const CERT_STATS: { v: string; k: string }[] = [
  { v: "5", k: "GS 인증 1등급" },
  { v: "2", k: "보유 특허" },
  { v: "1등급", k: "GS 인증 최고 등급" },
  { v: "TTA", k: "국가 공인 (한국정보통신기술협회)" },
];

/** GS 인증(1등급) 솔루션 목록. */
export type GsCert = {
  /** 솔루션·버전명 (예: "프록시마 V6.0") */
  name: string;
  /** 분류 한 줄 (예: "AI 콘텐츠 관리 솔루션") */
  cat: string;
  /** 모노 태그 (예: AI MAM, ARCHIVE) */
  tag: string;
  /** 인증서 이미지 경로(/assets/certification/...) — basePath 없이 기록 */
  img: string;
};

export const GS_CERTS: GsCert[] = [
  {
    name: "프록시마 V6.0",
    cat: "AI 콘텐츠 관리 솔루션",
    tag: "AI MAM",
    img: "/assets/certification/gs-proxima-v6.jpg",
  },
  {
    name: "MYMY v3.0",
    cat: "콘텐츠 아카이브",
    tag: "ARCHIVE",
    img: "/assets/certification/gs-mymy-v3.jpg",
  },
  {
    name: "프록시마 v3.0",
    cat: "미디어 자산 관리",
    tag: "MAM",
    img: "/assets/certification/gs-proxima-v3.jpg",
  },
  {
    name: "에어리얼 이미지 아카이브 v1.0",
    cat: "이미지 아카이브",
    tag: "ARCHIVE",
    img: "/assets/certification/gs-ariel-image-archive.jpg",
  },
  {
    name: "에어리얼 GPU 트랜스코더 V1.0",
    cat: "GPU 트랜스코딩",
    tag: "TRANSCODE",
    img: "/assets/certification/gs-ariel-gpu-transcoder.jpg",
  },
];

/** 보유 특허 목록. */
export type Patent = {
  /** 모노 번호 라벨 (예: "PATENT 01") */
  no: string;
  /** 상태 배지 (예: "등록") */
  status: string;
  /** 특허 명칭 */
  title: string;
  /** 한 줄 설명 */
  desc: string;
  /** 특허증 이미지 경로(/assets/certification/...) — basePath 없이 기록 */
  img: string;
};

export const PATENTS: Patent[] = [
  {
    no: "PATENT 01",
    status: "등록",
    title: "데이터 구조 및 그의 전송방법",
    desc: "미디어 데이터의 구조 설계와 효율적 전송을 위한 원천 기술 — MXF 기반 파일 전송의 토대가 되었습니다.",
    img: "/assets/certification/patent-01.jpg",
  },
  {
    no: "PATENT 02",
    status: "등록",
    title:
      "녹화 중 편집 등 특정 기능을 제공하는 서버를 구현하는 데이터 처리 장치 및 방법",
    desc: "녹화와 동시에 편집 등 기능을 제공하는 서버를 구현하기 위한 데이터 처리 장치 및 방법입니다.",
    img: "/assets/certification/patent-02.jpg",
  },
];
