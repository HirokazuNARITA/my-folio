import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { PostHogProvider } from "./posthog-provider";

const { initPostHog, capture } = vi.hoisted(() => ({
  initPostHog: vi.fn(),
  capture: vi.fn(),
}));

vi.mock("@/lib/posthog", () => ({
  initPostHog: (...args: unknown[]) => initPostHog(...args),
}));

vi.mock("posthog-js", () => ({
  default: {
    capture,
  },
}));

vi.mock("posthog-js/react", () => ({
  PostHogProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="posthog-react-provider">{children}</div>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/sample-path",
}));

describe("PostHogProvider", () => {
  const envKey = "NEXT_PUBLIC_POSTHOG_KEY";
  const envHost = "NEXT_PUBLIC_POSTHOG_HOST";

  beforeEach(() => {
    initPostHog.mockClear();
    capture.mockClear();
    process.env[envKey] = "phc_test_key";
    process.env[envHost] = "https://us.i.posthog.com";
  });

  afterEach(() => {
    delete process.env[envKey];
    delete process.env[envHost];
  });

  it("queueMicrotask 後も initPostHog が呼ばれ、$pageview が送信される", async () => {
    render(
      <PostHogProvider>
        <span>child</span>
      </PostHogProvider>,
    );

    expect(screen.getByText("child")).toBeInTheDocument();

    await waitFor(() => {
      expect(initPostHog).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(capture).toHaveBeenCalledWith(
        "$pageview",
        expect.objectContaining({
          $current_url: expect.any(String),
        }),
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("posthog-react-provider")).toBeInTheDocument();
    });
  });

  it("PostHog 用 env が無いときは初期化も pageview も行わない", async () => {
    delete process.env[envKey];
    delete process.env[envHost];

    render(
      <PostHogProvider>
        <span>child</span>
      </PostHogProvider>,
    );

    expect(initPostHog).not.toHaveBeenCalled();
    expect(capture).not.toHaveBeenCalled();
    expect(screen.queryByTestId("posthog-react-provider")).not.toBeInTheDocument();
  });
});
