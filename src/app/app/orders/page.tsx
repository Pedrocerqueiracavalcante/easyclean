import Link from "next/link";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getDb } from "@/lib/db";
import { getOrdersOverview } from "@/lib/order-data";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const { env } = await getCloudflareContext({ async: true });
  const orders = await getOrdersOverview(getDb(env.DB), 30);

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold text-gray-900">Os meus Pedidos</h1>

      {orders.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="font-semibold text-gray-900">Ainda não há pedidos.</p>
          <p className="mt-1 text-sm text-gray-500">Cria o primeiro pedido e acompanha tudo por aqui.</p>
          <Link href="/app/order" className="mt-4 inline-flex">
            <Button>Fazer pedido</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link key={order.id} href={`/app/orders/${order.id}`}>
              <Card className="p-4 transition-colors hover:border-[#6ABF3C] active:scale-[0.99]">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="font-mono text-xs text-gray-400">#{order.id.slice(0, 8).toUpperCase()}</span>
                      <Badge variant={order.badge}>{order.statusText}</Badge>
                    </div>
                    <p className="text-sm text-gray-700">{order.itemsText}</p>
                    <p className="mt-1 text-xs text-gray-400">{order.createdText}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold text-gray-900">{order.totalText}</p>
                    <p className="mt-1 text-xs text-gray-400">Ver →</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
