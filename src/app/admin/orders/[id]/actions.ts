"use server";

import { revalidatePath } from "next/cache";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { orders, orderStatusHistory } from "@/lib/db/schema";
import { generateId } from "@/lib/utils";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "pickup_scheduled"
  | "picked_up"
  | "washing"
  | "ready"
  | "delivery_scheduled"
  | "delivered"
  | "cancelled";

export async function updateOrderStatus(formData: FormData) {
  const orderId = String(formData.get("orderId") || "");
  const status = String(formData.get("status") || "") as OrderStatus;

  if (!orderId || !status) {
    return;
  }

  const { env } = await getCloudflareContext({ async: true });
  const db = getDb(env.DB);

  await db.update(orders).set({ status, updatedAt: new Date() }).where(eq(orders.id, orderId));
  await db.insert(orderStatusHistory).values({
    id: generateId(),
    orderId,
    status,
    note: "Atualizado pelo painel admin",
  });

  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath(`/app/orders/${orderId}`);
}
