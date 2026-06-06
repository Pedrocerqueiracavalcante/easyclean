import { desc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { addresses, orderItems, orders, orderStatusHistory, users } from "@/lib/db/schema";
import { ORDER_STATUS_LABELS, formatCurrency, formatDateTime } from "@/lib/utils";
import { orderServices } from "@/lib/order-pricing";

export const badgeVariant: Record<string, "green" | "blue" | "yellow" | "gray" | "purple" | "red"> = {
  pending: "yellow",
  confirmed: "blue",
  pickup_scheduled: "purple",
  picked_up: "blue",
  washing: "blue",
  ready: "green",
  delivery_scheduled: "purple",
  delivered: "green",
  cancelled: "gray",
};

export function serviceName(serviceId: string) {
  return orderServices.find((service) => service.id === serviceId)?.name ?? serviceId;
}

export function shortId(id: string) {
  return id.slice(0, 8).toUpperCase();
}

export function statusLabel(status: string) {
  return ORDER_STATUS_LABELS[status] ?? status;
}

export async function getOrdersOverview(db: ReturnType<typeof getDb>, limit = 50, userId?: string) {
  const rows = userId
    ? await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt)).limit(limit)
    : await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(limit);

  return Promise.all(
    rows.map(async (order) => {
      const [items, user, address] = await Promise.all([
        db.select().from(orderItems).where(eq(orderItems.orderId, order.id)),
        db.query.users.findFirst({ where: eq(users.id, order.userId) }),
        db.query.addresses.findFirst({ where: eq(addresses.id, order.addressId) }),
      ]);

      const firstItems = items.slice(0, 2).map((item) => `${item.quantity}x ${serviceName(item.serviceId)}`);
      const moreItems = items.length > 2 ? ` +${items.length - 2}` : "";
      const itemsText = firstItems.length ? `${firstItems.join(" · ")}${moreItems}` : "Sem itens";

      return {
        ...order,
        clientName: user?.name ?? "Cliente",
        clientEmail: user?.email ?? "",
        clientPhone: user?.phone ?? "",
        addressText: address ? `${address.street} ${address.number}, ${address.city}` : "Morada não definida",
        itemsCount: items.length,
        itemsText,
        totalText: formatCurrency(order.total),
        createdText: formatDateTime(order.createdAt),
        statusText: statusLabel(order.status),
        badge: badgeVariant[order.status] ?? "gray",
      };
    })
  );
}

export async function getOrderDetail(db: ReturnType<typeof getDb>, id: string) {
  const order = await db.query.orders.findFirst({ where: eq(orders.id, id) });

  if (!order) {
    return null;
  }

  const [itemRows, address, user] = await Promise.all([
    db.select().from(orderItems).where(eq(orderItems.orderId, id)),
    db.query.addresses.findFirst({ where: eq(addresses.id, order.addressId) }),
    db.query.users.findFirst({ where: eq(users.id, order.userId) }),
  ]);
  const history = await db
    .select()
    .from(orderStatusHistory)
    .where(eq(orderStatusHistory.orderId, id))
    .orderBy(desc(orderStatusHistory.createdAt));

  return {
    order,
    user,
    address,
    items: itemRows.map((item) => ({
      ...item,
      name: serviceName(item.serviceId),
      totalText: formatCurrency(item.total),
    })),
    addressText: address ? `${address.street} ${address.number}, ${address.city}` : "Morada não definida",
    totalText: formatCurrency(order.total),
    createdText: formatDateTime(order.createdAt),
    statusText: statusLabel(order.status),
    badge: badgeVariant[order.status] ?? "gray",
    history: history.map((entry) => ({
      ...entry,
      statusText: statusLabel(entry.status),
      createdText: formatDateTime(entry.createdAt),
    })),
  };
}
