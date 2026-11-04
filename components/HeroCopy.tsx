"use client";

import { Fragment, useEffect, useState } from "react";
import { HERO_COPIES } from "./home-hero-data";

/** 줄 배열을 <br />로 이어 붙인다. */
function Lines({ lines }: { lines: string[] }) {
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

/**
 * 홈 히어로 제목·설명. 진입(새로고침)할 때마다 HERO_COPIES 중 하나를 무작위로 고른다.
 * 정적 export라 서버 렌더 시점엔 첫 문구를 넣어 두고, 마운트 후 무작위 문구로 바꾼다.
 * 바뀌기 전 문구가 비치지 않도록 선택 전엔 숨겨 둔다(.gem-hero__copy).
 */
export default function HeroCopy() {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * HERO_COPIES.length));
  }, []);

  const copy = HERO_COPIES[index ?? 0];

  return (
    <div className={`gem-hero__copy${index === null ? "" : " is-ready"}`}>
      <h1 className="gem-hero__title">
        <Lines lines={copy.title} />
      </h1>
      {copy.desc && (
        <p className="gem-hero__desc">
          <Lines lines={copy.desc} />
        </p>
      )}
    </div>
  );
}
