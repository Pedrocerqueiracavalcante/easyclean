import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const quickServices = [
  { icon: "🧺", name: "Lavagem", desc: "Por kg", href: "/app/order?service=wash" },
  { icon: "👔", name: "Passar a Ferro", desc: "Por peça", href: "/app/order?service=iron" },
  { icon: "🥼", name: "Limpeza a Seco", desc: "Por peça", href: "/app/order?service=dry" },
  { icon: "📦", name: "Saco Completo", desc: "Preço fixo", href: "/app/order?service=bag" },
];

const mockOrders = [
  { id: "abc123", status: "washing", date: "Hoje", items: "8 kg lavagem + ferro", total: 28 },
  { id: "def456", status: "delivered", date: "28 Mai", items: "5 kg lavagem", total: 20 },
];

const statusLabel: Record<string, string> = {
  pending: "Pendente",
  confirmed: "Confirmado",
  pickup_scheduled: "Recolha Agendada",
  picked_up: "Recolhido",
  washing: "Em Lavagem",
  ready: "Pronto",
  delivery_scheduled: "Entrega Agendada",
  delivered: "Entregue",
};

const statusColor: Record<string, "green" | "blue" | "yellow" | "gray" | "purple"> = {
  pending: "yellow",
  confirmed: "blue",
  washing: "blue",
  ready: "green",
  delivered: "green",
  pickup_scheduled: "purple",
};

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Olá! 👋</h1>
        <p className="text-sm text-gray-500 mt-0.5">O que precisas hoje?</p>
      </div>

      {/* Address bar */}
      <div className="flex items-center gap-3 bg-white rounded-2xl border border-[#e2e8df] px-4 py-3">
        <span className="text-lg">📍</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400">Endereço de recolha</p>
          <p className="text-sm font-medium text-gray-800 truncate">Rue de la Gare 42, Luxembourg</p>
        </div>
        <Link href="/app/profile/addresses" className="text-xs text-[#2D6A2D] font-medium shrink-0">
          Alterar
        </Link>
      </div>

      {/* Quick order CTA */}
      <div className="bg-gradient-to-r from-[#2D6A2D] to-[#4a8f4a] rounded-2xl p-6 text-white">
        <p className="text-sm font-medium text-green-200 mb-1">Próximo passo</p>
        <h2 className="text-lg font-bold mb-4">Agenda a tua recolha</h2>
        <Link href="/app/order">
          <Button variant="secondary" size="sm">
            🧺 Fazer Pedido
          </Button>
        </Link>
      </div>

      {/* Quick services grid */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Serviços</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickServices.map((s) => (
            <Link key={s.name} href={s.href}>
              <div className="bg-white rounded-2xl border border-[#e2e8df] p-4 hover:border-[#6ABF3C] hover:shadow-sm transition-all active:scale-[0.98]">
                <div className="text-2xl mb-2">{s.icon}</div>
                <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                <p className="text-xs text-gray-400">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Active orders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Pedidos Recentes</h2>
          <Link href="/app/orders" className="text-xs text-[#2D6A2D] font-medium">Ver todos</Link>
        </div>
        <div className="space-y-3">
          {mockOrders.map((order) => (
            <Link key={order.id} href={`/app/orders/${order.id}`}>
              <Card className="p-4 hover:border-[#6ABF3C] transition-colors active:scale-[0.99]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-400">#{order.id.toUpperCase()}</span>
                      <Badge variant={statusColor[order.status] ?? "gray"}>
                        {statusLabel[order.status] ?? order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 truncate">{order.items}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                  </div>
                  <span className="text-sm font-bold text-[#2D6A2D] shrink-0">€{order.total}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Subscription banner */}
      <div className="bg-[#e8f5e0] rounded-2xl p-4 flex items-center gap-4">
        <span className="text-3xl">⭐</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#2D6A2D]">Plano Pro — €69/mês</p>
          <p className="text-xs text-gray-600">20 kg + 4 recolhas + saco incluído</p>
        </div>
        <Link href="/app/subscription">
          <Button variant="outline" size="sm">Ver</Button>
        </Link>
      </div>
    </div>
  );
}
