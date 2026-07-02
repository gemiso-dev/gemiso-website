/**
 * 보유기술 데이터 — /technology 페이지의 단일 소스.
 * 각 항목은 페이지 내 섹션 앵커(id)로 연결되며, 헤더 "보유기술" 드롭다운과 1:1로 대응한다.
 * 본문 콘텐츠는 추후 채운다(현재는 플레이스홀더).
 */

/** 기술 항목의 세부 블록 — 솔루션 상세(sol-detail) 레이아웃을 그대로 재사용한다. */
export type TechBlock = {
  /** 제품/모듈 코드(accent 배지) — 예: "Ariel Ingest Manager" */
  code: string;
  /** 블록 제목 */
  title: string;
  /** 영문 부제(모노 캡션) */
  sub: string;
  /** 한 문단 설명 */
  desc: string;
  /** 세부 기능 목록 */
  points: string[];
  /** 블록 이미지 경로. asset()로 감싼다. */
  image?: string;
  /** 작은 아이콘/세로형 이미지 — 확대하지 않고 자연 크기로 가운데 표시한다. */
  imageNarrow?: boolean;
  /** 평면(미디어 처리) 이미지의 렌더 폭(px). 원본이 너무 작거나 커서 크기를 맞출 때 사용. */
  imageWidth?: number;
  /** 평면 이미지를 레이아웃(카드 높이) 변화 없이 시각적으로만 확대하는 배율(예: 1.1). */
  imageScale?: number;
};

export type Technology = {
  /** 섹션 앵커 식별자 = URL 해시 (예: "ingest" → /technology/#ingest) */
  id: string;
  /** 영문 분류 코드(모노 캡션) */
  code: string;
  /** 메뉴·섹션 제목 */
  title: string;
  /** 한 줄 요약(목차·플레이스홀더용) */
  summary: string;
  /** 섹션 리드 문단(상세 콘텐츠가 있는 항목). 없으면 summary를 플레이스홀더로 표시. */
  intro?: string;
  /** 세부 블록(이미지 + 텍스트). 있으면 상세 섹션을 렌더링한다. */
  blocks?: TechBlock[];
};

