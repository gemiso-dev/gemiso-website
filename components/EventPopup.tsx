"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EVENT_POPUP } from "@/components/event-popup-data";

/** "오늘 하루 보지 않기" 만료 시각(ms)을 저장하는 키. */
const STORAGE_KEY = `gem-popup-hide:${EVENT_POPUP.id}`;

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

/**
 * 홈 진입 시 뜨는 행사 안내 팝업.
 * - 노출 기간(endsAt) 안에서만, "오늘 하루 보지 않기"를 누르지 않았을 때만 연다.
 * - 정적 export라 서버 렌더 시엔 아무것도 그리지 않고, 마운트 후 조건을 확인해 연다.
 */
export default function EventPopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const p = EVENT_POPUP;

  useEffect(() => {
    if (Date.now() > new Date(p.endsAt).getTime()) return;
    if (isHiddenToday()) return;
    setOpen(true);
  }, [p.endsAt]);

  const close = useCallback(() => setOpen(false), []);

  const hideToday = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(nextMidnight()));
    } catch {
      /* 저장 실패 시에도 이번 방문에서는 닫는다 */
    }
    setOpen(false);
  }, []);

  // 열려 있는 동안 ESC로 닫기 + 배경 스크롤 잠금 + 포커스 이동
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
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

  if (!open) return null;

  return (
    <div className="gem-popup" onClick={close}>
      <div
        ref={dialogRef}
        className="gem-popup__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gem-popup-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="gem-popup__scroll">
          {/* 헤더 밴드 */}
          <div className="gem-popup__head">
            <span className="gem-popup__eyebrow">{p.eyebrow}</span>
            <h2 id="gem-popup-title" className="gem-popup__title">
              {p.title.lead}
              <br />
              <span className="gem-popup__name">{p.title.name}</span>{" "}
              {p.title.tail}
            </h2>
          </div>

          <div className="gem-popup__body">
            {p.paragraphs.map((text, i) => (
              <p key={i} className="gem-popup__text">
                {text}
              </p>
            ))}

            <section className="gem-popup__block">
              <h3 className="gem-popup__block-title">{p.launch.heading}</h3>
              <dl className="gem-popup__info">
                {p.launch.rows.map((r) => (
                  <div key={r.label} className="gem-popup__row">
                    <dt>{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="gem-popup__block">
              <h3 className="gem-popup__block-title">{p.exhibition.heading}</h3>
              <dl className="gem-popup__info">
                {p.exhibition.rows.map((r) => (
                  <div key={r.label} className="gem-popup__row">
                    <dt>{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
              <ul className="gem-popup__chips" aria-label="전시 솔루션">
                {p.exhibition.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <a
              href={p.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="gem-btn gem-btn--primary gem-popup__cta"
            >
              {p.cta.label}
              <span className="gem-arrow-slide" aria-hidden="true">
                <span>→</span>
                <span>→</span>
              </span>
            </a>
          </div>
        </div>

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
