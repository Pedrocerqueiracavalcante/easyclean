import Link from "next/link";
import { headers } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { desc, eq } from "drizzle-orm";
import {
  CalendarCheck,
  ChevronRight,
  Droplets,
  MapPin,
  Package,
  PackageCheck,
  Shirt,
  Sparkles,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createAuth } from "@/lib/auth";
import { addresses } from "@/lib/db/schema";
import { getDb } from "@/lib/db";
import { getOrdersOverview } from "@/lib/order-data";

const quickServices = [
  { icon: Droplets, name: "Lavagem", desc: "Roupa do dia a dia por kg.", detail: "Lavagem, secagem e dobra.", href: "/servicos/lavagem" },
  { icon: Shirt, name: "Passagem a ferro", desc: "Camisas, calças e fardas.", detail: "Acabamento com vapor.", href: "/servicos/passagem-a-ferro" },
  { icon: Sparkles, name: "Limpeza a seco", desc: "Peças sensíveis e fatos.", detail: "Cuidado para tecido delicado.", href: "/servicos/limpeza-a-seco" },
  { icon: PackageCheck, name: "Saco completo", desc: "Preço fixo por saco.", detail: "Ideal para rotina semanal.", href: "/servicos/saco-completo" },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { env } = await getCloudflareContext({ async: true });
  const db = getDb(env.DB);
  const session = await createAuth(env.DB).api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  const [recentOrders, defaultAddress] = await Promise.all([
    userId ? getOrdersOverview(db, 2, userId) : Promise.resolve([]),
    userId
      ? db.query.addresses.findFirst({ where: eq(addresses.userId, userId), orderBy: desc(addresses.createdAt) })
      : Promise.resolve(null),
  ]);

  const addressText = defaultAddress
    ? `${defaultAddress.street} ${defaultAddress.number}, ${defaultAddress.city}`
    : "Adiciona a tua morada";

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-br from-[#1f5d28] via-[#2D6A2D] to-[#6ABF3C] p-6 text-white shadow-xl shadow-[#2d6a2d]/20">
        <p className="text-sm font-semibold text-white/75">Olá</p>
        <h1 className="mt-1 text-2xl font-black leading-tight">Pronto para agendar a tua recolha?</h1>
        <p className="mt-2 text-sm leading-6 text-white/80">
          Escolhe o serviço, confirma a morada e acompanha tudo pelo app.
        </p>
        <Link href="/app/order" className="mt-5 inline-flex">
          <Button variant="secondary" size="sm" className="bg-white text-[#245f2f] hover:bg-[#eef8e8]">
            <CalendarCheck className="h-4 w-4" />
            Fazer pedido
          </Button>
        </Link>
      </section>

      <Link
        href="/app/profile/addresses"
        className="flex items-center gap-3 rounded-2xl border border-[#e2e8df] bg-white px-4 py-3 shadow-sm transition-colors hover:border-[#6ABF3C]"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef8e8] text-[#2D6A2D]">
          <MapPin className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-gray-400">Endereço de recolha</p>
          <p className="truncate text-sm font-semibold text-gray-800">{addressText}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-gray-300" />
      </Link>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900">Serviços rápidos</h2>
          <Link href="/app/order" className="text-xs font-semibold text-[#2D6A2D]">Fazer pedido</Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {quickServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.name} href={service.href} target="_blank" rel="noreferrer">
                <div className="min-h-44 rounded-2xl border border-[#e2e8df] bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#6ABF3C] hover:shadow-md active:scale-[0.98]">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef8e8] text-[#2D6A2D]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-bold text-gray-900">{service.name}</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">{service.desc}</p>
                  <p className="mt-2 rounded-xl bg-[#f7fbf4] px-3 py-2 text-[11px] font-semibold leading-4 text-[#2D6A2D]">
                    {service.detail}
                  </p>
                  <p className="mt-3 text-[11px] font-black uppercase tracking-wider text-gray-400">Abrir guia</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900">Pedidos recentes</h2>
          <Link href="/app/orders" className="text-xs font-semibold text-[#2D6A2D]">Ver todos</Link>
        </div>
        <div className="space-y-3">
          {recentOrders.length === 0 ? (
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef8e8] text-[#2D6A2D]">
                  <Package className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Nenhum pedido recente</p>
                  <p className="mt-0.5 text-xs text-gray-500">Cria o primeiro pedido em poucos passos.</p>
                </div>
              </div>
            </Card>
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
      </section>

      <Link
        href="/app/subscription"
        className="flex items-center gap-4 rounded-2xl border border-[#dbe8d4] bg-[#f7fbf4] p-4 transition-colors hover:border-[#6ABF3C]"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#2D6A2D] shadow-sm">
          <Star className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold text-[#2D6A2D]">Planos mensais</p>
          <p className="mt-0.5 text-xs text-gray-600">Poupa em recolhas recorrentes.</p>
        </div>
        <ChevronRight className="h-4 w-4 text-[#2D6A2D]" />
      </Link>
    </div>
  );
}
