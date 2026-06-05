import Link from "next/link";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { count } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDb } from "@/lib/db";
import { orders, users } from "@/lib/db/schema";
import { getOrdersOverview } from "@/lib/order-data";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const { env } = await getCloudflareContext({ async: true });
  const db = getDb(env.DB);
  const recentOrders = await getOrdersOverview(db, 5);
  const [orderCount, clientCount] = await Promise.all([
    db.select({ value: count() }).from(orders),
    db.select({ value: count() }).from(users),
  ]);

  const activeOrders = recentOrders.filter((order) => !["delivered", "cancelled"].includes(order.status));
  const monthlyRevenue = recentOrders.reduce((acc, order) => acc + order.total, 0);
  const pickupOrders = recentOrders.filter((order) => ["pending", "confirmed"].includes(order.status));

  const stats = [
    { label: "Pedidos", value: String(orderCount[0]?.value ?? 0), delta: "Total registado", color: "text-[#2D6A2D]" },
    { label: "Em andamento", value: String(activeOrders.length), delta: "Pedidos activos", color: "text-blue-600" },
    { label: "Receita visível", value: formatCurrency(monthlyRevenue), delta: "Últimos pedidos", color: "text-[#2D6A2D]" },
    { label: "Clientes", value: String(clientCount[0]?.value ?? 0), delta: "Contas criadas", color: "text-purple-600" },
  ];

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Pedidos e clientes reais da base Easy Clean.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-5">
              <p className="text-xs font-medium text-gray-500">{stat.label}</p>
              <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="mt-1 text-xs text-gray-400">{stat.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pedidos recentes</CardTitle>
              <Link href="/admin/orders" className="text-xs font-medium text-[#2D6A2D]">Ver todos →</Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {recentOrders.length === 0 ? (
              <div className="px-5 py-6 text-sm text-gray-500">Nenhum pedido registado.</div>
            ) : (
              <div className="divide-y divide-[#e2e8df]">
                {recentOrders.map((order) => (
                  <Link key={order.id} href={`/admin/orders/${order.id}`}>
                    <div className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-[#f8faf7]">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-medium text-gray-900">{order.clientName}</p>
                          <Badge variant={order.badge}>{order.statusText}</Badge>
                        </div>
                        <p className="text-xs text-gray-400">{order.itemsText}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-gray-900">{order.totalText}</p>
                        <p className="text-xs text-gray-400">{order.createdText}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recolhas pendentes</CardTitle>
              <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                {pickupOrders.length}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {pickupOrders.length === 0 ? (
              <div className="px-5 py-6 text-sm text-gray-500">Sem recolhas pendentes.</div>
            ) : (
              <div className="divide-y divide-[#e2e8df]">
                {pickupOrders.map((order) => (
                  <div key={order.id} className="px-5 py-4">
                    <p className="text-sm font-semibold text-gray-900">{order.clientName}</p>
                    <p className="mt-0.5 text-xs text-gray-500">📍 {order.addressText}</p>
                    <p className="text-xs text-gray-500">Pedido #{order.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
