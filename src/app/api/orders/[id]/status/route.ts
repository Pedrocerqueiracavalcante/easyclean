import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { orders, orderStatusHistory, notifications } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { generateId } from "@/lib/utils";

const STATUS_NOTIFICATIONS: Record<string, { title: string; body: string }> = {
  picked_up: { title: "Roupa recolhida! 🚗", body: "A tua roupa foi recolhida e está a caminho da nossa base." },
  washing: { title: "Em lavagem 🌀", body: "A tua roupa está a ser lavada com cuidado." },
  ready: { title: "Pronta para entrega! ✨", body: "A tua roupa está pronta. Iremos entregá-la em breve." },
  delivered: { title: "Entregue! 🏠", body: "A tua roupa foi entregue. Obrigado por escolheres a Easy Clean!" },
};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { env } = await getCloudflareContext();
    const db = getDb(env.DB);
    const body = await req.json() as { status: string; note?: string; staffId?: string };
    const { status, note } = body;
    type OrderStatus = "pending" | "confirmed" | "pickup_scheduled" | "picked_up" | "washing" | "ready" | "delivery_scheduled" | "delivered" | "cancelled";
    const typedStatus = status as OrderStatus;

    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    if (!order) return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });

    await db.update(orders).set({ status: typedStatus, updatedAt: new Date() }).where(eq(orders.id, id));

    await db.insert(orderStatusHistory).values({
      id: generateId(),
      orderId: id,
      status,
      note: note || null,
    });

    const notifTemplate = STATUS_NOTIFICATIONS[status];
    if (notifTemplate && order.userId) {
      await db.insert(notifications).values({
        id: generateId(),
        userId: order.userId,
        type: status as never,
        title: notifTemplate.title,
        body: notifTemplate.body,
        orderId: id,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar estado" }, { status: 500 });
  }
}
