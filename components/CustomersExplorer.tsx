"use client";

import { useMemo, useState } from "react";
import {
  CUSTOMER_CATEGORIES,
  CUSTOMERS,
  customerLogo,
  type Customer,
} from "@/components/customers-data";
import { asset } from "@/components/site-config";

/**
 * 고객사 셀 — 회사명을 기본으로 항상 깔아 두고, 로고가 실제로 로드되면 그 위로 교체한다.
 * 로고 파일이 없거나 깨지면 onLoad가 발생하지 않아 회사명이 그대로 유지된다(깜빡임 없음).
 */
function CustomerCell({ customer }: { customer: Customer }) {
  const [logoLoaded, setLogoLoaded] = useState(false);

  return (
    <div className="cust-cell">
      {!logoLoaded && <span className="cust-cell__name">{customer.name}</span>}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`cust-cell__logo${logoLoaded ? " is-loaded" : ""}`}
        src={asset(customerLogo(customer.slug))}
        alt={customer.name}
        loading="lazy"
        onLoad={() => setLogoLoaded(true)}
      />
    </div>
  );
}

/**
 * 고객사 분야 필터 — sticky 탭 + 고객사 그리드.
 * 선택된 분야 상태를 다루므로 클라이언트 컴포넌트.
 */
export default function CustomersExplorer() {
  const [filter, setFilter] = useState("all");

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
        <div className="cust-tabs" role="tablist" aria-label="고객사 분야">
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
