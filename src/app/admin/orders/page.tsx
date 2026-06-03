import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const orders = [
  { id: "abc123", client: "Maria Santos", phone: "+352 621 001 001", status: "washing", items: "8 kg + ferro", total: 38, pickup: "2 Jun 10:00", delivery: "4 Jun 14:00", driver: "António M." },
  { id: "def456", client: "João Silva", phone: "+352 621 002 002", status: "pickup_scheduled", items: "Saco completo", total: 29, pickup: "2 Jun 14:00", delivery: "4 Jun 16:00", driver: "—" },
  { id: "ghi789", client: "Ana Costa", phone: "+352 621 003 003", status: "ready", items: "5 kg lavagem", total: 20, pickup: "1 Jun 10:00", delivery: "3 Jun 10:00", driver: "Carlos F." },
  { id: "jkl012", client: "Pedro Nunes", phone: "+352 621 004 004", status: "delivered", items: "Limpeza a seco × 2", total: 16, pickup: "30 Mai 10:00", delivery: "2 Jun 10:00", driver: "António M." },
];

const statusLabel: Record<string, string> = {
  confirmed: "Confirmado", pickup_scheduled: "Recolha Agendada",
  picked_up: "Recolhido", washing: "Em Lavagem",
  ready: "Pronto", delivered: "Entregue",
};

const badgeMap: Record<string, "green" | "blue" | "yellow" | "purple" | "gray"> = {
  confirmed: "yellow", pickup_scheduled: "purple",
  washing: "blue", ready: "green", delivered: "green",
};

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Pedidos</h1>
        <div className="flex gap-2">
          {["Todos", "Hoje", "Recolha", "Em Lavagem", "Prontos"].map((f) => (
            <button key={f} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${f === "Todos" ? "bg-[#2D6A2D] text-white" : "bg-white border border-[#e2e8df] text-gray-600 hover:border-[#2D6A2D]"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e2e8df]">
                {["Pedido", "Cliente", "Estado", "Serviços", "Total", "Recolha", "Entrega", "Motorista", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8df]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#f8faf7] transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">#{order.id.toUpperCase()}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{order.client}</p>
                    <p className="text-xs text-gray-400">{order.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={badgeMap[order.status] ?? "gray"}>
                      {statusLabel[order.status] ?? order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{order.items}</td>
                  <td className="px-4 py-3 font-bold text-gray-900">€{order.total}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{order.pickup}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{order.delivery}</td>
                  <td className="px-4 py-3 text-gray-500">{order.driver}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/orders/${order.id}`} className="text-xs text-[#2D6A2D] font-medium hover:underline">
                      Ver →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
