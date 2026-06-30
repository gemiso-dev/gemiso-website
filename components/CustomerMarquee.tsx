"use client";

import { useState } from "react";
import { CUSTOMERS, customerLogo, type Customer } from "@/components/customers-data";
import { asset } from "@/components/site-config";

/**
 * 홈 고객사 마키 셀 — 고객사 페이지(CustomerCell)와 동일하게
 * 회사명은 항상 표시하고, 로고 파일이 있으면 그 위에 얹는다.
 *  - 로고 있음: 로고(위) + 회사명(아래)
 *  - 로고 없음/깨짐: onLoad가 안 일어나 로고는 숨고 회사명만 표시
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
    <div
      className={`gem-logo-cell${logoLoaded ? " has-logo" : ""}`}
      aria-hidden={hidden || undefined}
    >
      {/* loading="lazy"는 쓰지 않는다: 로고가 onLoad 전까지 display:none이라
          박스가 없어 lazy 이미지가 영영 로드되지 않는다. ref로 캐시 히트도 보강. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={(img) => {
          if (img?.complete && img.naturalWidth > 0) setLogoLoaded(true);
        }}
        className={`gem-logo-cell__logo${logoLoaded ? " is-loaded" : ""}`}
        src={asset(customerLogo(customer.slug))}
        alt={customer.name}
        onLoad={() => setLogoLoaded(true)}
      />
      <span className="gem-logo-cell__name">{customer.name}</span>
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
