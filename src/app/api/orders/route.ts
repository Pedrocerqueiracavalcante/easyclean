import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq } from "drizzle-orm";
import { createAuth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { addresses, orders, orderItems } from "@/lib/db/schema";
import { sendOrderConfirmation } from "@/lib/email";
import { validatePickupSchedule } from "@/lib/order-schedule";
import { buildOrderCheckoutLineItems, calculateOrderTotal, orderServices } from "@/lib/order-pricing";
import { stripe } from "@/lib/stripe";
import { generateId } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = getDb(env.DB);
    const session = await createAuth(env.DB).api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Sessão obrigatória" }, { status: 401 });
    }

    const body = (await req.json()) as {
      items: Record<string, number>;
      pickupDay: number;
      pickupSlot: string;
      notes?: string;
      coupon?: string;
      addressId: string;
      userEmail?: string;
      userName?: string;
    };

    const { items, pickupDay, pickupSlot, notes, coupon, addressId, userEmail, userName } = body;
    const lineItems = buildOrderCheckoutLineItems(items);
    const subtotal = calculateOrderTotal(items);

    if (lineItems.length === 0 || subtotal <= 0) {
      return NextResponse.json({ error: "Seleciona pelo menos um serviço" }, { status: 400 });
    }

    const scheduleValidation = validatePickupSchedule(pickupDay, pickupSlot);
    if (!scheduleValidation.valid) {
      return NextResponse.json({ error: scheduleValidation.message }, { status: 400 });
    }

    const address = await db.query.addresses.findFirst({ where: eq(addresses.id, addressId) });
    if (!address || address.userId !== session.user.id) {
      return NextResponse.json({ error: "Endereço inválido para este usuário" }, { status: 403 });
    }

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === "sk_test_placeholder") {
      return NextResponse.json({ error: "Stripe ainda não está configurado" }, { status: 503 });
    }

    const orderId = generateId();
    const orderNotes = [
      notes,
      pickupSlot ? `Recolha: dia ${pickupDay + 1}, ${pickupSlot}` : "",
      coupon ? `Cupão informado: ${coupon}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    await db.insert(orders).values({
      id: orderId,
      userId: session.user.id,
      addressId: address.id,
      subtotal,
      total: subtotal,
      notes: orderNotes,
      status: "pending",
    });

    const itemRows = Object.entries(items)
      .filter(([serviceId, qty]) => qty > 0 && orderServices.some((service) => service.id === serviceId))
      .map(([serviceId, qty]) => {
        const service = orderServices.find((entry) => entry.id === serviceId)!;
        return {
          id: generateId(),
          orderId,
          serviceId,
          quantity: qty,
          unitPrice: service.price,
          total: service.price * qty,
        };
      });

    if (itemRows.length > 0) {
      await db.insert(orderItems).values(itemRows);
    }

    const confirmationEmail = userEmail || session.user.email;
    const confirmationName = userName || session.user.name || "Cliente Easy Clean";
    if (confirmationEmail) {
      await sendOrderConfirmation(confirmationEmail, confirmationName, orderId, subtotal).catch(() => {});
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? req.nextUrl.origin;
    const checkoutSession = await stripe.checkout.sessions.create({
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

    return NextResponse.json({ id: orderId, total: subtotal, checkoutUrl: checkoutSession.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar pedido" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = getDb(env.DB);
    const session = await createAuth(env.DB).api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json([]);
    }

    const result = await db.query.orders.findMany({
      where: eq(orders.userId, session.user.id),
      orderBy: (order, { desc }) => desc(order.createdAt),
      limit: 50,
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Erro" }, { status: 500 });
  }
}
