"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { COMPANY, PRIMARY_NAV, asset } from "@/components/site-config";

/**
 * 공통 헤더 — 상단 유틸리티 바 + sticky 내비게이션 + 모바일 메뉴.
 * 모바일 메뉴 토글 상태 때문에 클라이언트 컴포넌트.
 */
export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* 상단 유틸리티 바 (데스크탑 전용) */}
      <div className="gem-utilbar gem-hide-sm">
        <div className="gem-container gem-utilbar__inner">
          <div className="gem-utilbar__group">
            <span>{COMPANY.name}</span>
            <span className="gem-sep">·</span>
            <span>{COMPANY.location}</span>
          </div>
          <div className="gem-utilbar__group gem-utilbar__group--end">
            <a href="#contact">고객지원</a>
            <a href="#contact">파트너</a>
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
            {PRIMARY_NAV.map((item, i) => (
              <Link key={i} href={item.href} className="gem-nav__link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="gem-header__actions">
            <Link href="/#contact" className="gem-header__cta-text gem-hide-sm">
              문의
            </Link>
            <Link href="/#contact" className="gem-header__cta gem-hide-sm">
              데모 신청
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
              <Link key={i} href={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="gem-mobile-menu__cta"
              onClick={closeMenu}
            >
              데모 신청
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
