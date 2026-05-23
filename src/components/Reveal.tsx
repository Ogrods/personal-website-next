"use client";

// Scroll reveal for inner content only — not whole <section> wrappers.
// See .cursor/rules/scroll-reveal-fades.mdc for the project default.

import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { useInView } from "@/lib/useInView";

type RevealProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  delayMs?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function Reveal<T extends ElementType = "div">({
  as,
  children,
  className = "",
  delayMs = 0,
  ...rest
}: RevealProps<T>) {
  const Component = as || "div";
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Component
      ref={ref as never}
      className={`reveal ${inView ? "reveal-in-view" : ""} ${className}`.trim()}
      style={
        delayMs > 0
          ? ({ "--reveal-delay": `${delayMs}ms` } as React.CSSProperties)
          : undefined
      }
      {...rest}
    >
      {children}
    </Component>
  );
}
