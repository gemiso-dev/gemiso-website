import Link from "next/link";
import Reveal from "@/components/Reveal";
import ScrollHighlightText from "@/components/ScrollHighlightText";
import HeroScrollButton from "@/components/HeroScrollButton";
import CustomerMarquee from "@/components/CustomerMarquee";
import CopyField from "@/components/CopyField";
import { COMPANY, asset } from "@/components/site-config";
import { NEWS_ARTICLES } from "@/components/news-data";
import { pageMetadata } from "@/components/seo";

export const metadata = pageMetadata({
  title: "레거시를 넘어 AX로, 방송의 미래를 설계하는 AI 미디어 플랫폼",
  description:
    "Geminisoft는 AI 기반 플랫폼 어웨어(Platform-Aware) 방송을 위한 AX 기술을 제공합니다. 전 세계 방송사·글로벌 OTT와 어깨를 나란히 할 새로운 미디어 비즈니스 모델을 만듭니다.",
  path: "/",
});

/** 홈 뉴스 섹션 — 뉴스룸 데이터의 최신 3건과 연동. */
const LATEST_NEWS = NEWS_ARTICLES.slice(0, 3);

/* ----------------------------------------------------------------- 데이터 */

const SOLUTIONS: {
  num: string;
  tag: string;
  title: string;
  desc: string;
  /** 사이트에서 숨김(카드 미노출). 코드는 보존 — 복구 시 플래그 제거. */
  hidden?: boolean;
}[] = [
  {
    num: "01",
    tag: "PROXIMA",
    title: "미디어 자산 관리",
    desc: "소프트웨어 코덱과 긴밀한 NLE 연동으로 모든 자산을 인제스트·인코딩·카탈로깅하고 관리합니다.",
  },
  {
    num: "02",
    tag: "ZODIAC",
    title: "뉴스룸 (NRCS)",
    desc: "기획·취재·기사 작성·큐시트 구성부터 송출까지 — PC와 모바일에서 하나의 뉴스룸 워크플로우로.",
  },
  {
    num: "03",
    tag: "TALOS",
    title: "자동 송출 (APC)",
    desc: "편성표를 수신하거나 직접 구성하고 비디오 서버를 제어해 완전 이중화된 무중단 송출을 구현합니다.",
  },
  {
    // [숨김] 현재 미사용 솔루션 — 복구 시 hidden 플래그 제거.
    num: "04",
    tag: "EMOTION",
    title: "라디오",
    desc: "하드웨어에 종속되지 않는 라디오 제작과 송출 — 멀티트랙 편집과 큐시트를 지원합니다.",
    hidden: true,
  },
  {
    num: "05",
    tag: "WINNER-S",
    title: "라디오",
    desc: "제작·편성·광고·생방송·자동 송출·관제까지 — 아홉 개의 단말로 잇는 디지털 라디오.",
  },
  {
    num: "06",
    tag: "MAIA",
    title: "AI 기술",
    desc: "미디어를 위한 AI — 방송 데이터로 학습한 메타데이터, 자막, 동적 보정 기술.",
  },
  {
    num: "07",
    tag: "MYMY",
    title: "콘텐츠 아카이브",
    desc: "검색이 자유롭고 계속 늘어나는 미디어 라이브러리를 위한 안정적인 장기 디지털·영상 아카이빙.",
  },
  {
    num: "08",
    tag: "G-SAM",
    title: "콘텐츠 배포",
    desc: "하나의 콘텐츠를 YouTube·Instagram·X·TikTok 등 여러 SNS 플랫폼에 배포하고 통계로 관리합니다.",
  },
];

