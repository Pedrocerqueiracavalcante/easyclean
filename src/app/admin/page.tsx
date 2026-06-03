import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const stats = [
  { label: "Pedidos Hoje", value: "8", delta: "+2 vs ontem", color: "text-[#2D6A2D]" },
  { label: "Em Lavagem", value: "3", delta: "Activos agora", color: "text-blue-600" },
  { label: "Receita (Mês)", value: "€2.340", delta: "+18% vs mês anterior", color: "text-[#2D6A2D]" },
  { label: "Clientes Activos", value: "47", delta: "12 com subscrição", color: "text-purple-600" },
];

const recentOrders = [
  { id: "abc123", client: "Maria Santos", status: "washing", items: "8 kg + ferro", total: 38, time: "10:30" },
  { id: "def456", client: "João Silva", status: "pickup_scheduled", items: "Saco completo", total: 29, time: "09:15" },
  { id: "ghi789", client: "Ana Costa", status: "ready", items: "5 kg lavagem", total: 20, time: "08:00" },
  { id: "jkl012", client: "Pedro Nunes", status: "confirmed", items: "Limpeza a seco × 2", total: 16, time: "07:45" },
];

const badgeMap: Record<string, "green" | "blue" | "yellow" | "purple" | "gray"> = {
  confirmed: "yellow",
  pickup_scheduled: "purple",
  picked_up: "blue",
  washing: "blue",
  ready: "green",
  delivered: "green",
};

const statusLabel: Record<string, string> = {
  confirmed: "Confirmado",
  pickup_scheduled: "Recolha Agendada",
  washing: "Em Lavagem",
  ready: "Pronto",
};

const pendingPickups = [
  { client: "Maria Santos", address: "Rue de la Gare 42", slot: "10:00-12:00", driver: "—" },
  { client: "Pedro Nunes", address: "Av. de la Liberté 18", slot: "14:00-16:00", driver: "—" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Segunda-feira, 2 de Junho de 2025</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-5">
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pedidos de Hoje</CardTitle>
              <Link href="/admin/orders" className="text-xs text-[#2D6A2D] font-medium">Ver todos →</Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#e2e8df]">
              {recentOrders.map((order) => (
                <Link key={order.id} href={`/admin/orders/${order.id}`}>
                  <div className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#f8faf7] transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 truncate">{order.client}</p>
                        <Badge variant={badgeMap[order.status] ?? "gray"}>
                          {statusLabel[order.status] ?? order.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400">{order.items}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-gray-900">€{order.total}</p>
                      <p className="text-xs text-gray-400">{order.time}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending pickups */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recolhas Pendentes</CardTitle>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                {pendingPickups.length} hoje
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#e2e8df]">
              {pendingPickups.map((p, i) => (
                <div key={i} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{p.client}</p>
                      <p className="text-xs text-gray-500 mt-0.5">📍 {p.address}</p>
                      <p className="text-xs text-gray-500">🕐 {p.slot}</p>
                    </div>
                    <button className="text-xs bg-[#e8f5e0] text-[#2D6A2D] px-3 py-1.5 rounded-lg font-medium hover:bg-[#d0ebc5] transition-colors cursor-pointer">
                      Atribuir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href: "/admin/orders", icon: "📦", label: "Gerir Pedidos" },
          { href: "/admin/clients", icon: "👥", label: "Ver Clientes" },
          { href: "/admin/staff", icon: "👷", label: "Gestão de Equipa" },
          { href: "/admin/reports", icon: "📈", label: "Relatórios" },
        ].map((link) => (
          <Link key={link.href} href={link.href}>
            <div className="bg-white rounded-2xl border border-[#e2e8df] p-4 text-center hover:border-[#6ABF3C] hover:shadow-sm transition-all cursor-pointer">
              <div className="text-2xl mb-2">{link.icon}</div>
              <p className="text-xs font-semibold text-gray-700">{link.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
