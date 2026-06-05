import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { orders, subscriptions } from "@/lib/db/schema";
import { generateId } from "@/lib/utils";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Webhook inválido" }, { status: 400 });
  }

  const { env } = await getCloudflareContext();
  const db = getDb(env.DB);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as {
      metadata?: { type?: string; planId?: string; orderId?: string };
      subscription?: string;
      customer?: string;
      payment_intent?: string;
    };

    if (session.metadata?.type === "order" && session.metadata.orderId) {
      await db
        .update(orders)
        .set({
          stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : undefined,
          paidAt: new Date(),
          status: "confirmed",
        })
        .where(eq(orders.id, session.metadata.orderId));

      return NextResponse.json({ received: true });
    }

    const planId = session.metadata?.planId;

    if (!planId || !session.subscription || !session.customer) {
      return NextResponse.json({ received: true });
    }

    await db.insert(subscriptions).values({
      id: generateId(),
      userId: session.customer,
      planId,
      status: "active",
      stripeSubscriptionId: session.subscription,
    });
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as unknown as { id: string };
    await db
      .update(subscriptions)
      .set({ status: "cancelled" })
      .where(eq(subscriptions.stripeSubscriptionId, sub.id));
  }

  return NextResponse.json({ received: true });
}
