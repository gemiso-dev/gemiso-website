/**
 * 솔루션 데이터 — 개별 솔루션 상세 페이지(/solutions/[slug])의 단일 소스.
 * 디자인(Gemiso Solution KR)의 6개 솔루션 콘텐츠를 그대로 옮겨온 것.
 */

/** 히어로 목업 종류 — 솔루션 성격에 맞는 장식 패널을 고른다. */
export type SolutionMockType =
  | "grid" // 미디어 자산 그리드
  | "rundown" // 뉴스 큐시트
  | "schedule" // 송출 스케줄
  | "waveform" // 라디오 멀티트랙
  | "ai"; // AI 자막/메타데이터

export type Solution = {
  /** URL 슬러그 = 해시 식별자 */
  id: string;
  /** 제품 코드(모노 캡션) */
  code: string;
  /** 제품명 */
  name: string;
  /** 한글 분류명 */
  ko: string;
  /** 카테고리 라벨 */
  cat: string;
  /** 메뉴·푸터 내비게이션용 짧은 분류 라벨(예: "자산 관리"). */
  short: string;
  /** 솔루션 탭에서 강조할 때 코드 옆에 붙는 배지(예: "AI"). 있으면 탭이 강조 스타일이 된다. */
  badge?: string;
  mock: SolutionMockType;
  /** 히어로에 쓸 실제 제품 스크린샷 경로(있으면 mock 대신 표시). asset()로 감싼다. */
  image?: string;
  tagline: string;
  desc: string;
  trust: string;
  stats: { v: string; k: string }[];
  features: { t: string; d: string; ai?: boolean; mark?: string }[];
  workflow: string[];
  specs: { k: string; v: string }[];
  /** 도입 고객 마키(있으면 가로 스크롤 섹션 표시). */
  clients?: string[];
  /** 기능 상세 섹션 제목(없으면 "다섯 개의 엔진, 하나의 {name}." 기본값). */
  detailsHeading?: string;
  /** 핵심 기능 상세 설명(있으면 이미지와 함께 모듈별 상세 섹션 표시). */
  details?: {
    /** 모듈 코드(모노 캡션) — 예: "MAIA Video" */
    code: string;
    /** 모듈 제목 */
    title: string;
    /** 영문 부제(모노) */
    sub: string;
    /** 한 문단 설명 */
    desc: string;
    /** 세부 기능 목록 */
    points: string[];
    /** 모듈 스크린샷 경로. asset()로 감싼다. 없으면 mock 목업으로 대체. */
    image?: string;
    /** 세로형(모바일 등) 스크린샷 — 폭을 좁게 제한하고 가운데 정렬한다. */
    imageNarrow?: boolean;
    /** 스크린샷이 없을 때 표시할 목업 종류(없으면 솔루션 기본 mock 사용). */
    mock?: SolutionMockType;
  }[];
};

