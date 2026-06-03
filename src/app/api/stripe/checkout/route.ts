import { NextRequest, NextResponse } from "next/server";
import { stripe, PLANS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { planId, interval } = await req.json() as { planId: string; interval: string };
    const plan = PLANS[planId as keyof typeof PLANS];

    if (!plan) {
      return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: plan.priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/subscription?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/subscription`,
      metadata: { planId, interval },
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Erro ao criar sessão" }, { status: 500 });
  }
}
