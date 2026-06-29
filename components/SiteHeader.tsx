"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { PRIMARY_NAV, asset } from "@/components/site-config";

/**
 * 공통 헤더 — 상단 유틸리티 바 + sticky 내비게이션 + 모바일 메뉴.
 * 모바일 메뉴 토글 + 데스크탑 드롭다운 상태 때문에 클라이언트 컴포넌트.
 */
export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // 데스크탑 드롭다운: 한 번에 하나만 열리도록 인덱스 하나로 관리한다.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openDropdown = (i: number) => {
    cancelClose();
    setOpenIndex(i);
  };
  // 트리거 ↔ 패널 사이 12px 간격을 지날 때 깜빡 닫히지 않도록 지연 후 닫는다.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenIndex(null), 120);
  };

  return (
    <>
      {/* 상단 유틸리티 바 (데스크탑 전용) */}
      <div className="gem-utilbar gem-hide-sm">
        <div className="gem-container gem-utilbar__inner">
          <div className="gem-utilbar__group gem-utilbar__group--end">
            <Link href="/support/">고객지원</Link>
            <Link href="/partners/">파트너</Link>
            <span className="gem-lang">
              <a href="#" className="gem-lang__current">
                KR
              </a>
              <span className="gem-sep">/</span>
              <a href="#">EN</a>
            </span>
          </div>
        </div>
      </div>

      {/* sticky 헤더 */}
      <header className="gem-header" id="top">
        <div className="gem-container gem-header__inner">
          <Link href="/" className="gem-logo" aria-label="Geminisoft 홈">
            <Image
              src={asset("/assets/geminisoft-logo.png")}
              alt="Geminisoft"
              width={126}
              height={26}
              priority
            />
          </Link>

          <nav className="gem-nav gem-hide-sm" aria-label="주요 메뉴">
            {PRIMARY_NAV.map((item, i) =>
              item.children ? (
                <div
                  key={i}
                  className="gem-nav__item"
                  onMouseEnter={() => openDropdown(i)}
                  onMouseLeave={scheduleClose}
                  onFocus={() => openDropdown(i)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      scheduleClose();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setOpenIndex(null);
                  }}
                >
                  <Link
                    href={item.href}
                    className="gem-nav__link"
                    aria-haspopup="true"
                    aria-expanded={openIndex === i}
                  >
                    {item.label}
                  </Link>
                  <div
                    className={`gem-nav__dropdown${
                      openIndex === i ? " is-open" : ""
                    }`}
                    role="menu"
                    aria-hidden={openIndex !== i}
                  >
                    {item.children.map((child, j) => (
                      <Link
                        key={j}
                        href={child.href}
                        className="gem-nav__drop-link"
                        role="menuitem"
                        tabIndex={openIndex === i ? undefined : -1}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={i} href={item.href} className="gem-nav__link">
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="gem-header__actions">
            <Link href="/#contact" className="gem-header__cta gem-hide-sm">
              문의
            </Link>
            <button
              type="button"
              className="gem-menu-btn gem-show-sm"
              aria-label="메뉴 열기"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 패널 */}
        {menuOpen && (
          <div className="gem-mobile-menu" style={{ display: "flex" }}>
            {PRIMARY_NAV.map((item, i) => (
              <div key={i} className="gem-mobile-menu__group">
                <Link href={item.href} onClick={closeMenu}>
                  {item.label}
                </Link>
                {item.children?.map((child, j) => (
                  <Link
                    key={j}
                    href={child.href}
                    className="gem-mobile-menu__sub"
                    onClick={closeMenu}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              href="/#contact"
              className="gem-mobile-menu__cta"
              onClick={closeMenu}
            >
              문의
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
