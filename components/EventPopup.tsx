"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  POPUP_AUTOPLAY_MS,
  POPUP_SLIDES,
  type PopupSlide,
} from "@/components/event-popup-data";

/** "오늘 하루 보지 않기" 만료 시각(ms)을 저장하는 키. 팝업 전체(모든 슬라이드)에 적용. */
const STORAGE_KEY = "gem-popup-hide";

/** 다음 날 자정(로컬 시간)의 타임스탬프. */
function nextMidnight(): number {
  const d = new Date();
  d.setHours(24, 0, 0, 0);
  return d.getTime();
}

function isHiddenToday(): boolean {
  try {
    const until = Number(window.localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(until) && until > Date.now();
  } catch {
    return false; // 저장소 접근 불가(사생활 보호 모드 등) — 그냥 노출
  }
}

/** 지금 노출 기간 안에 있는 슬라이드만 고른다. */
function activeSlides(now: number): PopupSlide[] {
  return POPUP_SLIDES.filter(
    (s) =>
      (!s.startsAt || new Date(s.startsAt).getTime() <= now) &&
      now < new Date(s.endsAt).getTime(),
  );
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** "<모디오>가", "방송·미디어"처럼 꺾쇠 이름·가운뎃점 단어가 줄 끝에서 갈라지지 않게 묶는다. */
function keepTogether(text: string) {
  return text.split(/(<[^>]+>\S*|\S+·\S+)/).map((part, i) =>
    i % 2 ? (
      <span key={i} className="gem-popup__nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/**
 * 홈 진입 시 뜨는 행사 안내 팝업.
 * - 노출 기간 안의 슬라이드만, "오늘 하루 보지 않기"를 누르지 않았을 때만 연다.
 * - 슬라이드가 2장 이상이면 옆으로 넘기기(스와이프·버튼)와 자동 회전을 지원한다.
 * - 정적 export라 서버 렌더 시엔 아무것도 그리지 않고, 마운트 후 조건을 확인해 연다.
 */
export default function EventPopup() {
  const [slides, setSlides] = useState<PopupSlide[]>([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  /** 사용자가 트랙을 건드릴 때마다 올려 자동 회전 타이머를 다시 건다. */
  const [touch, setTouch] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const open = slides.length > 0;
  const multi = slides.length > 1;

  useEffect(() => {
    if (isHiddenToday()) return;
    setSlides(activeSlides(Date.now()));
    // 모션 최소화 설정이면 자동 회전 없이 시작
    if (prefersReducedMotion()) setPaused(true);
  }, []);

  const close = useCallback(() => setSlides([]), []);

  const hideToday = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(nextMidnight()));
    } catch {
      /* 저장 실패 시에도 이번 방문에서는 닫는다 */
    }
    setSlides([]);
  }, []);

  // 열려 있는 동안 ESC로 닫기 + 배경 스크롤 잠금 + 포커스 이동
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSlides([]);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  /** i번째 슬라이드로 스크롤(끝에서 넘기면 처음으로). */
  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const n = track.children.length;
    const next = ((i % n) + n) % n;
    track.scrollTo({
      left: next * track.clientWidth,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  // 스와이프·버튼 어느 쪽으로 넘기든 스크롤 위치로 현재 슬라이드를 판정한다.
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  // 자동 회전 — 슬라이드가 바뀌거나 사용자가 건드리면 타이머를 처음부터 다시 건다.
  useEffect(() => {
    if (!multi || paused) return;
    const t = window.setTimeout(() => goTo(index + 1), POPUP_AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [multi, paused, index, touch, goTo]);

  if (!open) return null;

  const current = slides[Math.min(index, slides.length - 1)];

  return (
    <div className="gem-popup" onClick={close}>
      <div
        ref={dialogRef}
        className="gem-popup__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`gem-popup-title-${current.id}`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={trackRef}
          className="gem-popup__track"
          onScroll={onScroll}
          onPointerDown={() => setTouch((t) => t + 1)}
          aria-roledescription={multi ? "carousel" : undefined}
        >
          {slides.map((s, i) => (
            <div
              key={s.id}
              className="gem-popup__slide"
              role={multi ? "group" : undefined}
              aria-roledescription={multi ? "slide" : undefined}
              aria-label={multi ? `${i + 1} / ${slides.length}` : undefined}
            >
              {/* 헤더 밴드 */}
              <div className="gem-popup__head">
                <span className="gem-popup__eyebrow">{s.eyebrow}</span>
                <h2 id={`gem-popup-title-${s.id}`} className="gem-popup__title">
                  {s.title.map((line, j) => (
                    <Fragment key={j}>
                      {j > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </h2>
              </div>

              <div className="gem-popup__body">
                {s.paragraphs.map((text, j) => (
                  <p key={j} className="gem-popup__text">
                    {keepTogether(text)}
                  </p>
                ))}

                {s.blocks.map((b, j) => (
                  <section
                    key={j}
                    className={`gem-popup__block${b.heading ? "" : " gem-popup__block--plain"}`}
                  >
                    {b.heading && (
                      <h3 className="gem-popup__block-title">{keepTogether(b.heading)}</h3>
                    )}
                    {b.rows && (
                      <dl className="gem-popup__info">
                        {b.rows.map((r) => (
                          <div key={r.label} className="gem-popup__row">
                            <dt>{r.label}</dt>
                            <dd>
                              {Array.isArray(r.value)
                                ? r.value.map((line, k) => (
                                    <Fragment key={k}>
                                      {k > 0 && <br />}
                                      {line}
                                    </Fragment>
                                  ))
                                : r.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    {b.chips && (
                      <ul className="gem-popup__chips" aria-label="전시 솔루션">
                        {b.chips.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {b.features && (
                      <ul className="gem-popup__features">
                        {b.features.map((f) => (
                          <li key={f.name}>
                            <strong>{f.name}</strong>
                            <span>{f.desc}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}

                {s.cta && (
                  <a
                    href={s.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gem-btn gem-btn--primary gem-popup__cta"
                  >
                    {s.cta.label}
                    <span className="gem-arrow-slide" aria-hidden="true">
                      <span>→</span>
                      <span>→</span>
                    </span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 페이지 바: 진행 표시(클릭 이동) + 이전/정지·재생/다음 */}
        {multi && (
          <div className="gem-popup__pager">
            <div className="gem-popup__dots">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={`gem-popup__dot${i === index ? " is-active" : ""}`}
                  aria-label={`${i + 1}번째 소식 보기`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => goTo(i)}
                >
                  {/* 재생 중이면 진행 바가 자동 회전 간격만큼 차오른다 */}
                  <span
                    key={`${index}-${touch}-${paused}`}
                    className={`gem-popup__dot-fill${
                      i === index && !paused ? " is-running" : ""
                    }`}
                    style={{ animationDuration: `${POPUP_AUTOPLAY_MS}ms` }}
                  />
                </button>
              ))}
            </div>
            <span className="gem-popup__count" aria-live={paused ? "polite" : "off"}>
              <b>{index + 1}</b> / {slides.length}
            </span>
            <div className="gem-popup__nav">
              <button
                type="button"
                className="gem-popup__nav-btn"
                aria-label="이전 소식"
                onClick={() => goTo(index - 1)}
              >
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M12.5 4.5 7 10l5.5 5.5" />
                </svg>
              </button>
              <button
                type="button"
                className="gem-popup__nav-btn"
                aria-label={paused ? "자동 넘김 재생" : "자동 넘김 정지"}
                onClick={() => setPaused((p) => !p)}
              >
                {paused ? (
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M7 5v10l8-5z" className="is-fill" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M7.5 5v10M12.5 5v10" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                className="gem-popup__nav-btn"
                aria-label="다음 소식"
                onClick={() => goTo(index + 1)}
              >
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M7.5 4.5 13 10l-5.5 5.5" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* 하단 바: 오늘 하루 보지 않기 / 닫기 */}
        <div className="gem-popup__foot">
          <button type="button" className="gem-popup__foot-btn" onClick={hideToday}>
            오늘 하루 보지 않기
          </button>
          <button
            type="button"
            className="gem-popup__foot-btn gem-popup__foot-btn--close"
            onClick={close}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
