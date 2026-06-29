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
 * 고객사 셀 — 로고 파일이 있으면 로고를, 없거나 깨지면 회사명 텍스트를 보여준다.
 * onError 폴백을 위해 셀 단위 상태를 둔다.
 */
function CustomerCell({ customer }: { customer: Customer }) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <div className="cust-cell">
      {logoFailed ? (
        <span className="cust-cell__name">{customer.name}</span>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          className="cust-cell__logo"
          src={asset(customerLogo(customer.slug))}
          alt={customer.name}
          loading="lazy"
          onError={() => setLogoFailed(true)}
        />
      )}
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
