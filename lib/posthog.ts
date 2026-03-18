import posthog from "posthog-js";

/**
 * PostHogクライアントの初期化ヘルパー
 * ブラウザ環境かつ環境変数が設定されている場合のみ初期化する
 */
export function initPostHog() {
  if (
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_POSTHOG_KEY &&
    process.env.NEXT_PUBLIC_POSTHOG_HOST
  ) {
    const host =
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: host,
      capture_pageview: false, // PostHogProviderで手動キャプチャするため
      defaults: "2026-01-30",
    });
  }
  return posthog;
}
