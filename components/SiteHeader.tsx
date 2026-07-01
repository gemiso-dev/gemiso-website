"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PRIMARY_NAV, asset, type NavItem } from "@/components/site-config";

/** 경로 정규화: 끝 슬래시 제거(루트 "/"는 유지). */
const stripSlash = (s: string) => (s !== "/" && s.endsWith("/") ? s.slice(0, -1) : s);

/**
 * 현재 경로가 해당 탭(또는 그 하위 페이지)에 속하면 true.
 * 탭 자신의 href와 children href들을 후보로 모아 prefix 매칭한다.
 */
function isNavActive(item: NavItem, pathname: string): boolean {
  const path = stripSlash(pathname || "/");
  const hrefs = [item.href, ...(item.children?.map((c) => c.href) ?? [])];
  return hrefs.some((h) => {
    const base = stripSlash(h);
    return base !== "/" && (path === base || path.startsWith(base + "/"));
  });
}

/**
 * 공통 헤더 — 상단 유틸리티 바 + sticky 내비게이션 + 모바일 메뉴.
 * 모바일 메뉴 토글 + 데스크탑 드롭다운 상태 때문에 클라이언트 컴포넌트.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // 데스크탑 폭(≥861px)으로 넓어지면 열려 있던 모바일 메뉴를 자동으로 닫는다.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 861px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // 모바일 메뉴가 열려 있는 동안 뒤 페이지 스크롤을 잠근다(스크롤바 이중 노출 방지).
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  // 최상단에서는 투명, 스크롤하면 흰 배경 표시
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      {/* sticky 헤더 */}
      <header
        className={`gem-header${scrolled ? " is-scrolled" : ""}`}
        id="top"
      >
        <div className="gem-container gem-header__inner">
          <Link
            href="/"
            className="gem-logo"
            aria-label="Geminisoft 홈"
            onClick={closeMenu}
          >
            <Image
              src={asset("/assets/geminisoft-logo.png")}
              alt="Geminisoft"
              width={136}
              height={28}
              priority
            />
          </Link>

          <nav className="gem-nav gem-hide-sm" aria-label="주요 메뉴">
            {PRIMARY_NAV.map((item, i) => {
              const active = isNavActive(item, pathname);
              return item.children ? (
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
                    className={`gem-nav__link${active ? " is-active" : ""}`}
                    aria-haspopup="true"
                    aria-expanded={openIndex === i}
                    aria-current={active ? "page" : undefined}
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
                <div key={i} className="gem-nav__item">
                  <Link
                    href={item.href}
                    className={`gem-nav__link${active ? " is-active" : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="gem-header__actions">
            <span className="gem-lang gem-hide-sm">
              <a href="#" className="gem-lang__current">
                KR
              </a>
              <span className="gem-sep">|</span>
              <a href="https://www.gemiso.com/">EN</a>
            </span>
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
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={isNavActive(item, pathname) ? "is-active" : undefined}
                  aria-current={isNavActive(item, pathname) ? "page" : undefined}
                >
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