const REASONS = [
  {
    icon: (
      // 미디어 처리 기술의 진화 — 우상향 추이
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 24 L12 16 L18 21 L28 9" />
        <path d="M21 9 L28 9 L28 16" />
      </svg>
    ),
    title: "미디어 처리 기술의 진화",
    desc: "빠르게 변하는 미디어 환경에 맞춰 처리 기술을 발전시켜, 고객이 플랫폼을 교체하지 않고도 변화에 발맞출 수 있습니다.",
  },
  {
    icon: (
      // 자체 보유한 핵심 기술 — 칩(코어)
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="10" y="10" width="12" height="12" rx="1" />
        <path d="M13 4 V8 M19 4 V8 M13 24 V28 M19 24 V28 M4 13 H8 M4 19 H8 M24 13 H28 M24 19 H28" />
      </svg>
    ),
    title: "자체 보유한 핵심 기술",
    desc: "주도적인 엔지니어들이 핵심 원천 기술을 직접 개발하고 보유합니다 — 한국 방송 환경에 맞춰 미디어 관리를 토착화한 연구의 결과입니다.",
  },
  {
    icon: (
      // 한발 앞선 AX·AI 기술 지원 — 스파클(AI)
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 4 L16 11 L23 13 L16 15 L14 22 L12 15 L5 13 L12 11 Z" />
        <path d="M23 20 L24 23 L27 24 L24 25 L23 28 L22 25 L19 24 L22 23 Z" />
      </svg>
    ),
    title: "한발 앞선 AX·AI 기술 지원",
    desc: "방송에 필요한 AX·AI 기술을 먼저 연구하고 현장에 적용해, 고객이 변화에 앞서 대응하도록 지원합니다.",
  },
  {
    icon: (
      // 방송 워크플로우에 대한 이해 — 흐름(파이프라인)
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="7" cy="9" r="3" />
        <circle cx="7" cy="23" r="3" />
        <circle cx="25" cy="16" r="3" />
        <path d="M10 9 H16 a3 3 0 0 1 3 3 V15 M10 23 H16 a3 3 0 0 0 3 -3 V17 M19 16 H22" />
      </svg>
    ),
    title: "방송 워크플로우에 대한 이해",
    desc: "제작부터 송출까지 방송 서비스의 흐름을 깊이 이해하고, 현장에 맞는 시스템을 설계합니다.",
  },
  {
    icon: (
      // 상생하는 성장 — 맞물린 협력
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="16" r="7" />
        <circle cx="20" cy="16" r="7" />
      </svg>
    ),
    title: "상생하는 성장",
    desc: "고객 및 파트너와의 진정한 협력으로 사업을 키우고, 모든 구축의 성과를 함께 나눕니다.",
  },
];

const STATS = [
  { num: "20년+", label: "축적된 미디어 엔지니어링" },
  { num: "1등급", label: "GS 인증 — Proxima v3.0" },
  { num: "2015", label: "방송장비 분야 히든챔피언 선정" },
  { num: "전국", label: "국내 주요 방송사에서 운영 중" },
];

const TECH_ITEMS = [
  { n: "01", t: "인제스트 & 비디오 인코딩", d: "방송 현장에서 실제로 쓰는 포맷으로의 소프트웨어 코덱 인코딩" },
  { n: "02", t: "NLE 연동", d: "편집 시스템 및 파일 기반 워크플로우와의 네이티브 연동" },
  { n: "03", t: "미디어 프로세싱", d: "대규모 미디어의 트랜스코딩·변환·정규화" },
  { n: "04", t: "컷 편집", d: "프레임 단위로 정확한 빠른 트리밍과 클립 구성" },
  { n: "05", t: "아카이브 시스템", d: "계속 늘어나는 라이브러리를 위한 안정적이고 검색 가능한 장기 저장" },
  { n: "06", t: "카탈로그", d: "모든 자산을 찾을 수 있게 하는 풍부한 메타데이터와 인덱싱" },
  { n: "07", t: "미디어 전송", d: "Transfer Manager를 통한 MOV–MXF, LXF–MXF 전송 관리" },
  { n: "08", t: "워크플로우 관리", d: "작업과 승인을 처음부터 끝까지 오케스트레이션" },
  { n: "09", t: "뉴스 워크플로우", d: "기획·취재·데스크·큐시트를 하나의 뉴스룸에서" },
];

/* ------------------------------------------------------------------ 페이지 */

