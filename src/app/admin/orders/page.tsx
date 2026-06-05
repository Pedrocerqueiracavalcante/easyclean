import Link from "next/link";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getDb } from "@/lib/db";
import { getOrdersOverview } from "@/lib/order-data";

const filters = ["Todos", "Pendentes", "Confirmados", "Em lavagem", "Entregues"];

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const { env } = await getCloudflareContext({ async: true });
  const orders = await getOrdersOverview(getDb(env.DB), 100);

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold text-gray-900">Pedidos</h1>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filter === "Todos" ? "bg-[#2D6A2D] text-white" : "border border-[#e2e8df] bg-white text-gray-600 hover:border-[#2D6A2D]"}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e2e8df]">
                {["Pedido", "Cliente", "Estado", "Serviços", "Total", "Criado", "Morada", ""].map((header) => (
                  <th key={header} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8df]">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-sm text-gray-500">
                    Nenhum pedido registado.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="transition-colors hover:bg-[#f8faf7]">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">#{order.id.slice(0, 8).toUpperCase()}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{order.clientName}</p>
                      <p className="text-xs text-gray-400">{order.clientEmail || order.clientPhone || "Sem contacto"}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={order.badge}>{order.statusText}</Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">{order.itemsText}</td>
                    <td className="px-4 py-3 font-bold text-gray-900">{order.totalText}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500">{order.createdText}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500">{order.addressText}</td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/orders/${order.id}`} className="text-xs font-medium text-[#2D6A2D] hover:underline">
                        Ver →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
