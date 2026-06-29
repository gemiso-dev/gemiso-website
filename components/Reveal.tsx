"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** 렌더링할 태그 (기본 div) */
  as?: ElementType;
  className?: string;
  /** 추가 인라인 스타일 */
  style?: React.CSSProperties;
} & Omit<React.HTMLAttributes<HTMLElement>, "style" | "className">;

/**
 * 뷰포트에 들어올 때 페이드업하는 래퍼.
 * IntersectionObserver가 없거나 prefers-reduced-motion이면 즉시 노출한다.
 */
export default function Reveal({ as, className = "", style, children, ...rest }: RevealProps) {
  const Tag = (as || "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -7% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`gem-reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