export default function Home() {
  return (
    <>
      {/* 히어로 */}
      <section
        className="gem-hero gem-hero--center"
        style={{
          backgroundImage: `radial-gradient(ellipse 72% 85% at 50% 50%, rgba(255,255,255,0.8) 16%, rgba(255,255,255,0.85) 52%, rgba(255,255,255,0.94) 84%), url(${asset(
            "/assets/hero/hero-bg5.webp",
          )})`,
        }}
      >
        <div className="gem-container gem-hero__grid gem-hero__grid--center">
          <Reveal>
            <div className="gem-eyebrow gem-eyebrow--badge">
              <span>Broadcast AX Technology Partner</span>
            </div>
            <h1 className="gem-hero__title">
              레거시를 넘어 <span className="gem-hero__hl">AX</span>로,
              <br />
              방송의 미래를 설계하다
            </h1>
            <div className="gem-hero__actions">
              <Link href="/support/#inquiry" className="gem-btn gem-btn--primary">
                AX 전략 상담하기
              </Link>
            </div>
            <p className="gem-hero__note">
              MBC, YTN, SBS, EBS, KTV, TBS, 아리랑 TV가 신뢰합니다.
            </p>
          </Reveal>
        </div>
        <HeroScrollButton />
      </section>

      {/* 브랜드 스테이트먼트 (토스 스타일 대형 문장) */}
      <section id="statement" className="gem-statement">
        <div className="gem-container">
          <Reveal>
            <ScrollHighlightText
              className="gem-statement__text"
              lines={[
                "누구나 AX를 말하지만, Geminisoft는 현장에서 증명합니다.",
                "국내 주요 방송사가 선택한 기술 위에 AI를 더해,",
                "방송의 다음 단계를 함께 만들어갑니다.",
              ]}
            />
            <div className="gem-statement__actions">
              <a href="#solutions" className="gem-btn gem-btn--link">
                솔루션 살펴보기 →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 솔루션 */}
      <section id="solutions" className="gem-section">
        <div className="gem-container">
          <Reveal className="gem-section__head">
            <div className="gem-eyebrow">
              <span>솔루션</span>
            </div>
            <h2 className="gem-title gem-title--nowrap">
              미디어 라이프사이클 전체를 하나의 플랫폼으로
            </h2>
            <p className="gem-lead">
              카메라에서 송출, 그리고 아카이브까지 — 모든 단계가 Geminisoft가
              직접 개발하고 보유한 솔루션 위에서 작동합니다.
            </p>
          </Reveal>

          <div className="gem-grid-cards">
            {SOLUTIONS.filter((s) => !s.hidden).map((s, i) => (
              <Link
                key={s.tag}
                href={`/solutions/${s.tag.toLowerCase()}/`}
                className="gem-card"
              >
                <div className="gem-card__meta">
                  <span className="gem-card__num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="gem-card__tag">{s.tag}</span>
                </div>
                <h3 className="gem-card__title">{s.title}</h3>
                <p className="gem-card__desc">{s.desc}</p>
                <span className="gem-arrow">자세히 보기 →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 고객사 마키 */}
      <section className="gem-marquee" aria-label="고객사">
        <Reveal className="gem-marquee__head">
          <div className="gem-eyebrow">
            <span>고객사</span>
          </div>
          <h2 className="gem-title gem-title--sm">
            많은 고객이 보내준 신뢰, 흔들림 없는 기술 지원으로 답합니다
          </h2>
        </Reveal>
        <CustomerMarquee />
      </section>

      {/* 선택 이유 + 통계 */}
      <section className="gem-section">
        <div className="gem-container">
          <Reveal className="gem-section__head">
            <div className="gem-eyebrow">
              <span>Geminisoft의 강점</span>
            </div>
            <h2 className="gem-title">방송사가 Geminisoft를 선택하는 이유</h2>
          </Reveal>

          <Reveal as="div" className="gem-reasons">
            {REASONS.map((r, i) => (
              <div key={i} className="gem-reason">
                <span className="gem-reason__icon">{r.icon}</span>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </Reveal>

          <Reveal as="div" className="gem-stats">
            {STATS.map((s, i) => (
              <div key={i} className="gem-stat">
                <div className="gem-stat__num">{s.num}</div>
                <div className="gem-stat__label">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 기술 */}
      <section className="gem-section gem-section--alt">
        <div className="gem-container">
          <Reveal className="gem-section__head">
            <div className="gem-eyebrow">
              <span>기술</span>
            </div>
            <h2 className="gem-title">직접 개발한 핵심 미디어 기술</h2>
            <p className="gem-lead">
              Geminisoft는 미디어 자산 관리, 아카이빙, 뉴스룸 컴퓨팅 전반에 걸쳐
              전문 역량을 보유하고 있습니다.
            </p>
          </Reveal>

          <Reveal as="div" className="gem-grid-lines">
            {TECH_ITEMS.map((t) => (
              <div key={t.n} className="gem-tech">
                <span className="gem-tech__num">{t.n}</span>
                <h3>{t.t}</h3>
                <p>{t.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 뉴스 */}
      <section id="news" className="gem-section">
        <div className="gem-container">
          <Reveal className="gem-news__head">
            <div>
              <div className="gem-eyebrow">
                <span>소식</span>
              </div>
              <h2 className="gem-title">Geminisoft의 최신 소식</h2>
            </div>
            <Link href="/news/" className="gem-news__more">
              전체 뉴스 보기 →
            </Link>
          </Reveal>

          <Reveal as="div" className="gem-news-grid">
            {LATEST_NEWS.map((n) => (
              <Link
                key={n.id}
                href={`/news/${n.id}/`}
                className="gem-news-card"
              >
                <div className="gem-news-card__thumb">
                  {n.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={asset(n.image)} alt={n.title} loading="lazy" />
                  ) : (
                    <span className="news-thumb__ph">GEMISO NEWS</span>
                  )}
                </div>
                <div className="gem-news-card__body">
                  <div className="gem-news-card__meta">
                    <span className="gem-news-card__cat">
                      {n.outlet || "보도자료"}
                    </span>
                    {n.date && (
                      <span className="gem-news-card__date">{n.date}</span>
                    )}
                  </div>
                  <h3 className="gem-news-card__title">{n.title}</h3>
                  <p className="gem-news-card__desc">{n.summary}</p>
                  <span className="gem-arrow">자세히 →</span>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 컨택트 CTA */}
      <section id="contact" className="gem-contact">
        <Reveal className="gem-container gem-contact__grid">
          <div>
            <h2 className="gem-contact__title">더 자세한 정보가 필요하신가요?</h2>
            <p className="gem-contact__desc">
              방송 워크플로우를 알려주시면, 저희 팀이 가장 알맞은 솔루션을 함께
              찾아드립니다.
            </p>
            <div className="gem-contact__actions">
              <Link
                href="/support/#inquiry"
                className="gem-btn gem-btn--invert"
              >
                문의하기
              </Link>
              <a
                href="#solutions"
                className="gem-btn gem-btn--underline-light"
              >
                솔루션 살펴보기 →
              </a>
            </div>
          </div>

          <div className="gem-contact__info">
            <div className="gem-info-cell">
              <div className="gem-info-cell__label">전화</div>
              <div className="gem-info-cell__value">{COMPANY.tel}</div>
            </div>
            <div className="gem-info-cell">
              <div className="gem-info-cell__label">이메일</div>
              <CopyField
                text={COMPANY.email}
                label="이메일"
                href={`mailto:${COMPANY.email}`}
              >
                {COMPANY.email}
              </CopyField>
            </div>
            <div className="gem-info-cell">
              <div className="gem-info-cell__label">팩스</div>
              <div className="gem-info-cell__value">{COMPANY.fax}</div>
            </div>
            <div className="gem-info-cell">
              <div className="gem-info-cell__label">주소</div>
              <CopyField
                text={COMPANY.addressLines.join(" ")}
                label="주소"
                small
              >
                {COMPANY.addressLines[0]}
                <br />
                {COMPANY.addressLines[1]}
              </CopyField>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
