"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((m) => m.Analytics),
  { ssr: false }
);
const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((m) => m.SpeedInsights),
  { ssr: false }
);

// Mounts Vercel telemetry only after the browser is idle so it doesn't
// compete with LCP paint or main-thread work during initial load.
export default function DeferredAnalytics() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleHandle: number | null = null;
    let timeoutHandle: number | null = null;

    const idleWindow = window as typeof window & {
      requestIdleCallback?: (
        cb: IdleRequestCallback,
        opts?: IdleRequestOptions
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const mount = () => setReady(true);

    if (typeof idleWindow.requestIdleCallback === "function") {
      idleHandle = idleWindow.requestIdleCallback(mount, { timeout: 3000 });
    } else {
      timeoutHandle = window.setTimeout(mount, 2000);
    }

    return () => {
      if (idleHandle !== null && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== null) {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
