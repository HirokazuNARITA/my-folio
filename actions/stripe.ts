"use server";

import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";
import { getWorkById } from "@/actions/works";

/** Stripe Checkout セッションを作成し、Stripe の決済ページにリダイレクトする */
export async function createCheckoutSession(workId: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) {
    throw new Error("NEXT_PUBLIC_APP_URL is not set");
  }

  const work = await getWorkById(workId);
  if (!work || !work.published) {
    throw new Error("作品が見つかりません");
  }

  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "jpy",
          product_data: {
            name: work.title,
            description: work.description || undefined,
          },
          unit_amount: work.price, // JPY は最小単位が1円
        },
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/works/${workId}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/works/${workId}`,
    metadata: { workId },
  });

  if (session.url) {
    redirect(session.url);
  }

  throw new Error("Checkout セッションの作成に失敗しました");
}