export const SOLUTIONS: Solution[] = [
  {
    id: "proxima",
    code: "PROXIMA",
    name: "Proxima",
    ko: "미디어 자산 관리",
    cat: "미디어 자산 관리 · MAM",
    short: "자산 관리",
    mock: "grid",
    image: "/assets/solutions/proxima/main.png",
    tagline: "수집에서 배포까지, 미디어 자산의 전 과정",
    desc: "미디어가 들어오는 순간 워크플로우가 시작됩니다. 수집 · 변환 · 보관 · 분석 · 배포에 이르는 전 과정을 Proxima 하나로 제어하고 관리합니다. 모든 기능을 자체 연구개발로 구현했습니다.",
    trust: "국내외 다수 방송사 · 관공서에서 운영 중",
    stats: [
      { v: "10분 이내", k: "1시간 영상 프록시 생성" },
      { v: "국내 최초", k: "웹 브라우저 기반 MAM (2006)" },
    ],
    features: [
      { t: "다양한 미디어 수집", d: "비디오 서버 · DeckLink IO 보드 · 파일 수집 · 워치 폴더 자동 감시까지 여러 수집 경로를 지원합니다." },
      { t: "자동 프록시 변환", d: "고압축 · 저해상도 프록시를 자동 생성해 어디서나 가볍게 미리보고, GPU 가속으로 변환 시간을 줄입니다." },
      { t: "자동 카탈로깅", d: "장면 전환을 감지해 키 프레임 · 스토리보드를 추출하고, 구간 단위로 메타데이터를 붙입니다." },
      { t: "웹 기반 통합 검색", d: "검색 엔진처럼 직관적인 웹 화면에서 자산을 찾고, 더블클릭으로 바로 재생 · 편집합니다. 별도 설치가 필요 없습니다." },
      { t: "동적 메타데이터 스키마", d: "사이트 특성에 맞춰 콘텐츠 유형과 메타데이터를 관리자가 직접 정의하고, 추가 즉시 검색에 반영합니다." },
      { t: "NLE 네이티브 연동", d: "Adobe Premiere · Final Cut Pro · EDIUS용 플러그인으로 편집 결과물을 바로 MAM에 올립니다." },
      { t: "AI 분석 연동", d: "Google · Amazon Vision AI로 영상을 분석하고, STT · 자동 번역으로 자막과 메타데이터를 생성합니다.", ai: true },
      { t: "안전한 보관 · 아카이브", d: "LTFS 기반 IMArchive로 LTO · ODA에 아카이브하고, 오브젝트 스토리지로 랜섬웨어 위험을 줄입니다." },
    ],
    workflow: ["수집", "프록시 · 변환", "카탈로깅", "검색 · 메타데이터", "제작 연동", "아카이브 · 배포"],
    specs: [
      { k: "INGEST", v: "비디오 서버 · DeckLink · 파일 · 워치 폴더" },
      { k: "TRANSCODE", v: "고압축 프록시 · GPU 가속(AMD EPYC · Intel Xeon · NVIDIA)" },
      { k: "NLE", v: "Adobe Premiere · Final Cut Pro · EDIUS" },
      { k: "ARCHIVE", v: "LTFS · LTO · ODA · DIVArchive · StorNext · BlackPearl" },
      { k: "STORAGE", v: "NAS · SAN · iSCSI · AWS S3 · 오브젝트 스토리지" },
      { k: "AI", v: "Vision AI · STT(Naver · Google · Amazon) · 자동 번역" },
      { k: "DEPLOY", v: "온프레미스 · 하이브리드 클라우드" },
    ],
    detailsHeading: "여섯 개의 단계, 하나의 Proxima",
    details: [
      {
        code: "PROXIMA Ingest",
        title: "미디어 수집",
        sub: "Media Ingest",
        desc: "미디어가 들어오는 순간 워크플로우가 시작됩니다. 비디오 서버부터 파일, 자동 감시 폴더까지 다양한 경로로 미디어를 받아들입니다.",
        points: [
          "다양한 수집 모듈 — 상용 비디오 서버 · DeckLink IO 보드 · 파일 수집 · 워치 폴더 자동 감시를 지원합니다.",
          "타임라인 기반 수집 — 진행 중인 녹화를 타임라인 화면에서 실시간으로 모니터링합니다.",
          "수집 자동화 — 워치 폴더에 들어온 파일을 감지해 수집 워크플로우를 자동으로 실행합니다.",
        ],
        mock: "schedule",
        image: "/assets/solutions/proxima/ingest.png",
      },
      {
        code: "PROXIMA Transcode",
        title: "프록시 · 변환",
        sub: "Proxy & Transcoding",
        desc: "원본 영상은 용량이 커서 웹에서 바로 재생하기 어렵고 네트워크에 부담을 줍니다. 자동 트랜스코더가 고압축 · 저해상도 프록시를 만들어 어디서나 가볍게 미리봅니다.",
        points: [
          "자동 프록시 생성 — 1시간 분량 영상의 프록시를 10분 이내에 만듭니다.",
          "GPU 가속 — AMD EPYC · Intel Xeon · NVIDIA GPU 환경에서 변환을 7~12배 가속해 5~9분으로 단축합니다.",
          "포맷 변환 — 다양한 원본 포맷을 방송 · 배포용 포맷으로 변환합니다.",
        ],
        mock: "grid",
        image: "/assets/solutions/proxima/transcode.png",
      },
      {
        code: "PROXIMA Catalog",
        title: "카탈로깅",
        sub: "Cataloging",
        desc: "장면 전환을 자동으로 감지해 영상을 구조화하고, 구간마다 메타데이터를 붙여 검색 가능한 자산으로 바꿉니다.",
        points: [
          "장면 전환 감지 · 키 프레임 — 전환 지점이나 지정한 간격에서 키 프레임을 추출해 스토리보드를 생성합니다.",
          "구간 메타데이터 — 장면 구간 단위로 메타데이터를 입력하고 관리합니다.",
          "AI 자동 분석 — Google · Amazon Vision AI로 영상을 분석해 메타데이터를 자동으로 생성합니다.",
        ],
        mock: "ai",
        image: "/assets/solutions/proxima/catalog.png",
      },
      {
        code: "PROXIMA Search",
        title: "검색 · 메타데이터",
        sub: "Search & Metadata",
        desc: "일반 검색 엔진처럼 직관적인 웹 화면에서 자산을 찾습니다. 2006년 국내 최초로 웹 브라우저 기반 MAM을 선보였습니다.",
        points: [
          "웹 기반 검색 — 검색 결과를 더블클릭해 바로 재생하고, 메타데이터를 보고 편집합니다.",
          "동적 메타데이터 스키마 — 텍스트 · 트리 · 체크박스 · 날짜 · 숫자 등 다양한 유형을 관리자가 직접 정의하고, 추가하면 곧바로 검색에 반영됩니다.",
          "설치 불필요 — Chrome · Firefox · Safari · Edge 등 표준 브라우저에서 Windows · macOS · Linux 구분 없이 사용합니다.",
        ],
        mock: "grid",
        image: "/assets/solutions/proxima/search.png",
      },
      {
        code: "PROXIMA Edit",
        title: "제작 연동",
        sub: "NLE Integration",
        desc: "주요 편집 시스템에 플러그인을 제공해, 편집 결과물을 별도 프로그램 없이 바로 MAM으로 올립니다.",
        points: [
          "NLE 플러그인 — Adobe Premiere · Apple Final Cut Pro · Grass Valley EDIUS용 플러그인을 제공합니다.",
          "커스텀 패널 — 편집 패널에서 바로 MAM 자산을 검색하고 완성본을 업로드합니다.",
          "파일 기반 워크플로우 — 편집 시스템과 파일 단위로 매끄럽게 주고받습니다.",
        ],
        mock: "grid",
      },
      {
        code: "PROXIMA Archive",
        title: "아카이브 · 스토리지",
        sub: "Archive & Storage",
        desc: "미디어를 안전하게 보관합니다. LTFS 기반 IMArchive로 테이프에 아카이브하고, 다양한 스토리지와 백업을 워크플로우로 자동화합니다.",
        points: [
          "IMArchive — LTFS 기반으로 LTO · ODA에 아카이브하고, 체크섬 검증과 Restful API · 외부 솔루션(DIVArchive · StorNext · BlackPearl) 연동을 지원합니다.",
          "다양한 스토리지 — NAS · SAN · iSCSI 파일 스토리지와 AWS S3 · 오브젝트 스토리지를 지원하고, 오브젝트 스토리지로 랜섬웨어 위험을 줄입니다.",
          "자동 백업 · 접근 제어 — 워크플로우로 백업을 자동화하고 Active Directory · Open Directory로 접근을 통제합니다.",
        ],
        mock: "rundown",
        image: "/assets/solutions/proxima/archive.png",
      },
    ],
  },
  {
    id: "zodiac",
    code: "ZODIAC",
    name: "Zodiac",
    ko: "뉴스룸",
    cat: "뉴스룸 · NRCS",
    short: "뉴스룸",
    mock: "rundown",
    image: "/assets/solutions/zodiac/main.png",
    tagline: "기획에서 송출까지, 하나의 뉴스룸",
    desc: "Zodiac은 TV 뉴스를 만드는 보도 정보 시스템입니다. 기사의 배정 · 작성 · 송고 같은 기사 관리부터 뉴스 큐시트, 큐시트 기반 송출 자동화까지 — 기획에서 온에어로 이어지는 뉴스룸 전 과정을 PC와 모바일에서 하나로 잇습니다.",
    trust: "MBC · YTN · KTV · TBS · cpbc · 아리랑국제방송 등 도입",
    stats: [
      { v: "PC·모바일", k: "동일한 작업 환경" },
      { v: "MOS", k: "표준 프로토콜 연동" },
    ],
    features: [
      { t: "뉴스 기획 · 이슈 관리", d: "일별 이슈를 정리하고 순위를 조정해 기획 · 취재 · 기사화 단계로 잇고, 취재 · 차량 일정을 함께 관리합니다." },
      { t: "기사 작성 · 데스킹", d: "일반 · 속보 등 다양한 유형을 지원하고, 기사 길이에 따라 예상 시간을 자동 계산하며 데스크 승인까지 처리합니다." },
      { t: "큐시트(런다운)", d: "기사를 드래그로 배치하고 순서를 바꾸며 길이와 꼭지 수를 실시간으로 집계합니다." },
      { t: "영상 · 그래픽 연동", d: "MAM에 등록된 영상 · 그래픽을 검색 · 미리보기하고, 편집을 의뢰해 완료분을 기사에 매핑합니다." },
      { t: "송출 자동화", d: "비디오 서버 · CG · 프롬프터를 제어해 큐시트를 그대로 온에어로 내보내고, 큐시트 변경을 실시간 반영합니다." },
      { t: "모바일 보도 정보 시스템", d: "현장 기자가 모바일에서 기사를 작성 · 관리하고 영상을 검색하며 큐시트를 확인합니다." },
    ],
    workflow: ["기획", "취재", "기사 작성", "데스크 승인", "큐시트", "송출"],
    specs: [
      { k: "INTEGRATION", v: "MOS · BIS · MAM" },
      { k: "PLAYOUT", v: "비디오 서버(VDCP) · CG · 프롬프터" },
      { k: "VIDEO SERVER", v: "Harmonic · Imagine · GrassValley K2" },
      { k: "CLIENT", v: "데스크톱 · 모바일(Android · iOS) · 웹" },
      { k: "DEPLOY", v: "온프레미스 · 클라우드" },
    ],
    detailsHeading: "다섯 개의 단계, 하나의 Zodiac",
    details: [
      {
        code: "ZODIAC Planning",
        title: "뉴스 기획",
        sub: "News Planning",
        desc: "일별 이슈를 정리하고 받은 제보를 검토해 취재 일정을 세우는 기획 단계입니다. 선정한 이슈와 콘텐츠 계획을 그대로 기사로 전환합니다.",
        points: [
          "이슈 관리 — 일별 이슈 목록을 작성 · 검색하고 순위를 조정해 기획 · 취재 · 기사화 단계에서 활용합니다.",
          "만료 이슈 처리 — 기한이 지난 이슈는 기획 단계에서 사용되지 않도록 자동으로 처리합니다.",
          "취재 · 차량 일정 — 영상 취재 일정을 배정하고 취재 차량을 기간 단위로 배차 · 관리합니다.",
        ],
        image: "/assets/solutions/zodiac/planning.png",
      },
      {
        code: "ZODIAC Article",
        title: "기사 관리 · 작성",
        sub: "Article Management",
        desc: "표준 에디터로 기사와 원고를 작성하고, 영상 · 그래픽을 붙여 데스킹 승인까지 처리하는 기사 관리 단계입니다.",
        points: [
          "다양한 기사 유형 — 일반 · 속보 등을 지원하고, 엠바고 설정과 기사 길이 기반 예상 시간 자동 계산, 단축키 작성을 제공합니다.",
          "기사 잠금 — 여러 사용자가 같은 기사에 접근할 때 오작성을 막고, 응답 없는 편집자의 잠금은 해제할 수 있습니다.",
          "영상 · 그래픽 연동 — MAM에 등록된 영상 · 그래픽을 검색 · 미리보기하고, EDL로 편집을 의뢰해 완료분을 기사에 매핑합니다.",
        ],
        image: "/assets/solutions/zodiac/article.png",
      },
      {
        code: "ZODIAC Cuesheet",
        title: "큐시트 작성 · 편집",
        sub: "Cuesheet & Rundown",
        desc: "기사를 드래그로 배치해 큐시트를 구성하고, 시간과 꼭지 수를 실시간으로 집계하는 런다운 단계입니다.",
        points: [
          "드래그 앤 드롭 구성 — 기사를 끌어다 배치하고 순서를 바꾸며 길이 · 항목 수를 실시간으로 확인합니다.",
          "편성 연동(BIS) — 기본 · 주간 · 일일 편성을 관리하고, 확정 편성을 받아 일일 편성 기준으로 뉴스를 구성합니다.",
          "모바일 큐시트 — 모바일 Zodiac에서 큐시트를 확인합니다(작성 · 변경은 주로 PC).",
        ],
        image: "/assets/solutions/zodiac/cuesheet.png",
      },
      {
        code: "ZODIAC Playout",
        title: "뉴스 송출 자동화",
        sub: "Broadcast Automation",
        desc: "큐시트를 받아 비디오 서버 · CG · 프롬프터를 제어해 영상을 순서대로 내보내는 송출 자동화 단계입니다. 큐시트 변경 내용을 실시간으로 반영합니다.",
        points: [
          "영상 송출(Video Taker) — Harmonic · Imagine · GrassValley K2(VDCP) 비디오 서버를 제어해 재생 · 미리보기하고 긴급 순서 변경에 대응합니다.",
          "CG 송출(CG Taker) — 기사 자막에서 자막 큐시트를 자동 생성하고 방송 템플릿과 연결합니다(Visual Research · Compix 등).",
          "프롬프터 · MOS 연동 — 큐시트 · 기사 내용을 프롬프터로 실시간 전송하고, MOS 프로토콜로 외부 시스템과 연동합니다.",
        ],
        image: "/assets/solutions/zodiac/playout.png",
      },
      {
        code: "ZODIAC Mobile",
        title: "모바일 보도 정보 시스템",
        sub: "Mobile Newsroom",
        desc: "시간과 장소에 구애받지 않고 모바일에서 PC와 동일한 뉴스 제작 기능을 제공하는 모바일 시스템입니다.",
        points: [
          "모바일 특화 UI — 아이콘과 색상으로 시인성을 높인 모바일 전용 인터페이스를 제공합니다.",
          "기사 작성 · 영상 검색 — 현장에서 기사를 작성 · 관리하고 필요한 영상을 검색합니다.",
          "크로스 플랫폼 — Android와 iOS를 모두 지원합니다.",
        ],
        image: "/assets/solutions/zodiac/mobile.png",
        imageNarrow: true,
      },
    ],
  },
  {
    id: "talos",
    code: "TALOS",
    name: "TALOS",
    ko: "자동 송출",
    cat: "자동 송출 · APC (Automation Playout Controller)",
    short: "송출",
    mock: "schedule",
    image: "/assets/solutions/talos/sec.png",
    tagline: "멈추지 않는 자동 송출",
    desc: "편성 스케줄을 받거나 직접 구성하고 비디오 서버 등 송출 장비를 제어해 순서대로 영상을 내보냅니다. 방송사부터 송출 대행, 사내 방송, 유튜브 라이브까지 무중단으로 자동화합니다.",
    trust: "국내 주요 채널 온에어 운영",
    stats: [
      { v: "다채널", k: "동시 자동 송출" },
      { v: "이중·삼중화", k: "무중단 송출 구성" },
    ],
    features: [
      { t: "소프트웨어 마스터 스위처", d: "PCS가 하드웨어 스위처 없이 미디어를 재생하고, CG·로고용 키어와 오디오 믹싱, 녹화까지 한 화면에서 처리합니다." },
      { t: "편성표 연동", d: "편성 시스템에서 스케줄을 받거나 직접 구성해 송출 이벤트로 풀어냅니다." },
      { t: "다양한 출력 포맷", d: "기본 SDI 출력에 RTMP · UDP · SRT · RTP · RTSP 스트리밍 출력을 옵션으로 더합니다." },
      { t: "무중단 이중화", d: "DCS가 이벤트 큐를 유지해 상위 제어기 장애 중에도 송출을 이어 가고, 이중·삼중 구성을 지원합니다." },
      { t: "다채널 타임라인 관제", d: "SEC와 MCC로 최대 4채널을 타임라인으로 동시에 감시하며 장애에 빠르게 대응합니다." },
      { t: "유연한 구성", d: "올인원(CIAB)부터 방송사용 분리형(Traditional)까지 환경에 맞춰 구성합니다." },
    ],
    workflow: ["편성 수신", "이벤트 준비 (SEC)", "장비 제어 (DCS)", "재생 · 송출 (PCS)", "다채널 관제 (MCC)"],
    specs: [
      { k: "MODULES", v: "PCS · DCS · SEC · MCC" },
      { k: "OUTPUT", v: "SDI · RTMP · UDP · SRT · RTP · RTSP" },
      { k: "RECORDING", v: "MXF · MP4" },
      { k: "REDUNDANCY", v: "이중 · 삼중화 · 이벤트 큐 유지" },
      { k: "CONFIG", v: "올인원(CIAB) · 분리형(Traditional)" },
      { k: "INTEGRATION", v: "편성 · 비디오 서버 · 라우터 · 그래픽" },
    ],
    detailsHeading: "네 개의 모듈, 하나의 TALOS",
    details: [
      {
        code: "TALOS PCS",
        title: "재생 제어",
        sub: "Playback Controller System",
        desc: "소프트웨어 기반 마스터 스위처로 미디어를 재생하는 송출 엔진입니다. 대부분의 방송 포맷을 지원하고, CG·로고용 키어와 오디오 믹싱, 녹화를 한 화면에서 처리합니다.",
        points: [
          "소프트웨어 마스터 스위처 — 별도 하드웨어 스위처 없이 미디어를 재생하고 전환합니다.",
          "키어 · 오디오 믹싱 — CG·로고를 얹는 키어와 오디오 믹싱, MXF·MP4 녹화를 지원합니다.",
          "다양한 출력 — 기본 SDI에 RTMP·UDP·SRT·RTP·RTSP 스트리밍을 옵션으로 내보냅니다.",
        ],
        image: "/assets/solutions/talos/pcs.png",
      },
      {
        code: "TALOS DCS",
        title: "장비 제어",
        sub: "Device Control Server",
        desc: "스위처·비디오 서버·라우터·그래픽 등 송출 장비를 제어하는 서버입니다. 이벤트 큐를 자체적으로 유지해 상위 제어기(SEC) 장애 중에도 송출을 이어 갑니다.",
        points: [
          "송출 장비 통합 제어 — 스위처·비디오 서버·라우터·그래픽 시스템을 함께 제어합니다.",
          "이벤트 큐 유지 — 예약 이벤트를 큐에 보관해 SEC 장애 시에도 송출이 멈추지 않습니다.",
          "이중·삼중 구성 — 안정성을 위해 다중화 구성을 지원합니다.",
        ],
        image: "/assets/solutions/talos/dcs.png",
      },
      {
        code: "TALOS SEC",
        title: "스케줄 제어",
        sub: "Schedule Event Controller",
        desc: "편성 스케줄을 받아 이벤트를 준비하고 사용자 모니터링 화면을 제공하는 제어기입니다. 타임라인 기반으로 최대 4채널을 동시에 감시합니다.",
        points: [
          "스케줄 수신 · 이벤트 준비 — 편성표를 받아 송출 이벤트로 풀어냅니다.",
          "타임라인 모니터링 — 최대 4채널을 타임라인으로 동시에 들여다봅니다.",
          "이벤트 그룹화 — 타이틀·광고·프로그램 등 관련 이벤트를 묶어 한눈에 관리합니다.",
        ],
        image: "/assets/solutions/talos/sec.png",
      },
      {
        code: "TALOS MCC",
        title: "다채널 관제",
        sub: "Multi Channel Controller",
        desc: "운영 중인 모든 채널의 상태를 타임라인 형식으로 한 화면에 모아 보는 관제 도구입니다. 다채널 환경에서 장애를 빠르게 파악하고 대응합니다.",
        points: [
          "전 채널 동시 모니터링 — 운영 중인 모든 채널 상태를 한 화면에서 봅니다.",
          "타임라인 상태 표시 — 채널별 진행 상황을 타임라인 형식으로 표시합니다.",
          "신속한 장애 대응 — 다채널 환경에서 이상을 빠르게 감지해 대응합니다.",
        ],
        image: "/assets/solutions/talos/mcc.png",
      },
    ],
  },
  {
    id: "emotion",
    code: "EMOTION",
    name: "Emotion",
    ko: "라디오",
    cat: "라디오 제작 · 송출",
    short: "라디오",
    mock: "waveform",
    image: "/assets/solutions/emotion/track.png",
    tagline: "하드웨어에 종속되지 않는 라디오",
    desc: "Emotion은 현장 라디오 PD와 기술감독의 요구를 충족하는 통합 라디오 방송 솔루션입니다. 녹음 · 제작부터 생방송, 자동 송출, 관제, 품질 관리까지 여섯 개의 모듈로 하나로 잇습니다.",
    trust: "40년 이상의 라디오 운영 노하우를 담은 통합 솔루션",
    stats: [
      { v: "30%+", k: "편집 시간 단축" },
      { v: "40년+", k: "라디오 운영 노하우" },
    ],
    features: [
      { t: "Emotion Track — 녹음 · 제작", d: "멀티트랙으로 오디오를 녹음 · 편집 · 제작합니다. 다양한 입력 포맷과 고품질 변환, 서드파티 이펙트 플러그인을 지원합니다." },
      { t: "Emotion Live — 생방송 제작", d: "스튜디오 송출용 플레이리스트를 직관적인 인터페이스로 관리합니다. 오디오 콘텐츠 검색과 CD 리핑, 주 · 예비 구조를 지원합니다." },
      { t: "Emotion Fly — 자동 송출", d: "플레이리스트를 수신해 PGM 스위처로 오디오를 자동 재생합니다. 실시간 파형 모니터링과 오류 경보를 제공합니다." },
      { t: "Emotion Sysflow — 시스템 관제", d: "시스템 상태를 실시간으로 감시하고 절체 · 장비 이상을 감지합니다. 비상 시 자동 음악으로 방송 공백을 막습니다." },
      { t: "Emotion QC — 품질 관리", d: "방송 파일의 이상 여부를 자동으로 검증하고, 3중 서버 정합성 확인과 파형 사전 청취를 지원합니다.", mark: "QC" },
      { t: "Emotion Web — 웹 기반 관리", d: "사용자 · 프로그램 · 폴더와 업무 배정을 웹에서 관리하고, 시스템 사용 현황과 PD 요청을 처리합니다." },
    ],
    workflow: ["녹음 · 제작", "생방송 편성", "품질 검증 (QC)", "자동 송출", "관제"],
    specs: [
      { k: "MODULES", v: "Track · Live · Fly · Sysflow · QC · Web" },
      { k: "EDITING", v: "멀티트랙 · 서드파티 이펙트 플러그인" },
      { k: "PLAYOUT", v: "자동 · 생방송 · PGM 스위처 연동" },
      { k: "REDUNDANCY", v: "주 · 예비 이중화 · 3중 서버 정합성" },
      { k: "PLATFORM", v: "소프트웨어 (HW 비종속) · 네트워크 확장" },
    ],
    detailsHeading: "여섯 개의 모듈, 하나의 Emotion",
    details: [
      {
        code: "Emotion Track",
        title: "녹음 · 제작",
        sub: "Recording Production",
        desc: "멀티트랙으로 오디오를 녹음 · 편집 · 제작하는 핵심 제작 소프트웨어입니다. 하드웨어에 종속되지 않는 환경에서 다양한 입력 포맷과 고품질 변환을 지원합니다.",
        points: [
          "멀티트랙 녹음 · 편집 — 여러 트랙을 안정적으로 처리하며 프로그램을 제작합니다.",
          "다양한 입력 포맷 · 고품질 변환 — 여러 소스 포맷을 받아 방송 품질로 변환합니다.",
          "서드파티 이펙트 플러그인 — 외부 오디오 이펙트 플러그인을 연동해 후처리합니다.",
          "네트워크 확장 — 하드웨어 비종속 구조에서 네트워크로 작업 환경을 확장합니다.",
        ],
        image: "/assets/solutions/emotion/track.png",
      },
      {
        code: "Emotion Live",
        title: "생방송 제작",
        sub: "Live Production",
        desc: "스튜디오 송출용 플레이리스트를 관리하는 생방송 제작 소프트웨어입니다. 직관적인 편집 인터페이스로 방송이 진행되는 중에도 빠르게 구성을 바꿉니다.",
        points: [
          "플레이리스트 관리 — 스튜디오 재생 목록을 구성하고 실시간으로 운용합니다.",
          "직관적 편집 인터페이스 — 생방송 중에도 빠르게 항목을 편집합니다.",
          "오디오 콘텐츠 검색 · CD 리핑 — 필요한 소재를 즉시 찾고 CD를 디지털로 가져옵니다.",
          "주 · 예비 구조 — 메인 / 스페어 구성으로 생방송 안정성을 높입니다.",
        ],
        image: "/assets/solutions/emotion/live.png",
      },
      {
        code: "Emotion Fly",
        title: "자동 송출",
        sub: "Playout Automation",
        desc: "플레이리스트를 수신해 PGM 스위처를 통해 오디오를 자동 재생하는 송출 소프트웨어입니다. 실시간 파형 모니터링과 오류 경보로 온에어를 지킵니다.",
        points: [
          "플레이리스트 수신 · 자동 재생 — 예약된 목록을 받아 정확한 시점에 송출합니다.",
          "PGM 스위처 연동 — 프로그램 스위처를 통해 오디오를 출력합니다.",
          "실시간 파형 모니터링 — 송출 신호를 파형으로 실시간 확인합니다.",
          "다중 이중화 · 오류 경보 — 이중화 옵션과 오류 경보 시스템으로 무중단을 지원합니다.",
        ],
        image: "/assets/solutions/emotion/fly.png",
      },
      {
        code: "Emotion Sysflow",
        title: "시스템 관제",
        sub: "System Control",
        desc: "방송 시스템의 상태를 실시간으로 감시하고 장애와 장비 이상을 감지하는 관제 소프트웨어입니다. 비상 상황에서 자동 음악 송출로 방송 공백을 막습니다.",
        points: [
          "실시간 상태 감시 — 시스템 전반의 상태를 한눈에 모니터링합니다.",
          "절체 · 장비 이상 감지 — 온도 · 전원 · 모듈 등 장비 이상과 절체를 감지합니다.",
          "비상 자동 음악 — 장애 시 자동으로 음악을 송출해 방송 공백을 방지합니다.",
        ],
        image: "/assets/solutions/emotion/sysflow.png",
      },
      {
        code: "Emotion QC",
        title: "품질 관리",
        sub: "Quality Control",
        desc: "방송 파일의 이상 여부를 자동으로 검증하는 품질 관리 소프트웨어입니다. 3중 서버의 정합성을 확인하고 파형으로 사전 청취합니다.",
        points: [
          "방송 파일 자동 검증 — 파일의 이상 유무를 자동으로 판별합니다.",
          "3중 서버 정합성 확인 — 다중 서버 간 파일 일치를 검사합니다.",
          "파형 사전 청취 — 송출 전에 파형으로 내용을 미리 확인합니다.",
        ],
        image: "/assets/solutions/emotion/qc.png",
      },
      {
        code: "Emotion Web",
        title: "웹 기반 관리",
        sub: "Web Management",
        desc: "사용자 · 프로그램 · 폴더와 업무 배정을 웹에서 관리하는 통합 관리 도구입니다. 시스템 사용 현황을 모니터링하고 PD 요청을 처리합니다.",
        points: [
          "사용자 · 프로그램 · 폴더 관리 — 조직과 콘텐츠 구조를 웹에서 관리합니다.",
          "업무 배정 — 제작 업무를 배정하고 진행 상황을 관리합니다.",
          "사용 현황 모니터링 · PD 요청 지원 — 시스템 사용 현황을 보고 PD 요청을 처리합니다.",
        ],
        image: "/assets/solutions/emotion/web.png",
      },
    ],
  },
  {
    id: "winner-s",
    code: "WINNER S",
    name: "Winner S",
    ko: "오디오 파일 시스템",
    cat: "오디오 파일 시스템 · Audio File System",
    short: "오디오 파일 시스템",
    mock: "waveform",
    image: "/assets/solutions/winner-s/chain.png",
    tagline: "디지털 환경에 최적화된 오디오 파일 시스템",
    desc: "Winner S는 네트워크와 대용량 데이터베이스를 기반으로 디지털 환경에 최적화한 오디오 파일 시스템입니다. 일반 프로그램과 방송 소재 · 광고 · 음원을 데이터베이스로 체계화하고, 제작부터 편성 · 광고 · 생방송 · 자동 송출 · 관제까지 오디오 방송의 전 과정을 아홉 개의 단말로 하나로 잇습니다.",
    trust: "네트워크 · 대용량 데이터베이스 기반 디지털 오디오 파일 시스템",
    stats: [
      { v: "최대 32채널", k: "멀티채널 오디오 편집" },
      { v: "주 · 예비", k: "이중화 무중단 송출" },
    ],
    features: [
      { t: "Launcher — 통합 단말", d: "오디오 파일 시스템을 빠르게 실행하는 통합 단말입니다. 권한 기반 사용자 로그인과 접근 제어, 공지 기능을 제공합니다." },
      { t: "Winner Chain — 자동 송출(APC)", d: "일일 편성표를 받아 방송을 자동으로 송출합니다. 오디오 라우터 연동으로 채널을 자동 절체하고, 주 · 예비 이중화로 안정성을 높입니다." },
      { t: "Winner Live — 생방송 진행", d: "큐시트 기반 생방송 진행 단말입니다. 예약 광고 자동 로딩과 비상 방송, 소재 · 음원 빠른 검색, 드래그 앤 드롭을 지원합니다." },
      { t: "Winner Recording — 제작", d: "녹음과 편집을 통합한 제작 단말입니다. 최대 32채널 멀티채널과 무제한 Undo, 듀얼 모니터, 방송 편집 잔여 시간 자동 계산을 지원합니다." },
      { t: "Winner Manager — 편성", d: "주간 · 일일 편성을 작성 · 관리합니다. 광고 데이터 등록과 프로그램별 큐시트 작성, 녹음 파일 유무 확인, 사용자별 편집 권한을 제공합니다." },
      { t: "Winnerwave — NLE 편집", d: "WAV · MP3 · MP2 · WMA · ASF · FLAC 등 다양한 포맷을 다루는 비선형 오디오 편집기입니다. 영상 음원 추출과 32채널 이상 편집을 지원합니다." },
      { t: "Winner CF — 광고", d: "광고를 직관적 UI로 체계적으로 관리합니다. 광고주 · 광고명 기준 빠른 소재 검색, 일일 광고 편성 검색 · 출력, 송출 프로그램과의 동기화를 제공합니다." },
      { t: "Winner Music Bank — 뮤직 뱅크", d: "가볍고 단순한 오디오 아카이브입니다. CD 음원 추출과 앨범 · 아티스트 · 장르별 체계적 관리, 간단한 오디오 편집을 지원합니다." },
      { t: "Winner Watch — 통합 경보", d: "모든 단말과 APC의 방송 상태를 한 화면에서 감시합니다. 시스템 장애 시 경보를 울리고 로그 분석으로 실시간 관리합니다.", mark: "관제" },
    ],
    workflow: ["제작 · 녹음", "편성", "광고 등록", "생방송 진행", "자동 송출", "통합 관제"],
    specs: [
      { k: "MODULES", v: "Launcher · Chain · Live · Recording · Manager · Winnerwave · CF · Music Bank · Watch" },
      { k: "PLAYOUT", v: "APC 자동 송출 · 오디오 라우터 채널 자동 절체" },
      { k: "EDITING", v: "멀티채널(최대 32) · 무제한 Undo · 사운드카드 비종속" },
      { k: "FORMAT", v: "WAV · MP3 · MP2 · WMA · ASF · FLAC 등" },
      { k: "REDUNDANCY", v: "주 · 예비 이중화(High Availability)" },
      { k: "MONITORING", v: "통합 경보(Winner Watch) · 로그 분석" },
    ],
    detailsHeading: "아홉 개의 단말, 하나의 Winner S",
    details: [
      {
        code: "WINNER S Launcher",
        title: "통합 단말",
        sub: "Integrated Terminal",
        desc: "오디오 파일 시스템의 모든 단말을 한곳에서 실행하는 통합 진입점입니다. 권한에 따라 접근을 통제하고 공지를 전달합니다.",
        points: [
          "빠른 실행 — 오디오 파일 시스템 프로그램을 쉽고 빠르게 실행합니다.",
          "권한 기반 로그인 — 사용자 로그인과 권한 레벨에 따른 접근 제어를 제공합니다.",
          "공지 기능 — 운영 공지를 단말에 전달합니다.",
        ],
        image: "/assets/solutions/winner-s/launcher.png",
      },
      {
        code: "WINNER S Chain",
        title: "자동 송출 (APC)",
        sub: "Automatic Program Control",
        desc: "일일 편성표를 받아 방송을 자동으로 내보내는 송출 단말입니다. 오디오 라우터와 연동해 채널을 절체하고, 주 · 예비 이중화로 무중단을 지킵니다.",
        points: [
          "일일 편성 자동 송출 — 편성표 기반으로 방송을 자동으로 송출하고, 편성 변경 시 사용자에게 알리고 자동으로 갱신합니다.",
          "오디오 라우터 연동 — 채널을 자동으로 절체하고 모니터링합니다.",
          "이중화 · 송출 감시 — 주 · 예비 구성으로 High Availability를 확보하고, 송출 전 소재를 감시 · 경보하며 파형으로 확인합니다.",
        ],
        image: "/assets/solutions/winner-s/chain.png",
      },
      {
        code: "WINNER S Live",
        title: "생방송 진행",
        sub: "Live On-Air",
        desc: "큐시트를 따라 생방송을 진행하는 단말입니다. 예약 광고를 자동으로 불러오고, 비상 방송과 빠른 소재 검색을 지원합니다.",
        points: [
          "큐시트 진행 — 큐시트를 불러올 때 예약 광고를 자동으로 로딩합니다.",
          "비상 방송 — 돌발 상황에 대비한 비상 방송 기능을 제공합니다.",
          "빠른 검색 · 드래그 앤 드롭 — 소재와 음원을 빠르게 찾고, 마우스 드래그 앤 드롭과 고품질 오디오 자동 변환을 지원합니다.",
        ],
        image: "/assets/solutions/winner-s/live.png",
      },
      {
        code: "WINNER S Recording",
        title: "제작",
        sub: "Recording & Production",
        desc: "녹음과 편집을 통합한 제작 단말입니다. 멀티채널 오디오를 다루며, 강력한 복구 기능으로 안정적으로 제작합니다.",
        points: [
          "멀티채널 제작 — 오디오 에디터로 녹음 · 편집하고 편성 소재로 저장합니다(최대 32채널, 권장 6채널).",
          "생방송 연동 · 듀얼 모니터 — 생방송 프로그램과 연동하고, 듀얼 모니터 환경을 지원합니다.",
          "잔여 시간 자동 계산 · 무제한 Undo — 방송 편집 중 잔여 시간을 자동으로 계산하고, 무제한 Undo로 강력하게 복구합니다.",
        ],
        image: "/assets/solutions/winner-s/recording.png",
      },
      {
        code: "WINNER S Manager",
        title: "편성",
        sub: "Scheduling",
        desc: "주간 · 일일 방송 편성을 작성하고 관리하는 단말입니다. 광고 데이터를 등록하고 프로그램별 큐시트를 구성합니다.",
        points: [
          "주간 · 일일 편성 — 편성을 작성 · 관리하고, 광고 데이터를 등록해 프로그램별로 편성합니다.",
          "큐시트 · 녹음 파일 확인 — 프로그램별 큐시트를 작성 · 조회하고, 녹음 파일 유무를 확인해 표시합니다.",
          "편성 오류 표시 · 권한 — 편성 오류를 표시하고, 사용자별 편집 권한을 설정합니다.",
        ],
        image: "/assets/solutions/winner-s/manager.png",
      },
      {
        code: "WINNER S Winnerwave",
        title: "오디오 편집 (NLE)",
        sub: "Non-Linear Editor",
        desc: "오디오 제작을 위한 비선형 편집기입니다. 다양한 포맷을 다루고 멀티채널을 편집하며, 사운드카드에 종속되지 않습니다.",
        points: [
          "다양한 포맷 — WAV · MP3 · MP2 · WMA · ASF · FLAC 등을 지원하고, 영상에서 음원을 추출합니다.",
          "멀티채널 편집 · 공유 — 32채널 이상을 편집하고 편집 내용을 공유합니다.",
          "사운드카드 비종속 · 복구 — 사운드카드와 무관하게 동작하고, 예기치 못한 오류에도 강력하게 복구합니다.",
        ],
        image: "/assets/solutions/winner-s/recording.png",
      },
      {
        code: "WINNER S CF",
        title: "광고",
        sub: "Commercial Management",
        desc: "광고를 체계적으로 관리하는 단말입니다. 직관적인 UI로 소재를 빠르게 찾고, 송출 프로그램과 동기화합니다.",
        points: [
          "빠른 소재 검색 — 광고주 · 광고명 기준으로 소재를 신속하게 검색합니다.",
          "일일 광고 편성 — 일일 광고 편성을 검색 · 출력하고, 편성 변경 시 담당자에게 알립니다.",
          "송출 동기화 · 광고료 — 송출 프로그램과 동기화하고, 광고료 산정 기능을 강화했습니다.",
        ],
        image: "/assets/solutions/winner-s/manager.png",
      },
      {
        code: "WINNER S Music Bank",
        title: "뮤직 뱅크",
        sub: "Audio Archive",
        desc: "가볍고 단순한 오디오 아카이브 프로그램입니다. CD 음원을 추출해 체계적으로 보관합니다.",
        points: [
          "CD 음원 추출 — CD에서 오디오를 추출해 라이브러리에 담습니다.",
          "체계적 관리 — 앨범 · 아티스트 · 장르별로 음원을 정리합니다.",
          "간단한 환경 · 편집 — 단순한 사용 환경에서 기본 오디오 편집을 지원합니다.",
        ],
        image: "/assets/solutions/winner-s/musicbank.png",
      },
      {
        code: "WINNER S Watch",
        title: "통합 경보",
        sub: "Integrated Monitoring",
        desc: "모든 단말과 APC의 방송 상태를 한 화면에서 감시하는 관제 단말입니다. 장애를 감지해 경보를 울리고 로그를 분석합니다.",
        points: [
          "통합 모니터링 — 모든 단말과 APC의 방송 상태를 단일 화면에서 감시합니다.",
          "장애 경보 — 시스템 장애 발생 시 경보를 울립니다.",
          "로그 분석 — 로그를 분석해 실시간으로 상태를 관리합니다.",
        ],
        image: "/assets/solutions/winner-s/watch.png",
      },
    ],
  },
  {
    id: "maia",
    code: "MAIA",
    name: "MAIA",
    ko: "AI 기술",
    cat: "미디어 AI 엔진 · Media AI Agent",
    short: "AI",
    badge: "AI",
    mock: "ai",
    image: "/assets/solutions/maia/video.png",
    tagline: "방송을 위한 AI 엔진 스위트",
    desc: "MAIA(Media AI Agent)는 영상 · 음성 · 얼굴 · 문자 · 프롬프터를 AI로 분석하는 통합 엔진입니다. 방대한 미디어 라이브러리를 검색 가능한 자산으로 바꿉니다.",
    trust: "온프레미스 배포 — 콘텐츠가 시설 밖으로 나가지 않습니다",
    stats: [
      { v: "116종+", k: "객체 자동 감지 분류" },
      { v: "온프레미스", k: "콘텐츠 시설 내 보관" },
    ],
    features: [
      { t: "MAIA Video — 장면 이해", d: "프레임 → 샷 → 장면 단위로 영상을 분할하고 각 장면의 내용을 텍스트화해 검색 가능한 메타데이터로 저장합니다.", ai: true },
      { t: "MAIA Speech — 음성 인식(STT)", d: "Google · Amazon · Naver Clova · Whisper 등 다중 STT 엔진과 화자 분리로 모든 발화를 검색 가능한 텍스트로 변환합니다.", ai: true },
      { t: "MAIA Face — 얼굴 인식", d: "영상 속 인물을 자동 추출 · 군집화하고, 사진 한 장으로 전체 아카이브에서 해당 인물의 모든 등장을 찾습니다.", ai: true },
      { t: "MAIA Character — 문자 인식(OCR)", d: "자막·하단 자막·CG 등 화면 속 텍스트를 감지해 검색 가능한 형태로 색인합니다.", ai: true },
      { t: "MAIA Object — 객체 인식", d: "133종의 객체를 감지하여 장면 단위의 영상에 대해 구조화된 메타데이터를 생성합니다.", ai: true },
      { t: "MAIA Prompter — AI 프롬프터", d: "AI가 진행자의 음성을 실시간으로 스크립트와 매칭해 자동으로 스크롤합니다. 별도 오퍼레이터가 필요 없습니다.", ai: true },
      { t: "자연어 통합 검색", d: "얼굴 · 객체 · STT · 장면 데이터를 통합하여 일상 언어로 아카이브를 검색합니다.", ai: true },
    ],
    workflow: ["수집", "AI 분석 (영상 · 음성 · 얼굴 · 문자)", "메타데이터 · 색인", "자연어 검색", "활용 · 재사용"],
    specs: [
      { k: "MODULES", v: "Video · Speech · Face · Character · Prompter" },
      { k: "STT", v: "Google · Amazon · Naver Clova · Whisper · Daglo" },
      { k: "VISION", v: "장면 분할 · 객체 116종+ · OCR · 얼굴 인식" },
      { k: "SEARCH", v: "얼굴 · 객체 · STT · 장면 통합 자연어 검색" },
      { k: "DEPLOY", v: "온프레미스 · 클라우드 SaaS · 하이브리드" },
    ],
    details: [
      {
        code: "MAIA Video",
        title: "장면 인식",
        sub: "Scene Change Detection",
        desc: "AI가 영상을 프레임 → 샷 → 장면 단위로 자동 분할하고, 각 구간을 구조화된 메타데이터로 정리합니다. 온프레미스로 동작해 콘텐츠가 시설 밖으로 나가지 않습니다.",
        points: [
          "객체 감지 — 사람 · 차량 · 동물 · 배경 등 116종 이상을 파놉틱 세그멘테이션으로 분류하고 자동 태깅합니다.",
          "영상 요약 · 장면 설명 — 생성형 AI가 장면마다 사람이 읽을 수 있는 설명을 자동으로 작성합니다.",
          "자연어 검색 — 얼굴 · 객체 · STT · 장면 데이터를 통합해 일상 언어로 아카이브를 검색합니다.",
        ],
        image: "/assets/solutions/maia/video.png",
      },
      {
        code: "MAIA Speech",
        title: "음성 인식 (STT)",
        sub: "Speech-to-Text",
        desc: "방송에서 발화된 모든 말이 자동으로, 정확하게, 실시간으로 검색 가능한 텍스트가 됩니다.",
        points: [
          "다중 STT 엔진 허브 — Google · Amazon Transcribe · Naver Clova · OpenAI Whisper · Daglo를 선택해 적용합니다.",
          "화자 분리(diarization) — 누가 언제 말했는지 타임코드와 함께 식별합니다.",
          "자막 내 키워드 검색으로 편집 지점을 즉시 찾아가고, AI 자막 편집 · 자동 요약 · 자막 파일 다운로드를 지원합니다.",
          "클라우드 SaaS(사용량 과금) 또는 Whisper 기반 완전 온프레미스로 배포합니다.",
        ],
        image: "/assets/solutions/maia/speech.png",
      },
      {
        code: "MAIA Face",
        title: "얼굴 인식",
        sub: "Face Recognition",
        desc: "출연자의 모든 등장 장면을 전체 아카이브에서 몇 시간이 아닌 몇 초 만에 찾습니다.",
        points: [
          "얼굴 자동 추출 — 랜드마크 분석으로 얼굴을 감지하고 동일 인물을 자동으로 군집화합니다.",
          "이미지 기반 검색 — 사진 한 장을 올리면 일치하는 모든 등장 장면을 즉시 찾습니다.",
          "인물 타임라인 — 인물별 등장 구간을 샷 단위 시각 타임라인으로 보여 줍니다.",
        ],
        image: "/assets/solutions/maia/face.png",
      },
      {
        code: "MAIA Character",
        title: "문자 인식 (OCR)",
        sub: "OCR Detection",
        desc: "하단 자막, 채널 로고(chyron), 화면 속 그래픽 텍스트까지 자동으로 감지 · 색인 · 검색합니다.",
        points: [
          "전체 분석 모드 — 화면 속 모든 텍스트 영역을 별도 설정 없이 자동으로 감지합니다.",
          "영역 선택 모드 — 드래그로 관심 영역을 지정해 원하는 위치만 정밀하게 추출합니다.",
          "한글 · 영문 · 중국어 · 일본어 등 다국어와 다양한 폰트를 지원합니다.",
        ],
        image: "/assets/solutions/maia/character.png",
      },
      {
        code: "MAIA Prompter",
        title: "AI 프롬프터",
        sub: "AI-Powered Live Prompting",
        desc: "진행자의 음성을 듣고 스크립트와 실시간으로 맞춰 자동으로 스크롤하는 프롬프터입니다.",
        points: [
          "실시간 음성 매칭 — 진행자의 발화를 분석해 스크립트 위치를 자동으로 따라갑니다.",
          "오퍼레이터 불필요 — 전담 운영 인력 없이 완전 자동으로 스크롤합니다.",
          "온프레미스 · 클라우드(Whisper Live 포함)로 배포합니다.",
        ],
        image: "/assets/solutions/maia/prompter.png",
      },
    ],
  },
  {
    id: "mymy",
    code: "MYMY",
    name: "MYMY",
    ko: "콘텐츠 아카이브",
    cat: "콘텐츠 관리 시스템 · CMS",
    short: "아카이브",
    mock: "grid",
    image: "/assets/solutions/mymy.png",
    tagline: "콘텐츠를 한곳에서 관리하세요",
    desc: "영상·이미지·문서를 한곳에 체계적으로 보관하고, 메타데이터·AI 의미·STT 자막 등 다양한 방식으로 원하는 콘텐츠를 즉시 찾습니다.",
    trust: "KBS 콘텐츠 아카이브 고도화",
    stats: [
      { v: "70%", k: "검색 시간 단축" },
      { v: "다중 검색", k: "메타데이터 · AI · STT · 지도" },
    ],
    features: [
      { t: "통합 아카이브", d: "영상 · 오디오 · 이미지 · 문서(HWP · PPT · DOC · XLS) 등 모든 미디어를 하나의 공간에서 관리합니다." },
      { t: "메타데이터 검색", d: "다양한 조건으로 원하는 콘텐츠를 즉시 탐색합니다." },
      { t: "표준 메타데이터 관리", d: "KS X ISO 15836(Dublin Core) · DCMI Terms 기반 표준 메타 스키마와 코드 리스트(valueListCode)로 국가표준 메타데이터 정책에 대응합니다." },
      { t: "AI 의미 검색", d: "자연어로 의미가 비슷한 콘텐츠를 찾습니다.", ai: true },
      { t: "STT 자막 검색", d: "음성을 자동으로 자막화한 뒤 위치 단위로 검색합니다.", ai: true },
      { t: "얼굴 인식 인물 관리", d: "얼굴 인식으로 콘텐츠 속 인물을 식별하고, 인물별 등장 빈도 · 유사도와 바이오 메타데이터를 관리합니다.", ai: true },
      { t: "관계 그래프", d: "콘텐츠 간 연결을 시각화해 연관 자산을 따라가며 탐색합니다." },
      { t: "협업 · 커뮤니케이션", d: "컬렉션으로 콘텐츠를 묶어 공유하고, 댓글로 의견을 주고받으며 팀이 함께 작업합니다." },
      { t: "외부 인증 · SSO", d: "OIDC · SAML 기반 외부 IdP(Google Workspace · Microsoft Entra ID · Okta 등)와 연동해 로컬 로그인과 함께 쓰는 하이브리드 인증을 지원합니다." },
      { t: "그룹 · 권한 관리", d: "사용자별 그룹을 관리하고, 카테고리별 접근 제한(ACL)으로 콘텐츠 권한을 세밀하게 통제합니다." },
      { t: "감사 로그", d: "콘텐츠 조회 · 편집 · 다운로드와 도구 호출까지 모든 활동을 기록해 안전하게 추적하고 책임성을 보장합니다.", mark: "보안" },
      { t: "REST API 연계", d: "OpenAPI(Swagger) 규격의 REST API로 외부 시스템과 콘텐츠 · 메타데이터를 연계하고 업무를 자동화합니다." },
      { t: "AI 에이전트 협업", d: "MCP(Model Context Protocol)로 Claude 등 외부 AI 에이전트가 검색·조회·메타데이터 작업을 직접 수행합니다.", ai: true },
    ],
    workflow: ["등록 · 보관", "메타데이터 · 분류", "검색 · 탐색", "검수", "워크플로우 · 배포"],
    specs: [
      { k: "SEARCH", v: "메타데이터 · AI 의미 · STT 자막 · 지도" },
      { k: "METADATA", v: "KS X ISO 15836(Dublin Core) · DCMI Terms" },
      { k: "GRAPH", v: "콘텐츠 관계 그래프" },
      { k: "STORAGE", v: "S3 · 로컬 등 다중 스토리지" },
      { k: "DOCUMENT", v: "HWP · PPT · DOC · XLS 등 문서 지원" },
      { k: "AUTOMATION", v: "워크플로우 · 웹훅 · API" },
      { k: "AI AGENT", v: "MCP 연동 — Claude Code · Desktop 등" },
    ],
    clients: [
      "KBS",
      "예금보험공사",
      "의성군청",
      "방송AI데이터셋",
      "한국장학재단",
      "MBC충북",
      "양주시청",
      "영락교회",
    ],
  },
  {
    id: "g-sam",
    code: "G-SAM",
    name: "G-SAM",
    ko: "콘텐츠 배포",
    cat: "SNS 플랫폼 콘텐츠 배포",
    short: "콘텐츠 배포",
    mock: "schedule",
    image: "/assets/solutions/g-sam/overview.png",
    tagline: "하나의 콘텐츠를 모든 채널로",
    desc: "G-SAM은 YouTube · Facebook · Instagram · X(Twitter) · TikTok까지, 하나의 콘텐츠를 여러 SNS 플랫폼에 배포하고 관리하는 분산형 배포 솔루션입니다. 예약 배포부터 재생목록 · 자막 관리, 통계 분석, 아카이브까지 멀티 채널 운영 전 과정을 하나로 잇습니다.",
    trust: "1 Source Multi-Use — 한 번의 등록으로 모든 채널에 배포",
    stats: [
      { v: "1 Source", k: "Multi-Use 멀티 플랫폼 배포" },
      { v: "멀티 채널", k: "YouTube · TikTok · Instagram · Facebook · X" },
    ],
    features: [
      { t: "SNS 플랫폼 통합 배포", d: "YouTube · Facebook · Instagram · X(Twitter) · TikTok까지, 하나의 콘텐츠를 여러 SNS 플랫폼에 한 번에 배포합니다." },
      { t: "예약 배포 · 현황 모니터링", d: "콘텐츠를 예약해 자동으로 배포하고, 배포 현황을 실시간으로 모니터링하며 메타 정보를 일괄 수정합니다." },
      { t: "배포 일정 관리", d: "일간 · 주간 · 월간 단위로 배포 일정을 조회해 규칙적으로 콘텐츠를 내보냅니다." },
      { t: "유튜브 재생목록 · 자막 관리", d: "재생목록을 조회 · 생성 · 수정하고, 제목 · 설명 등 메타정보와 자막을 다국어로 서비스합니다." },
      { t: "통계 분석 대시보드", d: "채널 · 비디오 · 수익 통계를 대시보드로 모아 운영 현황과 실적을 한눈에 봅니다." },
    ],
    workflow: ["콘텐츠 수집", "메타 정보 구성", "예약 배포", "다중 플랫폼 송출", "통계 분석", "아카이브"],
    specs: [
      { k: "SNS", v: "YouTube · Facebook · Instagram · X(Twitter) · TikTok" },
      { k: "SCHEDULE", v: "일간 · 주간 · 월간 예약 배포" },
      { k: "ANALYTICS", v: "채널 · 비디오 · 수익 통계 대시보드" },
      { k: "METADATA", v: "다국어 메타 · 자막 · 재생목록 관리" },
    ],
    detailsHeading: "네 개의 기능, 하나의 G-SAM",
    details: [
      {
        code: "G-SAM Deploy",
        title: "멀티 플랫폼 배포",
        sub: "Multi-Platform Distribution",
        desc: "하나의 콘텐츠를 여러 SNS 플랫폼에 한 번에 배포하는 1 Source Multi-Use 방식입니다. 플랫폼마다 다른 규격과 기능을 G-SAM이 알아서 맞춥니다.",
        points: [
          "SNS 플랫폼 연계 — YouTube · Facebook · Instagram · X(Twitter) · TikTok에 콘텐츠를 배포합니다.",
          "플랫폼별 특화 기능 — YouTube 자막 · 재생목록 관리, Instagram · X · TikTok 영상 분할 배포를 지원합니다.",
          "메타 정보 일괄 수정 — 여러 콘텐츠의 제목 · 설명 등 메타 정보를 한 번에 수정합니다.",
        ],
        image: "/assets/solutions/g-sam/deploy.png",
      },
      {
        code: "G-SAM Schedule",
        title: "배포 일정 관리",
        sub: "Distribution Schedule",
        desc: "예약한 시점에 콘텐츠를 자동으로 배포하고, 일간 · 주간 · 월간 단위로 일정을 조회해 규칙적으로 운영합니다.",
        points: [
          "예약 배포 — 지정한 시각에 콘텐츠를 자동으로 배포합니다.",
          "일정 조회 — 일간 · 주간 · 월간 단위로 배포 일정을 한눈에 확인합니다.",
          "배포 현황 모니터링 — 진행 중인 배포 상태를 실시간으로 추적합니다.",
        ],
        image: "/assets/solutions/g-sam/schedule.png",
      },
      {
        code: "G-SAM Analytics",
        title: "통계 분석",
        sub: "Analytics & Statistics",
        desc: "채널 · 비디오 · 수익 통계를 한곳에 모아 대시보드로 보여 줍니다. 구독자 · 조회수 · 시청 시간 추이부터 수익 분석까지 운영에 필요한 지표를 제공합니다.",
        points: [
          "통합 대시보드 — 채널 운영 현황과 실적을 한 화면에서 조회합니다.",
          "채널 · 비디오 통계 — 구독자 · 조회수 · 시청 시간 등 성장 지표와 영상별 반응을 분석합니다.",
          "수익 분석 — 채널 수익을 분석하고 추이를 비교합니다.",
        ],
        image: "/assets/solutions/g-sam/analytics.png",
      },
      {
        code: "G-SAM Archive",
        title: "아카이브 관리",
        sub: "Archive Management",
        desc: "배포한 콘텐츠의 이력을 관리하고 내부에 보관해, 외부 플랫폼에 올린 콘텐츠까지 자체적으로 통제합니다.",
        points: [
          "배포 이력 조회 — 언제 어느 플랫폼에 배포했는지 이력을 추적합니다.",
          "콘텐츠 보관 — 내부에 등록한 콘텐츠와 외부 배포 콘텐츠를 함께 관리합니다.",
          "콘텐츠 소유권 관리 — 자신의 콘텐츠를 자체적으로 보관하고 통제합니다.",
        ],
        image: "/assets/solutions/g-sam/archive.png",
      },
    ],
  },
];

/** generateStaticParams / 링크에서 쓰는 슬러그 목록. */
export const SOLUTION_SLUGS = SOLUTIONS.map((s) => s.id);

/** 헤더/푸터 내비게이션에서 쓰는 솔루션 드롭다운 링크 목록(순서는 SOLUTIONS 기준). */
export const SOLUTION_NAV = SOLUTIONS.map((s) => ({
  label: `${s.name} · ${s.short}`,
  href: `/solutions/${s.id}/`,
}));

/** 슬러그로 솔루션 하나를 찾는다(없으면 undefined). */
export function getSolution(id: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.id === id);
}
