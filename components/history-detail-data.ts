/**
 * 상세 연혁 데이터 — 회사소개 > 연혁 > 상세 연혁 페이지(/history/detail)의 단일 소스.
 * 큐레이션된 [history-data.ts]와 달리, 2002년 설립 이후의 구축·개발·계약
 * 실적을 월 단위로 빠짐없이 담는다(기존 gemiso.co.kr/history의 전체 기록).
 *
 * ── 갱신 방법 ──────────────────────────────────────────────────────────
 * 데이터는 "오래된 → 최신" 순(연대순)으로 둔다.
 *   · 새 실적이 생기면: 해당 연도(year)의 items "맨 끝"에 추가한다.
 *   · 새 연도가 시작되면: HISTORY_DETAIL 배열 "맨 끝"에 연도 블록을 추가한다.
 * 페이지에서 최신순(역순)으로 뒤집어 렌더링한다.
 */

/** 한 해의 한 줄 실적. */
export type DetailItem = {
  /** 월 표기 (예: "10", "06") — 월이 특정되지 않은 실적은 생략한다. */
  month?: string;
  /** 실적 내용 */
  text: string;
};

/** 연도 블록 — 연도 + 그 해의 실적들(월 오름차순). */
export type DetailYear = {
  /** 연도 (예: "2002") */
  year: string;
  /** 그 해의 실적 목록(월 오름차순) */
  items: DetailItem[];
};

