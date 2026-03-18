"use client";

import { PostHogProvider as PHProvider } from "posthog-js/react";
import posthog from "posthog-js";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { initPostHog } from "@/lib/posthog";

/**
 * PostHogの初期化とページビュー自動キャプチャを行うProvider
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_POSTHOG_KEY &&
      process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      initPostHog();
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (pathname && isReady && typeof window !== "undefined") {
      const fullUrl = window.location.href;
      posthog.capture("$pageview", { $current_url: fullUrl });
    }
  }, [pathname, isReady]);

  if (
    typeof window === "undefined" ||
    !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
    !process.env.NEXT_PUBLIC_POSTHOG_HOST ||
    !isReady
  ) {
    return <>{children}</>;
  }

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
