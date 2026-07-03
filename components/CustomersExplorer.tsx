"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CUSTOMER_CATEGORIES,
  CUSTOMERS,
  customerLogo,
  type Customer,
} from "@/components/customers-data";
import { asset } from "@/components/site-config";

/**
 * 고객사 셀 — 회사명은 항상 표시하고, 로고 파일이 있으면 그 위에 얹는다.
 *  - 로고 있음: 로고(위) + 회사명(아래) 세로 배치
 *  - 로고 없음/깨짐: onLoad가 안 일어나 로고는 숨고 회사명만 가운데 표시
 */
function CustomerCell({ customer }: { customer: Customer }) {
  const [logoLoaded, setLogoLoaded] = useState(false);

  return (
    <div className={`cust-cell${logoLoaded ? " has-logo" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {/* loading="lazy"는 쓰지 않는다: 로고는 .cust-cell__logo가 onLoad 전까지
          display:none이라 레이아웃 박스가 없는데, lazy 이미지는 박스가 없으면
          영영 로드되지 않아 onLoad가 안 일어나고(→ is-loaded 미부여) 계속 숨는다.
          eager 이미지는 display:none이어도 로드되므로 onLoad가 정상 발생한다.
          또한 ref로 마운트 시점에 이미 로드된 경우(캐시 히트로 hydration 전에
          onLoad가 지나가 버린 경우)도 잡아 준다. */}
      <img
        ref={(img) => {
          if (img?.complete && img.naturalWidth > 0) setLogoLoaded(true);
        }}
        className={`cust-cell__logo${logoLoaded ? " is-loaded" : ""}`}
        src={asset(customerLogo(customer.slug))}
        alt={customer.name}
        onLoad={() => setLogoLoaded(true)}
      />
      <span className="cust-cell__name">{customer.name}</span>
    </div>
  );
}

/**
 * 고객사 분야 필터 — sticky 탭 + 고객사 그리드.
 * 선택된 분야 상태를 다루므로 클라이언트 컴포넌트.
 */
export default function CustomersExplorer() {
  const [filter, setFilter] = useState("all");
  const tabsRef = useRef<HTMLDivElement>(null);

  // 모바일에서 탭이 좌우로 잘리면 선택한 분야가 안 보일 수 있어,
  // 활성 탭을 스크롤 컨테이너 가운데로 옮겨 항상 고를 수 있게 한다.
  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const btn = container.querySelector<HTMLElement>(".cust-tab.is-active");
    if (!btn) return;
    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    const delta = bRect.left - cRect.left - (cRect.width - bRect.width) / 2;
    container.scrollTo({ left: container.scrollLeft + delta, behavior: "smooth" });
  }, [filter]);

  const tabs = useMemo(
    () =>
      CUSTOMER_CATEGORIES.map((c) => ({
        ...c,
        count:
          c.id === "all"
            ? CUSTOMERS.length
            : CUSTOMERS.filter((x) => x.cat === c.id).length,
      })),
    [],
  );

  const visible: Customer[] =
    filter === "all"
      ? CUSTOMERS
      : CUSTOMERS.filter((x) => x.cat === filter);
  const activeLabel =
    CUSTOMER_CATEGORIES.find((c) => c.id === filter)?.label ?? "전체";

  return (
    <>
      {/* sticky 분야 탭 */}
      <div className="cust-tabbar">
        <div
          className="cust-tabs"
          role="tablist"
          aria-label="고객사 분야"
          ref={tabsRef}
        >
          {tabs.map((tb) => {
            const on = tb.id === filter;
            return (
              <button
                key={tb.id}
                type="button"
                role="tab"
                aria-selected={on}
                className={`cust-tab${on ? " is-active" : ""}`}
                onClick={() => setFilter(tb.id)}
              >
                <span className="cust-tab__label">{tb.label}</span>
                <span className="cust-tab__count">{tb.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 고객사 그리드 */}
      <section className="cust-grid-section">
        <div className="gem-container">
          <div className="cust-grid">
            {visible.map((cust) => (
              <CustomerCell key={`${cust.cat}-${cust.slug}`} customer={cust} />
            ))}
          </div>
          <div className="cust-grid__foot">
            <span className="cust-grid__mark">↳</span>
            <span>
              {activeLabel} · 총 {visible.length}곳 표시
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