/** 연대순(오래된 → 최신) 상세 연혁. 페이지에서 역순으로 렌더링한다. */
export const HISTORY_DETAIL: DetailYear[] = [
  {
    year: "2002",
    items: [{ month: "10", text: "(주)제머나이소프트 설립" }],
  },
  {
    year: "2003",
    items: [{ month: "12", text: "SANit 프로그램 등록" }],
  },
  {
    year: "2004",
    items: [
      { month: "10", text: "SyncRobo V1.0 출시" },
      { month: "12", text: "SANit Share V1.0 출시" },
    ],
  },
  {
    year: "2005",
    items: [{ month: "02", text: "SyncRobo V1.4 출시" }],
  },
  {
    year: "2006",
    items: [
      { month: "08", text: "CJ미디어 Mnet 제작용 아카이브 솔루션 공급" },
      { month: "09", text: "우리은행 디지털 아카이브 솔루션 공급" },
      { month: "11", text: "Ariel 멀티미디어 디지털 아카이브 솔루션 개발" },
    ],
  },
  {
    year: "2007",
    items: [
      { month: "03", text: "삼성전자 구미2공장 송출용 아카이브 시스템 구축" },
      { month: "06", text: "GS강남방송 디지털 아카이브 시스템 구축" },
      { month: "07", text: "동아방송예술대학 학내 송출용 아카이브 시스템 구축" },
    ],
  },
  {
    year: "2008",
    items: [
      { month: "01", text: "대검찰청 영상물 관리 시스템 구축" },
      { month: "02", text: "대검찰청 영상물 관리 시스템 영상 조사 녹화 프로그램 개발" },
      { month: "03", text: "KBS 기상 방송 시스템 구축" },
      { month: "06", text: "MXF 데이터 구조 및 전송 방법 특허 출원, Ariel 상표 출원·등록" },
      {
        month: "07",
        text: "OBS SGL FlashNet Connector 개발 및 테이프 라이브러리 관리 소프트웨어 개발",
      },
      { month: "08", text: "MBC에 MXF PFR 기술 공급" },
      {
        month: "11",
        text: "ETRI 방통융합형 Full 3D 복원을 위한 실시간 인제스트 및 프리뷰 시작품 제작·공급",
      },
    ],
  },
  {
    year: "2009",
    items: [
      { month: "01", text: "한국예술종합학교 미래교육준비단 아카이빙 랩 CMS 시스템 구축" },
      { month: "02", text: "이토마토·아르떼TV·온토마토 Ariel On-Air 솔루션 공급" },
      { month: "04", text: "대전정보문화산업진흥원 MAM 아카이브 시스템 구축" },
      { month: "06", text: "아름방송(ABN) 네트워크 MAM 아카이브 시스템 구축" },
      { month: "09", text: "대검찰청 영상 녹화 조사 시스템 구축" },
      {
        month: "10",
        text: "한국전자통신연구원 다시점 멀티 카메라 시스템 영상저장 및 관리 시스템 구축",
      },
      { month: "11", text: "대검찰청 방송 콘텐츠 관리 시스템 구축" },
      { month: "12", text: "성남시 IPTV 확산 센터 콘텐츠 관리 시스템 구축" },
    ],
  },
  {
    year: "2010",
    items: [
      {
        month: "03",
        text: "육군3사관학교 디지털 통합 방송 및 교육 정보 지원 시스템 아카이브 구축",
      },
      { month: "04", text: "기업부설연구소 설립" },
      { month: "06", text: "EBS 디지털 아카이브 및 NPS 시스템 구축" },
      { month: "07", text: "MBC IMNews 영상 화질 개선 사업 완료" },
      { month: "12", text: "은평구청 디지털 자료 저장 관리 시스템 구축" },
    ],
  },
  {
    year: "2011",
    items: [
      { month: "01", text: "CJ오쇼핑 MAM 재구축" },
      { month: "03", text: "부산경남방송(KNN) 디지털 아카이브, MAM 시스템 구축" },
      { month: "07", text: "GS홈쇼핑 방송 CMS 구축" },
      { month: "10", text: "삼성엔지니어링 방송 CMS 구축" },
      { month: "12", text: "MBC 예능국 NPS 시스템 구축" },
    ],
  },
  {
    year: "2012",
    items: [
      { month: "01", text: "서울사이버대학교 방송 CMS 시스템 구축" },
      { month: "05", text: "아리랑국제방송 보도 정보 시스템 구축" },
      { month: "06", text: "울산시청 미디어 관리 시스템 구축" },
      { month: "08", text: "아리랑국제방송 아카이브 시스템 구축" },
      { month: "11", text: "전주방송(JTV) 방송용 콘텐츠 관리 MAM 시스템 구축" },
    ],
  },
  {
    year: "2013",
    items: [
      { month: "01", text: "MBC 온라인 뉴스용 비디오 인코딩 시스템 고도화 사업 개발·구축" },
      { month: "02", text: "KT 사내방송(KBN) 방송용 콘텐츠 관리 MAM 시스템 구축" },
      { month: "03", text: "대교 어린이TV 미디어 자산 관리 솔루션 공급" },
      { month: "05", text: "KCA Rewrapper·PFR·Plug-in Ariel 모듈 공급" },
      { month: "07", text: "베트남 VNA 미디어 자산 관리 시스템 구축" },
      { month: "11", text: "YTN 통합 뉴스 정보 시스템 구축" },
    ],
  },
  {
    year: "2014",
    items: [
      { month: "01", text: "채널A Proxima 아카이브 시스템 구축" },
      { month: "04", text: "SONY ODA 라이선스 협약 체결" },
      { month: "07", text: "SBS플러스·SBS미디어넷 장애인 자막 방송 개발" },
      {
        month: "09",
        text: "한국교육방송공사(EBS) 콘텐츠 표준 관리 체계 운영 시스템 개발·구축",
      },
      { month: "10", text: "대구방송(TBC) 미디어 자산 관리 시스템 구축" },
      { month: "11", text: "채널A 상암동 DDMC 제작 NPS 시스템 구축" },
    ],
  },
  {
    year: "2015",
    items: [
      { month: "07", text: "현대자동차 울산 Proxima MAM 시스템 구축" },
      { month: "08", text: "해군본부 자산 관리 엔진 시스템 구축" },
      { month: "09", text: "SBS미디어넷 MAM 시스템 확장 구축" },
      {
        month: "11",
        text: "방송용 프로덕션 자산 관리 시스템을 위한 어플라이언스 장치 특허 출원",
      },
      { month: "12", text: "2015년 방송장비 히든챔피언 기업으로 선정" },
    ],
  },
  {
    year: "2016",
    items: [
      { month: "05", text: "해군작전사령부 MAM 시스템 구축" },
      { month: "06", text: "서울시의회 영상자료 디지털 변환 및 아카이브 시스템 구축" },
      { month: "08", text: "국민은행 HD 고도화 사업 MAM 시스템 구축" },
      { month: "10", text: "경기도청 GTV MAM 시스템 구축" },
      { month: "11", text: "MBC 보도 NPS MAM 시스템 개발" },
    ],
  },
  {
    year: "2017",
    items: [
      { month: "02", text: "삼성화재 본사 방송실 이전 공사 MAM 시스템 구축" },
      { month: "07", text: "KNN Proxy CMS 서비스 구축" },
      { month: "11", text: "공군역사기록관리단 MAM 시스템 구축" },
      { month: "12", text: "베트남 VOV 국영 방송국 Proxima Encoder 공급" },
    ],
  },
  {
    year: "2018",
    items: [
      { month: "01", text: "KT&G 아카이브 시스템 구축" },
      { month: "02", text: "전남정보문화산업진흥원 MAM 시스템 구축" },
      { month: "05", text: "교보생명 MAM 시스템 구축" },
      { month: "07", text: "CJ오쇼핑 방송용 비디오 서버 개발·구축" },
      { month: "11", text: "MBC UHD 아카이브 시스템 개발·구축" },
      { month: "12", text: "KEB하나은행 MAM 시스템 구축" },
    ],
  },
  {
    year: "2019",
    items: [
      { month: "01", text: "EBS NPS·아카이브·송출 MAM 이전 및 고도화 시스템 구축" },
      { month: "02", text: "SK Hynix 사내방송 아카이브 MAM 시스템 구축" },
      { month: "07", text: "경기도의회 아카이브 MAM 시스템 구축" },
    ],
  },
  {
    year: "2020",
    items: [
      { month: "01", text: "Ariel GPU 트랜스코더 V1.0 GS인증 1등급 획득" },
      { month: "02", text: "빅히트 엔터테인먼트 디지털 콘텐츠 미디어 관리 시스템 구축 계약" },
      { month: "03", text: "Ariel 이미지 아카이브 V1.0 GS인증 1등급 획득" },
      { month: "04", text: "CJ ENM 통합 CMS 구축 계약" },
      { month: "05", text: "문화체육관광부 해외문화홍보원 MAM 구축 계약" },
      { month: "06", text: "CJ오쇼핑 스트리밍 솔루션 개발 계약" },
      { month: "07", text: "GS홈쇼핑 Ariel MAM S/W 업그레이드 계약" },
      { month: "10", text: "아리랑TV 2020년 영어 재난방송 시스템 구축 계약" },
      { month: "11", text: "CJ ENM 통합 아카이브 구축 계약" },
    ],
  },
  {
    year: "2021",
    items: [
      {
        month: "01",
        text: "TBS 교통방송 이미지 아카이브 및 기사 전송, 재난방송 시스템 구축 계약",
      },
      { month: "03", text: "TBS 교통방송 보도정보 속보자막 송출기능 업그레이드 계약" },
      { month: "04", text: "SBS미디어넷 CMS/NDS 고도화 구축 계약" },
      { month: "05", text: "신한은행 신한방송국 디지털 UHD 인프라 구축 계약" },
      { month: "06", text: "국제방송교류재단 방송정보화시스템 구매설치 계약" },
      { month: "08", text: "SBS미디어넷 CMS 고도화 개발 계약" },
      { month: "09", text: "CJ ENM 표준메타 Open API 개발 계약" },
      { month: "11", text: "해군본부 해군 미디어 자산관리 공유 스토리지 공급 계약" },
      { month: "12", text: "MBC 보도 NPS MARS/MIDAS 고도화 개발 계약" },
    ],
  },
  {
    year: "2022",
    items: [
      { month: "01", text: "CJ ENM 21 COCOS(CMS) 고도화 계약" },
      { month: "04", text: "국회방송 보도정보시스템 구축 계약" },
      { month: "05", text: "백남준아트센터 디지털 서비스 플랫폼(MAM) 구축 계약" },
      { month: "09", text: "SBS미디어넷 인제스트 매니저 구매 계약" },
      { month: "12", text: "현대중공업 울산 Ariel MAM 시스템 구축 계약" },
    ],
  },
  {
    year: "2023",
    items: [
      { month: "01", text: "하이브 DCM 시스템 업그레이드" },
      { month: "04", text: "KBS 디지털뉴스룸 시스템 강화 및 재난방송 최적화 사업" },
      { month: "05", text: "동아방송대 MAM 시스템 구축" },
      { month: "06", text: "동대문구청 MAM 시스템 구축" },
      { month: "07", text: "현대중공업 울산 MAM 시스템 구축" },
      { month: "09", text: "EBS 웹서비스 인코딩 운영을 위한 업그레이드 및 방송 장비 구축" },
      { month: "11", text: "CJ ENM 통합 아카이브 고도화" },
      { month: "12", text: "경기도청 CMS 아카이브 S/W 업그레이드" },
    ],
  },
  {
    year: "2024",
    items: [
      { month: "01", text: "EBS TAKER SYSTEM 구매 계약" },
      { month: "02", text: "채널A 상암DDMC 후반제작 NPS 연동 Customization 개발 계약" },
      { month: "04", text: "GS리테일 숏픽 등록 프로세스 개선을 위한 CMS 개발 계약" },
      { month: "05", text: "지역MBC 16개사 통합 정보시스템 2차 구축 계약" },
      { month: "06", text: "CJ ENM COCOS 고도화 구축 계약" },
      { month: "07", text: "KTV Proxima 콘텐츠 관리 솔루션 구매 계약" },
      { month: "08", text: "MBC 차세대 제작 NPS 구축 계약" },
      { month: "11", text: "KBS 디지털 24 재난 콘텐츠 자동송출 시스템 구축" },
      { month: "12", text: "MBC 뉴스 NPS 제4차 고도화 사업 소프트웨어 개발" },
    ],
  },
  {
    year: "2025",
    items: [
      { month: "01", text: "전주방송 보도정보·MAM 소프트웨어 공급" },
      { month: "06", text: "KTV MYMY 콘텐츠 관리 솔루션 구축" },
      { month: "07", text: "KBN(KT 사내방송) MAM 고도화 사업" },
      { month: "08", text: "라디오코리아 방송시스템 소프트웨어 고도화" },
      { month: "10", text: "SKB 25년 CATV 지역채널 DR 송출시스템 구축" },
      { month: "11", text: "KBS 멀티플랫폼 통합주조 MAM 소프트웨어 공급" },
    ],
  },
  {
    year: "2026",
    items: [
      { month: "01", text: "NAVER Cloud MSP 파트너십 체결" },
      {
        month: "04",
        text: "방송미디어 R&D '마이미디어 플랫폼 핵심기술개발' 총괄 (KETI·ETRI 공동)",
      },
    ],
  },
];
