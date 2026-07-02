"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** 줄 단위 문장 배열 — 줄 사이에는 PC 전용 개행(br-pc)이 들어간다. */
  lines: string[];
  className?: string;
};

/** 스크롤 진행도에 따라 단어가 연한 회색 → 진한 색으로 채워지는 문장. */
const DIM = 0.16; // 미하이라이트 단어의 알파
const SOFT = 7; // 동시에 전환되는 단어 수(클수록 부드러운 그라데이션)

export default function ScrollHighlightText({ lines, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const linesWords = lines.map((l) => l.split(" "));
  const total = linesWords.reduce((n, w) => n + w.length, 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 리렌더 없이 각 단어 색을 직접 갱신 → 매 프레임 부드럽게
    const paint = (progress: number) => {
      const active = progress * (total + SOFT);
      const els = wordRefs.current;
      for (let i = 0; i < els.length; i++) {
        const wEl = els[i];
        if (!wEl) continue;
        const fill = Math.max(0, Math.min(1, (active - i) / SOFT));
        wEl.style.color = `rgba(22, 22, 22, ${(DIM + (1 - DIM) * fill).toFixed(3)})`;
      }
    };

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      paint(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 문장이 화면 하단(85%)에서 상단(25%)으로 지나는 동안 0 → 1
      const start = vh * 0.85;
      const end = vh * 0.25;
      const p = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      paint(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [total]);

  let idx = 0;
  const nodes: React.ReactNode[] = [];
  linesWords.forEach((words, li) => {
    if (li > 0) nodes.push(<br className="br-pc" key={`br-${li}`} />);
    words.forEach((w, wi) => {
      const myIndex = idx++;
      const isLast = li === linesWords.length - 1 && wi === words.length - 1;
      nodes.push(
        <span
          key={`w-${li}-${wi}`}
          ref={(elm) => {
            wordRefs.current[myIndex] = elm;
          }}
        >
          {w}
          {isLast ? "" : " "}
        </span>,
      );
    });
  });

  return (
    <p ref={ref} className={className}>
      {nodes}
    </p>
  );
}
