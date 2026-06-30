"use client";

import { useState, type ReactNode } from "react";

/**
 * 연락처 값(이메일·주소)을 클립보드에 복사하는 UI.
 * 연락처 셀(gem-info-cell)의 값 영역을 대체해 쓴다.
 *
 * - href를 주면 값 텍스트는 링크(mailto: 등)가 되고, 옆의 "복사" 배지가 복사를 담당한다.
 * - href가 없으면 값 텍스트 영역 자체를 누르면 복사된다(주소 등).
 *
 * HTTPS·localhost(보안 컨텍스트)에서는 Clipboard API를,
 * HTTP 등 비보안 컨텍스트에서는 execCommand 폴백을 사용해 둘 다에서 동작한다.
 */
async function copyText(text: string): Promise<boolean> {
  // 보안 컨텍스트에서만 Clipboard API가 동작한다(HTTP에서는 throw).
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // 폴백으로 진행
    }
  }
  // HTTP 등 비보안 컨텍스트 폴백: 화면 밖 textarea를 선택해 execCommand로 복사.
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-9999px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export default function CopyField({
  text,
  label,
  small,
  href,
  children,
}: {
  /** 클립보드에 복사할 실제 텍스트 */
  text: string;
  /** 접근성/안내 문구에 쓰는 항목명(예: "이메일", "주소") */
  label: string;
  /** 작은 글씨 값(주소 등) 여부 */
  small?: boolean;
  /** 값 텍스트에 걸 링크(예: mailto:). 주면 텍스트는 링크가 되고 복사는 배지가 담당한다. */
  href?: string;
  /** 화면에 보여줄 값(여러 줄 가능) */
  children: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (await copyText(text)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`gem-info-cell__value gem-copy${
        small ? " gem-info-cell__value--sm" : ""
      }`}
    >
      {href ? (
        <a href={href} className="gem-copy__text">
          {children}
        </a>
      ) : (
        <button
          type="button"
          className="gem-copy__text"
          onClick={handleCopy}
          aria-label={`${label} 복사`}
        >
          {children}
        </button>
      )}
      <button
        type="button"
        className={`gem-copy__badge${copied ? " is-copied" : ""}`}
        onClick={handleCopy}
        aria-label={copied ? `${label} 복사됨` : `${label} 복사`}
        title={copied ? "복사됨" : "복사"}
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          {copied ? (
            <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <>
              <rect x="5.5" y="5.5" width="7" height="8" rx="1" />
              <path d="M3.5 10.5 H3 a1 1 0 0 1-1-1 V3 a1 1 0 0 1 1-1 h5.5 a1 1 0 0 1 1 1 v.5" strokeLinecap="round" strokeLinejoin="round" />
            </>
          )}
        </svg>
      </button>
      <span className="gem-sr-only" role="status" aria-live="polite">
        {copied ? `${label}을(를) 클립보드에 복사했습니다` : ""}
      </span>
    </div>
  );
}
