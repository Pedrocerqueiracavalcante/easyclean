import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const menuItems = [
  { href: "/app/profile/addresses", icon: "📍", label: "Os meus Endereços" },
  { href: "/app/profile/payment", icon: "💳", label: "Métodos de Pagamento" },
  { href: "/app/subscription", icon: "⭐", label: "Plano de Assinatura" },
  { href: "/app/profile/notifications", icon: "🔔", label: "Notificações" },
  { href: "/app/profile/language", icon: "🌐", label: "Idioma" },
  { href: "/app/profile/support", icon: "💬", label: "Suporte" },
];

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* Avatar + Name */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#e8f5e0] flex items-center justify-center text-2xl font-bold text-[#2D6A2D]">
          M
        </div>
        <div>
          <p className="font-bold text-gray-900 text-lg">Maria Santos</p>
          <p className="text-sm text-gray-500">maria@email.com</p>
          <Link href="/app/profile/edit" className="text-xs text-[#2D6A2D] font-medium hover:underline mt-0.5 block">
            Editar perfil
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: "12", label: "Pedidos" },
          { value: "48 kg", label: "Lavados" },
          { value: "Pro", label: "Plano" },
        ].map((s) => (
          <div key={s.label} className="bg-[#f8faf7] rounded-2xl p-4 text-center border border-[#e2e8df]">
            <p className="font-bold text-[#2D6A2D] text-lg">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Menu */}
      <Card>
        <CardContent className="p-0">
          {menuItems.map((item, i) => (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center gap-3 px-5 py-4 hover:bg-[#f8faf7] transition-colors ${i < menuItems.length - 1 ? "border-b border-[#e2e8df]" : ""}`}>
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium text-gray-800 flex-1">{item.label}</span>
                <span className="text-gray-300">›</span>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Logout */}
      <Button variant="outline" className="w-full border-red-200 text-red-500 hover:bg-red-50">
        Terminar Sessão
      </Button>

      <p className="text-center text-xs text-gray-400">Easy Clean v1.0 · Luxembourg</p>
    </div>
  );
}
