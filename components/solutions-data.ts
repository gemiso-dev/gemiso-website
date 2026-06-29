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
    /** 모듈 스크린샷 경로. asset()로 감싼다. */
    image: string;
  }[];
};

export const SOLUTIONS: Solution[] = [
  {
    id: "proxima",
    code: "PROXIMA",
    name: "Proxima",
    ko: "미디어 자산 관리",
    cat: "미디어 자산 관리 · MAM",
    mock: "grid",
    tagline: "모든 미디어 자산을 하나의 카탈로그로.",
    desc: "소프트웨어 코덱 인제스트부터 NLE 연동, 프록시 기반 검색까지 — 자산의 전 생애주기를 Proxima 하나로 관리합니다.",
    trust: "MBC · YTN · EBS 등 주요 방송사에서 운영 중",
    stats: [
      { v: "1등급", k: "GS 인증 (Proxima v3.0)" },
      { v: "3배", k: "UHD 처리 속도 향상 (v4.0)" },
    ],
    features: [
      { t: "소프트웨어 코덱 인제스트", d: "방송 현장 포맷으로의 소프트웨어 인코딩으로 하드웨어 의존도를 낮춥니다." },
      { t: "NLE 네이티브 연동", d: "주요 편집 시스템 및 파일 기반 워크플로우와 직접 연동합니다." },
      { t: "프록시 기반 검색", d: "저용량 프록시로 어디서나 빠르게 미리보고 자산을 검색합니다." },
      { t: "메타데이터 카탈로그", d: "풍부한 메타데이터와 인덱싱으로 모든 자산을 찾을 수 있게 합니다." },
      { t: "프레임 단위 컷 편집", d: "브라우저에서 프레임 단위로 정확하게 트리밍하고 클립을 구성합니다." },
      { t: "권한 · 감사 로그", d: "자산별 접근 권한과 전 과정 감사 로그로 보안을 강화합니다." },
    ],
    workflow: ["인제스트", "인코딩 · 프록시", "카탈로깅", "검색 · 편집", "전송 · 아카이브"],
    specs: [
      { k: "FORMAT", v: "MXF · MOV · LXF 외" },
      { k: "TRANSFER", v: "Transfer Manager (MOV–MXF, LXF–MXF)" },
      { k: "INTEGRATION", v: "NLE · 아카이브 · 송출" },
      { k: "DEPLOY", v: "온프레미스 · 하이브리드 클라우드" },
    ],
  },
  {
    id: "zodiac",
    code: "ZODIAC",
    name: "Zodiac",
    ko: "뉴스룸",
    cat: "뉴스룸 · NRCS",
    mock: "rundown",
    tagline: "기획에서 송출까지, 하나의 뉴스룸.",
    desc: "취재 관리, 기사 작성, 큐시트 구성, 송출 연동을 PC와 모바일에서 끊김 없이 잇습니다.",
    trust: "MBC 뉴스룸 전면 도입",
    stats: [
      { v: "PC·모바일", k: "동일한 작업 환경" },
      { v: "MOS", k: "표준 프로토콜 연동" },
    ],
    features: [
      { t: "기사 작성", d: "표준화된 에디터로 기사와 원고를 작성하고 버전을 관리합니다." },
      { t: "큐시트(런다운)", d: "드래그로 항목을 구성하고 시간과 길이를 실시간으로 계산합니다." },
      { t: "모바일 취재", d: "현장 기자가 모바일에서 기사를 작성하고 큐시트에 바로 반영합니다." },
      { t: "MOS 연동", d: "그래픽 · 프롬프터 · 서버 등 외부 시스템과 표준 프로토콜로 연동합니다." },
      { t: "데스크 승인", d: "데스크 검토와 승인 흐름을 시스템 안에서 처리합니다." },
      { t: "송출 연동", d: "TALOS 자동 송출과 연동해 큐시트를 그대로 온에어로 보냅니다." },
    ],
    workflow: ["기획", "취재", "기사 작성", "데스크 승인", "큐시트", "송출"],
    specs: [
      { k: "INTEGRATION", v: "MOS · 프롬프터 · 그래픽" },
      { k: "CLIENT", v: "데스크톱 · 모바일 · 웹" },
      { k: "PLAYOUT", v: "TALOS 연동" },
      { k: "DEPLOY", v: "온프레미스 · 클라우드" },
    ],
  },
  {
    id: "talos",
    code: "TALOS",
    name: "TALOS",
    ko: "자동 송출",
    cat: "자동 송출 · APC (Automation Playout Controller)",
    mock: "schedule",
    image: "/assets/solutions/talos/sec.png",
    tagline: "멈추지 않는 자동 송출.",
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
    detailsHeading: "네 개의 모듈, 하나의 TALOS.",
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
    mock: "waveform",
    image: "/assets/solutions/emotion/track.png",
    tagline: "하드웨어에 종속되지 않는 라디오.",
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
    detailsHeading: "여섯 개의 모듈, 하나의 Emotion.",
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
    id: "maia",
    code: "MAIA",
    name: "MAIA",
    ko: "AI 기술",
    cat: "미디어 AI 엔진 · Media AI Agent",
    mock: "ai",
    image: "/assets/solutions/maia/video.png",
    tagline: "방송을 위한 AI 엔진 스위트.",
    desc: "MAIA(Media AI Agent)는 영상 · 음성 · 얼굴 · 문자 · 프롬프터를 AI로 분석하는 통합 엔진입니다. 방대한 미디어 라이브러리를 검색 가능한 자산으로 바꿉니다.",
    trust: "온프레미스 배포 — 콘텐츠가 시설 밖으로 나가지 않습니다",
    stats: [
      { v: "116종+", k: "객체 자동 감지 분류" },
      { v: "온프레미스", k: "콘텐츠 시설 내 보관" },
    ],
    features: [
      { t: "MAIA Video — 장면 인식", d: "프레임 → 샷 → 장면 단위로 영상을 분할하고 116종 이상 객체를 감지해 구조화된 메타데이터를 생성합니다.", ai: true },
      { t: "MAIA Speech — 음성 인식(STT)", d: "Google · Amazon · Naver Clova · Whisper 등 다중 STT 엔진과 화자 분리로 모든 발화를 검색 가능한 텍스트로 변환합니다.", ai: true },
      { t: "MAIA Face — 얼굴 인식", d: "영상 속 인물을 자동 추출 · 군집화하고, 사진 한 장으로 전체 아카이브에서 해당 인물의 모든 등장을 찾습니다.", ai: true },
      { t: "MAIA Character — 문자 인식(OCR)", d: "자막 · 하단 자막 · CG 등 화면 속 모든 텍스트를 감지해 색인하고 검색합니다. 다국어 · 다중 폰트를 지원합니다.", ai: true },
      { t: "MAIA Prompter — AI 프롬프터", d: "AI가 진행자의 음성을 실시간으로 스크립트와 매칭해 자동으로 스크롤합니다. 별도 오퍼레이터가 필요 없습니다.", ai: true },
      { t: "자연어 통합 검색", d: "얼굴 · 객체 · STT · 장면 데이터를 통합해 일상 언어로 아카이브를 검색하고, 장면별 설명을 자동 생성합니다.", ai: true },
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
    mock: "grid",
    image: "/assets/solutions/mymy.png",
    tagline: "콘텐츠를 한곳에서 관리하세요.",
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
];

/** generateStaticParams / 링크에서 쓰는 슬러그 목록. */
export const SOLUTION_SLUGS = SOLUTIONS.map((s) => s.id);

/** 슬러그로 솔루션 하나를 찾는다(없으면 undefined). */
export function getSolution(id: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.id === id);
}
