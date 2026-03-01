import { describe, it, expect, vi, beforeEach } from "vitest";
import { createCheckoutSession } from "./stripe";

vi.mock("@/lib/stripe", () => ({
  getStripe: vi.fn(),
}));

vi.mock("@/actions/works", () => ({
  getWorkById: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
}));

const { getStripe } = await import("@/lib/stripe");
const { getWorkById } = await import("@/actions/works");

describe("createCheckoutSession", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv, NEXT_PUBLIC_APP_URL: "http://localhost:3000" };
  });

  it("作品が存在しない場合エラーをスローする", async () => {
    vi.mocked(getWorkById).mockResolvedValue(null);

    await expect(createCheckoutSession("nonexistent-id")).rejects.toThrow(
      "作品が見つかりません"
    );
    expect(getStripe).not.toHaveBeenCalled();
  });

  it("作品が非公開の場合エラーをスローする", async () => {
    vi.mocked(getWorkById).mockResolvedValue({
      id: "work-1",
      title: "テスト作品",
      description: "説明",
      category: "ILLUSTRATION",
      imageUrl: "https://example.com/img.png",
      price: 1000,
      published: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(createCheckoutSession("work-1")).rejects.toThrow(
      "作品が見つかりません"
    );
    expect(getStripe).not.toHaveBeenCalled();
  });

  it("NEXT_PUBLIC_APP_URL が未設定の場合エラーをスローする", async () => {
    process.env.NEXT_PUBLIC_APP_URL = undefined;
    vi.mocked(getWorkById).mockResolvedValue({
      id: "work-1",
      title: "テスト作品",
      description: "説明",
      category: "ILLUSTRATION",
      imageUrl: "https://example.com/img.png",
      price: 1000,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(createCheckoutSession("work-1")).rejects.toThrow(
      "NEXT_PUBLIC_APP_URL is not set"
    );
  });

  it("有効な作品で Checkout セッションを作成しリダイレクトする", async () => {
    const mockSession = { url: "https://checkout.stripe.com/session-123" };
    const mockCreate = vi.fn().mockResolvedValue(mockSession);
    vi.mocked(getStripe).mockReturnValue({
      checkout: { sessions: { create: mockCreate } },
    } as never);

    vi.mocked(getWorkById).mockResolvedValue({
      id: "work-1",
      title: "テスト作品",
      description: "説明",
      category: "ILLUSTRATION",
      imageUrl: "https://example.com/img.png",
      price: 1000,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(createCheckoutSession("work-1")).rejects.toThrow(
      "NEXT_REDIRECT:https://checkout.stripe.com/session-123"
    );

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "payment",
        success_url: "http://localhost:3000/works/work-1/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/works/work-1",
        metadata: { workId: "work-1" },
        line_items: [
          expect.objectContaining({
            price_data: expect.objectContaining({
              currency: "jpy",
              unit_amount: 1000,
              product_data: expect.objectContaining({ name: "テスト作品" }),
            }),
            quantity: 1,
          }),
        ],
      })
    );
  });

  it("セッションURLが返らない場合エラーをスローする", async () => {
    vi.mocked(getStripe).mockReturnValue({
      checkout: { sessions: { create: vi.fn().mockResolvedValue({ url: null }) } },
    } as never);

    vi.mocked(getWorkById).mockResolvedValue({
      id: "work-1",
      title: "テスト作品",
      description: "説明",
      category: "ILLUSTRATION",
      imageUrl: "https://example.com/img.png",
      price: 1000,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(createCheckoutSession("work-1")).rejects.toThrow(
      "Checkout セッションの作成に失敗しました"
    );
  });
});
