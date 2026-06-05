import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { addresses, orders, orderItems, users } from "@/lib/db/schema";
import { generateId } from "@/lib/utils";
import { sendOrderConfirmation } from "@/lib/email";
import { buildOrderCheckoutLineItems, calculateOrderTotal, orderServices } from "@/lib/order-pricing";
import { stripe } from "@/lib/stripe";

const demoUserId = "demo-user-easyclean";
const demoAddressId = "demo-address-easyclean";

async function ensureDemoCustomer(db: ReturnType<typeof getDb>) {
  await db
    .insert(users)
    .values({
      id: demoUserId,
      name: "Cliente Easy Clean",
      email: "cliente@easyclean.lu",
      emailVerified: true,
      role: "client",
    })
    .onConflictDoNothing();

  await db
    .insert(addresses)
    .values({
      id: demoAddressId,
      userId: demoUserId,
      label: "Casa",
      street: "Rue de la Gare",
      number: "42",
      postalCode: "1611",
      city: "Luxembourg",
      country: "Luxembourg",
      isDefault: true,
    })
    .onConflictDoNothing();
}

export async function POST(req: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = getDb(env.DB);
    const body = await req.json() as {
      items: Record<string, number>;
      pickupDay: number;
      pickupSlot: string;
      notes?: string;
      coupon?: string;
      addressId: string;
      userId: string;
      userEmail?: string;
      userName?: string;
    };

    const { items, pickupDay, pickupSlot, notes, coupon, addressId, userId, userEmail, userName } = body;
    const lineItems = buildOrderCheckoutLineItems(items);
    const subtotal = calculateOrderTotal(items);

    if (lineItems.length === 0 || subtotal <= 0) {
      return NextResponse.json({ error: "Seleciona pelo menos um serviço" }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === "sk_test_placeholder") {
      return NextResponse.json({ error: "Stripe ainda não está configurado" }, { status: 503 });
    }

    const orderId = generateId();
    const effectiveUserId = userId || demoUserId;
    const effectiveAddressId = addressId || demoAddressId;
    const orderNotes = [
      notes,
      pickupSlot ? `Recolha: dia ${pickupDay + 1}, ${pickupSlot}` : "",
      coupon ? `Cupão informado: ${coupon}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    if (!userId || !addressId) {
      await ensureDemoCustomer(db);
    }

    await db.insert(orders).values({
      id: orderId,
      userId: effectiveUserId,
      addressId: effectiveAddressId,
      subtotal,
      total: subtotal,
      notes: orderNotes,
      status: "pending",
    });

    const itemRows = Object.entries(items as Record<string, number>)
      .filter(([serviceId, qty]) => qty > 0 && orderServices.some((s) => s.id === serviceId))
      .map(([serviceId, qty]) => {
        const svc = orderServices.find((s) => s.id === serviceId)!;
        return {
          id: generateId(),
          orderId,
          serviceId,
          quantity: qty,
          unitPrice: svc.price,
          total: svc.price * qty,
        };
      });

    if (itemRows.length > 0) {
      await db.insert(orderItems).values(itemRows);
    }

    if (userEmail && userName) {
      await sendOrderConfirmation(userEmail, userName, orderId, subtotal).catch(() => {});
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? req.nextUrl.origin;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${appUrl}/app/orders/${orderId}?payment=success`,
      cancel_url: `${appUrl}/app/order?payment=cancelled`,
      metadata: {
        type: "order",
        orderId,
      },
      payment_intent_data: {
        metadata: {
          type: "order",
          orderId,
        },
      },
    });

    return NextResponse.json({ id: orderId, total: subtotal, checkoutUrl: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao criar pedido" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = getDb(env.DB);
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    const result = userId
      ? await db.query.orders.findMany({ where: (o, { eq }) => eq(o.userId, userId), orderBy: (o, { desc }) => desc(o.createdAt) })
      : await db.query.orders.findMany({ orderBy: (o, { desc }) => desc(o.createdAt), limit: 50 });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Erro" }, { status: 500 });
  }
}
