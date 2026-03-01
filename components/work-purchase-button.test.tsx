import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { WorkPurchaseButton } from "./work-purchase-button";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("@/actions/stripe", () => ({
  createCheckoutSession: vi.fn(),
}));

describe("WorkPurchaseButton", () => {
  it("有料作品（price > 0）の場合「購入する」ボタンを表示する", () => {
    render(<WorkPurchaseButton workId="work-1" price={1000} />);

    const button = screen.getByRole("button", { name: "購入する" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });

  it("無料作品（price === 0）の場合「無料で見る」リンクを表示する", () => {
    render(<WorkPurchaseButton workId="work-1" price={0} />);

    const link = screen.getByRole("link", { name: "無料で見る" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#");
  });
});
