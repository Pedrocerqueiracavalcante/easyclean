import Link from "next/link";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { desc } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { addresses } from "@/lib/db/schema";
import { getDb } from "@/lib/db";
import { getOrdersOverview } from "@/lib/order-data";

const quickServices = [
  { icon: "🧺", name: "Lavagem", desc: "Por kg", href: "/app/order?service=wash" },
  { icon: "👔", name: "Passar a Ferro", desc: "Por peça", href: "/app/order?service=iron" },
  { icon: "🥼", name: "Limpeza a Seco", desc: "Por peça", href: "/app/order?service=dry" },
  { icon: "📦", name: "Saco Completo", desc: "Preço fixo", href: "/app/order?service=bag" },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { env } = await getCloudflareContext({ async: true });
  const db = getDb(env.DB);
  const [recentOrders, defaultAddress] = await Promise.all([
    getOrdersOverview(db, 2),
    db.query.addresses.findFirst({ orderBy: desc(addresses.createdAt) }),
  ]);

  const addressText = defaultAddress
    ? `${defaultAddress.street} ${defaultAddress.number}, ${defaultAddress.city}`
    : "Adiciona a tua morada";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Olá</h1>
        <p className="mt-0.5 text-sm text-gray-500">O que precisas hoje?</p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-[#e2e8df] bg-white px-4 py-3">
        <span className="text-lg">📍</span>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-400">Endereço de recolha</p>
          <p className="truncate text-sm font-medium text-gray-800">{addressText}</p>
        </div>
        <Link href="/app/profile/addresses" className="shrink-0 text-xs font-medium text-[#2D6A2D]">
          Alterar
        </Link>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-[#2D6A2D] to-[#4a8f4a] p-6 text-white">
        <p className="mb-1 text-sm font-medium text-green-200">Próximo passo</p>
        <h2 className="mb-4 text-lg font-bold">Agenda a tua recolha</h2>
        <Link href="/app/order">
          <Button variant="secondary" size="sm">
            🧺 Fazer Pedido
          </Button>
        </Link>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-gray-900">Serviços</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickServices.map((service) => (
            <Link key={service.name} href={service.href}>
              <div className="rounded-2xl border border-[#e2e8df] bg-white p-4 transition-all hover:border-[#6ABF3C] hover:shadow-sm active:scale-[0.98]">
                <div className="mb-2 text-2xl">{service.icon}</div>
                <p className="text-sm font-semibold text-gray-900">{service.name}</p>
                <p className="text-xs text-gray-400">{service.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Pedidos Recentes</h2>
          <Link href="/app/orders" className="text-xs font-medium text-[#2D6A2D]">Ver todos</Link>
        </div>
        <div className="space-y-3">
          {recentOrders.length === 0 ? (
            <Card className="p-4 text-sm text-gray-500">Nenhum pedido recente.</Card>
          ) : (
            recentOrders.map((order) => (
              <Link key={order.id} href={`/app/orders/${order.id}`}>
                <Card className="p-4 transition-colors hover:border-[#6ABF3C] active:scale-[0.99]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-mono text-xs text-gray-400">#{order.id.slice(0, 8).toUpperCase()}</span>
                        <Badge variant={order.badge}>{order.statusText}</Badge>
                      </div>
                      <p className="truncate text-sm text-gray-700">{order.itemsText}</p>
                      <p className="mt-0.5 text-xs text-gray-400">{order.createdText}</p>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-[#2D6A2D]">{order.totalText}</span>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-2xl bg-[#e8f5e0] p-4">
        <span className="text-3xl">⭐</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#2D6A2D]">Planos mensais</p>
          <p className="text-xs text-gray-600">Poupa em recolhas recorrentes.</p>
        </div>
        <Link href="/app/subscription">
          <Button variant="outline" size="sm">Ver</Button>
        </Link>
      </div>
    </div>
  );
}
