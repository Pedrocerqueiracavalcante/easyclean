import Link from "next/link";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { count, desc } from "drizzle-orm";
import {
  Bell,
  ChevronRight,
  Globe2,
  Headphones,
  Languages,
  LogOut,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDb } from "@/lib/db";
import { orders, users } from "@/lib/db/schema";

const menuItems = [
  { href: "/app/profile/addresses", icon: MapPin, label: "As minhas moradas", desc: "Casas, apartamentos e pontos de recolha" },
  { href: "/app/subscription", icon: Star, label: "Plano de assinatura", desc: "Mensalidades e benefícios" },
  { href: "/app/profile/notifications", icon: Bell, label: "Notificações", desc: "Avisos de recolha e entrega" },
  { href: "/app/profile/language", icon: Languages, label: "Idioma", desc: "Português e outras opções" },
  { href: "/app/profile/support", icon: Headphones, label: "Suporte", desc: "Fala com a Easy Clean" },
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
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#1f5d28] via-[#2D6A2D] to-[#6ABF3C] text-white shadow-xl shadow-[#2d6a2d]/20">
        <div className="p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl font-black text-[#2D6A2D] shadow-sm">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xl font-black">{displayName}</p>
              <p className="truncate text-sm text-white/75">{displayEmail}</p>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                <ShieldCheck className="h-3.5 w-3.5" />
                Conta Easy Clean
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-3">
        {[
          { value: String(orderCount[0]?.value ?? 0), label: "Pedidos", icon: PackageCheck },
          { value: "0 kg", label: "Lavados", icon: Sparkles },
          { value: "Livre", label: "Plano", icon: Star },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-[#e2e8df] bg-white p-4 text-center shadow-sm">
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef8e8] text-[#2D6A2D]">
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-lg font-black text-[#2D6A2D]">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-3 px-5 py-4 transition-colors hover:bg-[#f8faf7] ${index < menuItems.length - 1 ? "border-b border-[#e2e8df]" : ""}`}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef8e8] text-[#2D6A2D]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-gray-900">{item.label}</p>
                    <p className="truncate text-xs text-gray-400">{item.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300" />
                </div>
              </Link>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/app/profile/language">
          <Button variant="outline" className="w-full">
            <Globe2 className="h-4 w-4" />
            Alterar idioma
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="outline" className="w-full border-red-200 text-red-500 hover:bg-red-50">
            <LogOut className="h-4 w-4" />
            Terminar sessão
          </Button>
        </Link>
      </div>

      <p className="text-center text-xs text-gray-400">Easy Clean v1.0 · Luxembourg</p>
    </div>
  );
}
