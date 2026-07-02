"use client";

import { useState } from "react";
import { CUSTOMERS, customerLogo } from "@/components/customers-data";
import { asset } from "@/components/site-config";

/** 고객사 이름 → slug 조회(로고 파일 경로 확보용). */
const SLUG_BY_NAME: Record<string, string> = Object.fromEntries(
  CUSTOMERS.map((c) => [c.name, c.slug]),
);

/**
 * 솔루션 "도입 고객" 마키 셀 — 홈/고객사 셀과 동일하게 회사명은 항상 표시하고,
 * customers-data에 등록돼 로고 파일이 있는 고객사면 그 위에 로고를 얹는다.
 *  - 매칭 + 로고 있음: 로고(위) + 회사명(아래)
 *  - 매칭 없음/로고 깨짐: onLoad가 안 일어나 로고는 숨고 회사명만 표시
 */
function Cell({ name, hidden = false }: { name: string; hidden?: boolean }) {
  const slug = SLUG_BY_NAME[name];
  const [logoLoaded, setLogoLoaded] = useState(false);

  return (
    <div
      className={`gem-logo-cell${logoLoaded ? " has-logo" : ""}`}
      aria-hidden={hidden || undefined}
    >
      {slug && (
        // loading="lazy" 미사용: 로고가 onLoad 전까지 display:none이라 lazy면 영영 로드 안 됨.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={(img) => {
            if (img?.complete && img.naturalWidth > 0) setLogoLoaded(true);
          }}
          className={`gem-logo-cell__logo${logoLoaded ? " is-loaded" : ""}`}
          src={asset(customerLogo(slug))}
          alt={name}
          onLoad={() => setLogoLoaded(true)}
        />
      )}
      <span className="gem-logo-cell__name">{name}</span>
    </div>
  );
}

/**
 * 도입 고객 무한 스크롤 마키 — 끊김 없는 루프를 위해 목록을 네 번 렌더한다.
 * (첫 벌만 실제 표시, 나머지는 보조 표시용)
 */
export default function SolutionClientsMarquee({
  clients,
}: {
  clients: string[];
}) {
  return (
    <div className="gem-marquee__track sol-clients__track">
      {[0, 1, 2, 3].flatMap((rep) =>
        clients.map((c, i) => (
          <Cell key={`${rep}-${i}`} name={c} hidden={rep > 0} />
        )),
      )}
    </div>
  );
}