export const TECHNOLOGIES: Technology[] = [
  {
    id: "ingest",
    code: "INGEST & ENCODING",
    title: "인제스트 및 영상 인코딩",
    summary: "상용 비디오 서버 연동부터 IO 보드 실시간 인코딩까지, 다양한 소스를 시스템으로 받아들입니다.",
    intro:
      "미디어가 시스템으로 들어오는 첫 단계입니다. 상용 비디오 서버를 제어하는 인제스트 관리부터 IO 보드 기반 실시간 인코딩까지, 다양한 입력 소스를 방송·아카이브용 포맷으로 받아들입니다.",
    blocks: [
      {
        code: "Ariel Ingest Manager",
        title: "비디오 서버 기반 인제스트",
        sub: "Video Server Ingest",
        desc: "Harmonic · Grass Valley · Imagine 등 상용 비디오 서버를 제어해 미디어를 수집합니다. 인제스트 관리 기능만 필요한 고객을 위해 타사 MAM·스토리지와도 연동합니다.",
        points: [
          "상용 비디오 서버 제어 — Harmonic · Grass Valley · Imagine 등 주요 비디오 서버를 VDCP로 제어하고 FTP로 미디어를 전송합니다.",
          "유연한 연동 — 제머나이소프트 MAM에는 RESTful + MXF로, 타사 MAM에는 XML + MXF로 수집 결과를 전달합니다.",
          "독립형 인제스트 — 인제스트 관리 기능만 도입해 기존 MAM·스토리지 위에 얹어 운영할 수 있습니다.",
        ],
        image: "/assets/technology/ingest/ariel-ingest-manager.jpg",
      },
      {
        code: "Proxima Open Encoder",
        title: "IO 보드 기반 실시간 인코딩",
        sub: "Open Encoder",
        desc: "IO 보드로 영상 입력을 받아 소프트웨어 코덱으로 다양한 형식의 영상을 생성합니다. 한 대로 기본적인 방송 운용까지 처리합니다.",
        points: [
          "소프트웨어 코덱 인코딩 — IO 보드로 들어온 DVD · 비디오 서버 · 위성/케이블 · VCR 입력을 다양한 포맷으로 변환합니다.",
          "두 가지 재생 모드 — 짧은 사내 방송용 Back-to-back 재생과 생방송 인서트용 TAKE 모드를 제공합니다.",
          "올인원 운용 — 인코딩부터 송출(Play Out) · 테이프 출력(Tape Out)까지 한 시스템에서 처리합니다.",
        ],
        image: "/assets/technology/ingest/proxima-open-encoder.png",
      },
    ],
  },
  {
    id: "processing",
    code: "MEDIA PROCESSING",
    title: "미디어 처리",
    summary: "GPU 트랜스코딩과 무손실 리랩핑, 스마트 렌더링 편집, 장면 분석, 라우드니스 측정까지 다룹니다.",
    intro:
      "효율적인 영상 처리를 위한 미디어 변환 기술입니다. 재압축 없이 포맷만 바꾸는 리랩핑부터 GPU 가속 트랜스코딩, 스마트 렌더링 편집, 장면 분석, 라우드니스 측정까지 방송 후처리 전반을 다룹니다.",
    blocks: [
      {
        code: "Ariel Transcoder",
        title: "GPU 가속 트랜스코더",
        sub: "GPU Transcoder",
        desc: "GPU 가속으로 다양한 코덱의 영상을 방송·배포용 포맷으로 변환합니다. 여러 입력 코덱을 받아 IMX SD · XDCAM HD · H.264로 빠르게 인코딩합니다.",
        points: [
          "폭넓은 입력 코덱 — MPEG-2 · MPEG-4 · DV · ProRes/DNxHD 계열을 입력으로 지원합니다.",
          "방송·배포 포맷 출력 — IMX SD · XDCAM HD와 H.264 계열로 변환합니다.",
          "GPU 가속 — Intel Pro Graphics GPU 환경에서 XDCAM → H.264(IPTV 화질)를 약 6.9배속으로 처리합니다.",
        ],
        image: "/assets/technology/media/ariel-transcoder.png",
        imageNarrow: true,
        imageWidth: 260,
      },
      {
        code: "Rewrapper",
        title: "무손실 래퍼 변환",
        sub: "Rewrapper",
        desc: "영상을 재압축하지 않고 래퍼(컨테이너)만 바꿔 화질 손실 없이 단시간에 포맷을 변환합니다.",
        points: [
          "무손실 래퍼 변환 — 재압축 없이 MXF ↔ MOV, TS ↔ MP4 간 컨테이너를 변환합니다.",
          "방송·편집 포맷 호환 — 방송용 MXF와 Apple MOV를 서로 변환합니다.",
          "녹화 TS → MP4 — 녹화된 TS 영상에서 MP4를 생성합니다.",
        ],
        image: "/assets/technology/media/rewrapper.png",
        imageNarrow: true,
        imageWidth: 260,
      },
      {
        code: "Cutting & Merge",
        title: "영상 컷팅 · 병합",
        sub: "Cutting & Merge",
        desc: "컷팅 정보를 이용해 영상의 일부를 잘라 붙여 새 영상을 만듭니다. 스마트 렌더링으로 전체를 재인코딩하지 않아 빠릅니다.",
        points: [
          "스마트 렌더링 — 잘린 구간(GOP 경계)만 재인코딩하고 나머지는 그대로 합쳐 처리 시간을 줄입니다.",
          "컷 · 병합 — 여러 세그먼트를 잘라 하나의 결과 파일로 생성합니다.",
          "다양한 코덱 — H.264/AAC/MP4 · H.265(HEVC) · IMX 30/40/50Mbps · DV25/DVCPRO · AVC-Intra를 지원합니다.",
        ],
        image: "/assets/technology/media/cutting-merge.png",
      },
      {
        code: "Ariel Catalog",
        title: "장면 분석 · 카탈로깅",
        sub: "Cataloging",
        desc: "영상의 장면을 분석해 장면 전환 지점을 검출하고, 키 프레임을 생성해 MAM 화면에 표시합니다. 콘텐츠를 빠르게 훑어볼 수 있습니다.",
        points: [
          "장면 전환 검출 — Scene Change Detection으로 전환 지점을 자동으로 찾습니다.",
          "키 프레임 생성 — 구간별 대표 프레임을 추출해 스토리보드를 만듭니다.",
          "MAM 연동 — 재생 시 참조할 그리드 이미지 판을 구성해 MAM에서 바로 확인합니다.",
        ],
        image: "/assets/technology/media/ariel-catalog.png",
        imageWidth: 380,
      },
      {
        code: "Loudness Detection",
        title: "라우드니스 검출",
        sub: "Loudness Detection",
        desc: "사람이 느끼는 체감 음량을 국제 표준에 맞춰 측정합니다. ITU-R BS.1770 규격에 따라 라우드니스를 산출합니다.",
        points: [
          "국제 표준 측정 — ITU-R BS.1770 규격으로 체감 음량을 측정합니다.",
          "표준 단위 — dB LKFS · dB LUFS 단위로 결과를 제공합니다.",
          "실시간 · 파일 측정 — 실시간 미터와 파일 단위 측정(Integrate · Short-Term · Momentary · True Peak)을 지원합니다.",
        ],
        image: "/assets/technology/media/loudness.png",
      },
    ],
  },
  {
    id: "nle",
    code: "NLE INTEGRATION",
    title: "NLE 편집 장비 연동",
    summary: "주요 NLE 편집 장비용 플러그인과 웹 기반 편집기로, 편집 결과물을 곧바로 MAM에 올립니다.",
    intro:
      "전 세계 주요 NLE 편집 시스템과 연동하는 플러그인 기술을 제공합니다. 편집한 영상을 별도 프로그램 없이 바로 MAM으로 올릴 수 있습니다. 1~2종만 지원하는 경쟁사와 달리 주요 NLE 장비를 폭넓게 지원합니다.",
    blocks: [
      {
        code: "NLE Plug-in",
        title: "NLE 플러그인 연동",
        sub: "NLE Plug-in",
        desc: "주요 NLE 편집 장비의 메뉴에 MAM 전송 메뉴가 삽입되어, 편집 장비에서 MAM으로 영상을 바로 전송합니다. 별도 프로그램을 거치지 않습니다.",
        points: [
          "메뉴 내장 전송 — 편집 장비 메뉴에 MAM 전송 항목이 들어가, 편집 결과물을 곧바로 MAM에 올립니다.",
          "폭넓은 지원 — Adobe Premiere · Apple Final Cut Pro X · GrassValley EDIUS · Avid Media Composer를 지원합니다.",
          "차별화된 호환성 — 1~2종만 지원하는 경쟁사와 달리 주요 NLE 장비를 폭넓게 연동합니다.",
        ],
        image: "/assets/technology/nle/nle-plugin.jpg",
      },
      {
        code: "Web NLE",
        title: "웹 기반 영상 편집",
        sub: "Web Video Editor",
        desc: "Adobe Premiere 같은 데스크톱 프로그램 없이 웹 브라우저에서 영상을 제작·편집합니다. 편집한 콘텐츠를 YouTube 등 플랫폼으로 바로 내보냅니다.",
        points: [
          "설치 불필요 — 브라우저만으로 영상 콘텐츠를 만들고 편집합니다.",
          "타임라인 편집 — 미디어·텍스트·오디오를 타임라인에 올려 컷·자막을 구성합니다.",
          "바로 배포 — 편집 결과물을 YouTube 등 플랫폼으로 곧바로 내보냅니다.",
        ],
        image: "/assets/technology/nle/web-nle.png",
      },
    ],
  },
  {
    id: "archive",
    code: "ARCHIVE SYSTEM",
    title: "아카이브 시스템 기술",
    summary: "외부 아카이브 솔루션 연동과 자체 IMArchive로 미디어를 안전하고 경제적으로 보관합니다.",
    intro:
      "미디어 데이터를 SAN·NAS 같은 공유 스토리지에만 두면 즉시 접근은 편하지만 비용이 늘고 데이터 유실 위험이 커집니다. 제머나이소프트는 아카이브 솔루션 연동으로 이 한계를 보완해, 미디어를 안전하고 경제적으로 보관합니다.",
    blocks: [
      {
        code: "3rd Party Archive",
        title: "외부 아카이브 솔루션 연동",
        sub: "3rd Party Integration",
        desc: "다양한 외부 아카이브 솔루션과 연동해, 이미 운영 중인 아카이브 환경 위에 그대로 얹어 사용합니다.",
        points: [
          "다중 솔루션 지원 — Oracle DIVArchive · Masstech-SGL FlashNet · Quantum StorNext(Artico) · SpectraLogic BlackPearl과 연동합니다.",
          "기존 환경 활용 — 도입한 아카이브 솔루션을 교체하지 않고 MAM 워크플로우에 연결합니다.",
          "워크플로우 자동화 — 아카이브·복원을 워크플로우로 자동 처리합니다.",
        ],
        image: "/assets/technology/archive/third-party.png",
      },
      {
        code: "IMArchive",
        title: "자체 아카이브 IMArchive",
        sub: "In-house Archive Platform",
        desc: "제머나이소프트가 직접 개발한 아카이브 플랫폼입니다. LTFS 기반 테이프부터 ODA까지 다양한 매체에 미디어를 보관합니다.",
        points: [
          "LTFS 기반 아카이브 — Quantum · Oracle 등 LTFS 라이브러리에 미디어를 아카이브합니다.",
          "ODA 아카이브 — SONY ODA 하드웨어를 활용해 광 디스크 매체에 보관합니다.",
          "스토리지 연계 — 다양한 스토리지 시스템과 연동해 보관·복원을 관리합니다.",
        ],
        image: "/assets/technology/archive/imarchive.png",
      },
    ],
  },
  {
    id: "transfer",
    code: "MEDIA TRANSFER",
    title: "미디어 전송",
    summary: "방송 전송 노하우를 담은 트랜스퍼 매니저로, 대상에 맞는 포맷 변환과 가속 전송을 함께 처리합니다.",
    intro:
      "방송용 비디오 서버나 미디어 전송은 일반 파일 복사와 다른 전송 방식이 필요할 때가 많습니다. 방송 영상 전송 노하우를 담은 트랜스퍼 매니저가 대상에 맞는 포맷 변환과 전송을 함께 처리합니다.",
    blocks: [
      {
        code: "Ariel Transfer",
        title: "트랜스퍼 매니저",
        sub: "Transfer Manager",
        desc: "스토리지와 웹서버·VOD 서버·비디오 서버 사이에서 미디어를 전송하고, 대상에 맞는 포맷으로 변환합니다. 가속 전송과 파일 검증까지 지원합니다.",
        points: [
          "대상별 포맷 전송 — 웹서버에는 MP4 + XML(FTP/HTTP), VOD 서버에는 MP4(FTP), 비디오 서버에는 MXF(FTP)로 내보냅니다.",
          "방송 포맷 변환 — MOV ↔ MXF, LXF ↔ MXF 간 포맷을 매끄럽게 변환합니다.",
          "가속 · 원격 전송 — WDT · Aspera 등으로 원격지에 대용량 미디어를 빠르게 전송합니다.",
          "파일 검증 — MD5 해시를 생성해 대용량 원본의 무결성을 검증합니다.",
          "비디오 서버 연동 — Omneon · Grass Valley · Imagine 등 상용 비디오 서버로 전송합니다.",
        ],
        image: "/assets/technology/transfer/ariel-transfer.png",
      },
    ],
  },
  {
    id: "workflow",
    code: "WORKFLOW",
    title: "워크플로우 관리",
    summary: "MAM에 내장된 워크플로우 편집기로 복잡한 처리 과정을 누구나 쉽게 정의하고 수정합니다.",
    intro:
      "비즈니스 프로세스 툴을 배우고 다이어그램을 그리는 일은 쉽지 않습니다. MAM에 내장된 워크플로우 편집기로 복잡한 미디어 처리 과정을 누구나 쉽게 정의하고 수정합니다.",
    blocks: [
      {
        code: "Workflow Editor",
        title: "워크플로우 편집 기능",
        sub: "Workflow Editor",
        desc: "MAM 솔루션에 내장된 워크플로우 편집 도구입니다. 인제스트·변환·카탈로깅 같은 처리 단계를 작업으로 묶어 시각적으로 흐름을 구성합니다.",
        points: [
          "시각적 흐름 구성 — 인제스트 전송 → 비디오 정보 분석 → 프록시 생성 → 썸네일·카탈로그 생성처럼 처리 단계를 다이어그램으로 잇습니다.",
          "작업 프리셋 — S-MAM 전송 · 스토리지 전송 · 주조 전송 · SNS 배포 포맷 등 자주 쓰는 작업을 프리셋으로 등록해 끌어다 씁니다.",
          "세부 파라미터 제어 — 단계별 대상 경로, 시작 조건(이전 작업 종료 후), 해상도·비트레이트 같은 파라미터를 지정합니다.",
          "쉬운 정의·수정 — 별도 프로세스 툴을 배우지 않고도 워크플로우를 정의하고 바로 바꿉니다.",
        ],
        image: "/assets/technology/workflow/workflow-editor.png",
      },
    ],
  },
  {
    id: "ai-compensation",
    code: "AI DYNAMIC",
    title: "AI 동적 보상",
    summary: "딥러닝 프레임 보간으로 중간 프레임을 생성해 프레임 레이트를 높이고 움직임을 부드럽게 만듭니다.",
    intro:
      "기존 영상의 연속된 프레임 사이에 새로운 중간 프레임을 생성해 프레임 레이트를 높이고 움직임을 더 부드럽게 만듭니다. 딥러닝 기반 프레임 예측 모델로 자연스럽게 이어지는 영상을 만듭니다.",
    blocks: [
      {
        code: "Frame Interpolation",
        title: "AI 프레임 보간",
        sub: "Frame Interpolation",
        desc: "딥러닝 기반 프레임 예측 모델이 연속된 두 프레임 사이의 옵티컬 플로우(optical flow)를 분석해, 자연스럽게 이어지는 중간 프레임을 생성합니다.",
        points: [
          "딥러닝 프레임 예측 — 연속 프레임 간 옵티컬 플로우를 분석해 중간 프레임을 만듭니다.",
          "부드러운 움직임 — 프레임 레이트를 높여 낮은 프레임 레이트 영상의 모션 블러와 끊김(스터터링)을 효과적으로 줄입니다.",
          "자연스러운 보간 — 단순 복제가 아니라 움직임을 따라가는 새 프레임을 생성합니다.",
        ],
        image: "/assets/technology/ai/frame-interpolation.png",
      },
      {
        code: "Processing Pipeline",
        title: "분리 · 보간 · 병합 처리",
        sub: "Processing Pipeline",
        desc: "원본 영상에서 오디오와 프레임을 분리해 프레임만 보간한 뒤, 원본 오디오와 다시 합쳐 영상을 출력합니다. 방송 환경에 맞는 포맷으로 내보냅니다.",
        points: [
          "분리 · 보간 · 병합 — 원본에서 오디오·프레임을 추출하고, 프레임을 보간한 뒤 원본 오디오와 병합해 출력합니다.",
          "다양한 스캔 방식 — Progressive와 Interlaced 영상을 모두 지원합니다.",
          "방송 표준 출력 — 방송 표준 29.97fps로 출력해 방송 환경에 바로 활용합니다.",
        ],
        image: "/assets/technology/ai/pipeline.png",
        imageScale: 1.12,
      },
    ],
  },
];

/** 헤더/푸터 내비게이션에서 쓰는 드롭다운 링크 목록. */
export const TECHNOLOGY_NAV = TECHNOLOGIES.map((t) => ({
  label: t.title,
  href: `/technology/#${t.id}`,
}));
