import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { orders, orderItems } from "@/lib/db/schema";
import { generateId } from "@/lib/utils";
import { sendOrderConfirmation } from "@/lib/email";

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

    const services = [
      { id: "wash", price: 4 },
      { id: "iron", price: 2 },
      { id: "dry", price: 8 },
      { id: "bed", price: 6 },
      { id: "shoes", price: 5 },
      { id: "bag", price: 29 },
    ];

    const subtotal = Object.entries(items as Record<string, number>).reduce((acc, [id, qty]) => {
      const svc = services.find((s) => s.id === id);
      return acc + (svc ? svc.price * qty : 0);
    }, 0);

    const orderId = generateId();

    await db.insert(orders).values({
      id: orderId,
      userId,
      addressId,
      subtotal,
      total: subtotal,
      notes,
      status: "pending",
    });

    const itemRows = Object.entries(items as Record<string, number>)
      .filter(([, qty]) => qty > 0)
      .map(([serviceId, qty]) => {
        const svc = services.find((s) => s.id === serviceId)!;
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

    return NextResponse.json({ id: orderId, total: subtotal });
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
