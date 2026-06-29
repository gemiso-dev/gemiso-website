"use client";

import { useState } from "react";
import { CUSTOMERS, customerLogo, type Customer } from "@/components/customers-data";
import { asset } from "@/components/site-config";

/**
 * 홈 고객사 마키 셀 — 고객사 페이지(CustomerCell)와 동일하게
 * 회사명을 기본으로 깔고 로고가 로드되면 그 위로 교체한다.
 * 로고 파일이 없으면 회사명이 그대로 유지된다.
 */
function MarqueeCell({
  customer,
  hidden = false,
}: {
  customer: Customer;
  hidden?: boolean;
}) {
  const [logoLoaded, setLogoLoaded] = useState(false);

  return (
    <div className="gem-logo-cell" aria-hidden={hidden || undefined}>
      {!logoLoaded && <span>{customer.name}</span>}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`gem-logo-cell__logo${logoLoaded ? " is-loaded" : ""}`}
        src={asset(customerLogo(customer.slug))}
        alt={customer.name}
        loading="lazy"
        onLoad={() => setLogoLoaded(true)}
      />
    </div>
  );
}

/**
 * 무한 스크롤 마키 — /customers 페이지와 동일한 CUSTOMERS 데이터를 단일 소스로 사용한다.
 * 끊김 없는 루프를 위해 목록을 두 번 렌더한다(두 번째는 보조 표시용).
 */
export default function CustomerMarquee() {
  return (
    <div className="gem-marquee__track">
      {CUSTOMERS.map((c) => (
        <MarqueeCell key={`a-${c.cat}-${c.slug}`} customer={c} />
      ))}
      {CUSTOMERS.map((c) => (
        <MarqueeCell key={`b-${c.cat}-${c.slug}`} customer={c} hidden />
      ))}
    </div>
  );
}
