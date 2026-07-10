"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 대상 요소(또는 가장 가까운 <svg>)가 뷰포트에 들어오면 inView=true.
 * 기본은 한 번만 트리거(once). SVG 자식에 붙으면 감싸는 <svg>를 관찰한다.
 */
export function useInView<T extends Element = HTMLElement>({
  threshold = 0.3,
  once = true,
}: { threshold?: number; once?: boolean } = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = el.closest("svg") ?? el;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [threshold, once]);

  return [ref, inView] as const;
}
