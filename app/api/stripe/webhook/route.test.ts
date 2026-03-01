import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/stripe", () => ({
  getStripe: vi.fn(),
}));

const { getStripe } = await import("@/lib/stripe");

describe("POST /api/stripe/webhook", () => {
  const originalEnv = process.env;

  beforeEach(async () => {
    vi.clearAllMocks();
    process.env = { ...originalEnv, STRIPE_WEBHOOK_SECRET: "whsec_test" };
  });

  it("stripe-signature がない場合 400 を返す", async () => {
    const { POST } = await import("./route");
    const request = new Request("http://localhost/api/stripe/webhook", {
      method: "POST",
      body: "{}",
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(getStripe).not.toHaveBeenCalled();
  });

  it("署名検証に失敗した場合 400 を返す", async () => {
    const mockConstructEvent = vi.fn().mockImplementation(() => {
      throw new Error("Invalid signature");
    });
    vi.mocked(getStripe).mockReturnValue({
      webhooks: { constructEvent: mockConstructEvent },
    } as never);

    const { POST } = await import("./route");
    const request = new Request("http://localhost/api/stripe/webhook", {
      method: "POST",
      headers: { "stripe-signature": "invalid" },
      body: "{}",
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toBe("Invalid signature");
  });

  it("checkout.session.completed イベントで 200 を返す", async () => {
    const mockEvent = {
      type: "checkout.session.completed",
      data: { object: { id: "cs_test" } },
    };
    const mockConstructEvent = vi.fn().mockReturnValue(mockEvent);
    vi.mocked(getStripe).mockReturnValue({
      webhooks: { constructEvent: mockConstructEvent },
    } as never);

    const { POST } = await import("./route");
    const body = JSON.stringify(mockEvent);
    const request = new Request("http://localhost/api/stripe/webhook", {
      method: "POST",
      headers: { "stripe-signature": "valid" },
      body,
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.received).toBe(true);
    expect(mockConstructEvent).toHaveBeenCalledWith(
      body,
      "valid",
      "whsec_test"
    );
  });
});
