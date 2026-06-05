import Link from "next/link";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { count, desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDb } from "@/lib/db";
import { orders, users } from "@/lib/db/schema";

const menuItems = [
  { href: "/app/profile/addresses", icon: "📍", label: "Os meus Endereços" },
  { href: "/app/subscription", icon: "⭐", label: "Plano de Assinatura" },
  { href: "/app/profile/notifications", icon: "🔔", label: "Notificações" },
  { href: "/app/profile/language", icon: "🌐", label: "Idioma" },
  { href: "/app/profile/support", icon: "💬", label: "Suporte" },
];

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const { env } = await getCloudflareContext({ async: true });
  const db = getDb(env.DB);
  const [user, orderCount] = await Promise.all([
    db.query.users.findFirst({ orderBy: desc(users.createdAt) }),
    db.select({ value: count() }).from(orders),
  ]);

  const displayName = user?.name ?? "Cliente Easy Clean";
  const displayEmail = user?.email ?? "Adiciona os teus dados no registo";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8f5e0] text-2xl font-bold text-[#2D6A2D]">
          {initial}
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">{displayName}</p>
          <p className="text-sm text-gray-500">{displayEmail}</p>
          <Link href="/app/profile/edit" className="mt-0.5 block text-xs font-medium text-[#2D6A2D] hover:underline">
            Editar perfil
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { value: String(orderCount[0]?.value ?? 0), label: "Pedidos" },
          { value: "0 kg", label: "Lavados" },
          { value: "Livre", label: "Plano" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-[#e2e8df] bg-[#f8faf7] p-4 text-center">
            <p className="text-lg font-bold text-[#2D6A2D]">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          {menuItems.map((item, index) => (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center gap-3 px-5 py-4 transition-colors hover:bg-[#f8faf7] ${index < menuItems.length - 1 ? "border-b border-[#e2e8df]" : ""}`}>
                <span className="text-lg">{item.icon}</span>
                <span className="flex-1 text-sm font-medium text-gray-800">{item.label}</span>
                <span className="text-gray-300">›</span>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full border-red-200 text-red-500 hover:bg-red-50">
        Terminar Sessão
      </Button>

      <p className="text-center text-xs text-gray-400">Easy Clean v1.0 · Luxembourg</p>
    </div>
  );
}
