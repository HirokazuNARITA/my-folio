"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/actions/stripe";

interface WorkPurchaseButtonProps {
  workId: string;
  price: number;
}

export function WorkPurchaseButton({ workId, price }: WorkPurchaseButtonProps) {
  if (price > 0) {
    return (
      <form action={createCheckoutSession.bind(null, workId)}>
        <Button type="submit">購入する</Button>
      </form>
    );
  }

  return (
    <Button asChild>
      <Link href="#">無料で見る</Link>
    </Button>
  );
}
