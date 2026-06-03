import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { generateId } from "@/lib/utils";

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
    const session = event.data.object as unknown as { metadata: { planId: string }; subscription: string; customer: string };
    const { planId } = session.metadata;

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
    const { eq } = await import("drizzle-orm");
    await db
      .update(subscriptions)
      .set({ status: "cancelled" })
      .where(eq(subscriptions.stripeSubscriptionId, sub.id));
  }

  return NextResponse.json({ received: true });
}
