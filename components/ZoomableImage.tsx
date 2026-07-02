"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
};

/**
 * 클릭하면 전체화면 라이트박스로 크게 보는 이미지.
 * 오버레이는 portal로 body에 렌더 — 부모의 transform/overflow(예: .sol-shot 틸트)에 잘리지 않도록.
 */
export default function ZoomableImage({
  src,
  alt,
  className,
  loading = "lazy",
}: Props) {
  const [open, setOpen] = useState(false);

  // 열려 있는 동안 ESC로 닫기 + 배경 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={className}
        onClick={() => setOpen(true)}
        style={{ cursor: "zoom-in" }}
      />
      {open &&
        createPortal(
          <div
            className="gem-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              className="gem-lightbox__close"
              aria-label="닫기"
              onClick={() => setOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 5 19 19 M19 5 5 19"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="gem-lightbox__img" />
          </div>,
          document.body,
        )}
    </>
  );
}
