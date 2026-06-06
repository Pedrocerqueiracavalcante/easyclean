import Link from "next/link";
import { headers } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
  MessageCircle,
  Package,
  PackageCheck,
  RotateCcw,
  Truck,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createAuth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { getOrdersOverview } from "@/lib/order-data";

export const dynamic = "force-dynamic";

const activeStatuses = new Set(["pending", "confirmed", "pickup_scheduled", "picked_up", "washing", "ready", "delivery_scheduled"]);

const filters = [
  { id: "all", label: "Todos" },
  { id: "active", label: "Ativos" },
  { id: "delivered", label: "Entregues" },
  { id: "cancelled", label: "Cancelados" },
] as const;

function statusIcon(status: string) {
  if (status === "delivered") return CheckCircle2;
  if (status === "cancelled") return XCircle;
  if (status === "pickup_scheduled" || status === "delivery_scheduled") return Truck;
  if (status === "washing" || status === "ready") return PackageCheck;
  return Clock3;
}

function filterOrders<T extends { status: string }>(orders: T[], filter: string) {
  if (filter === "active") return orders.filter((order) => activeStatuses.has(order.status));
  if (filter === "delivered") return orders.filter((order) => order.status === "delivered");
  if (filter === "cancelled") return orders.filter((order) => order.status === "cancelled");
  return orders;
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams?: Promise<{ filter?: string }>;
}) {
  const query = searchParams ? await searchParams : {};
  const selectedFilter = filters.some((filter) => filter.id === query.filter) ? query.filter ?? "all" : "all";
  const { env } = await getCloudflareContext({ async: true });
  const session = await createAuth(env.DB).api.getSession({ headers: await headers() });
  const orders = session?.user?.id ? await getOrdersOverview(getDb(env.DB), 30, session.user.id) : [];
  const visibleOrders = filterOrders(orders, selectedFilter);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-br from-[#1f5d28] to-[#6ABF3C] p-5 text-white shadow-xl shadow-[#2d6a2d]/20">
        <p className="text-sm font-semibold text-white/75">Pedidos</p>
        <h1 className="mt-1 text-2xl font-black">Acompanha cada etapa</h1>
        <p className="mt-2 text-sm leading-6 text-white/80">
          Vê o estado, repete pedidos e contacta a equipa quando precisares.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((filter) => {
          const active = selectedFilter === filter.id;
          return (
            <Link
              key={filter.id}
              href={filter.id === "all" ? "/app/orders" : `/app/orders?filter=${filter.id}`}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active ? "bg-[#2D6A2D] text-white shadow-sm" : "bg-white text-gray-500 ring-1 ring-[#e2e8df] hover:text-[#2D6A2D]"}`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      {orders.length === 0 ? (
        <Card className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef8e8] text-[#2D6A2D]">
            <Package className="h-7 w-7" />
          </div>
          <p className="font-bold text-gray-900">Ainda não há pedidos</p>
          <p className="mt-1 text-sm leading-6 text-gray-500">Cria o primeiro pedido e acompanha tudo por aqui.</p>
          <Link href="/app/order" className="mt-4 inline-flex">
            <Button>Fazer pedido</Button>
          </Link>
        </Card>
      ) : visibleOrders.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="font-bold text-gray-900">Nenhum pedido neste filtro</p>
          <p className="mt-1 text-sm text-gray-500">Experimenta outro filtro ou cria um novo pedido.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {visibleOrders.map((order) => {
            const Icon = statusIcon(order.status);
            return (
              <Card key={order.id} className="overflow-hidden transition-colors hover:border-[#6ABF3C]">
                <Link href={`/app/orders/${order.id}`} className="block p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef8e8] text-[#2D6A2D]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-gray-400">#{order.id.slice(0, 8).toUpperCase()}</span>
                        <Badge variant={order.badge}>{order.statusText}</Badge>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">{order.itemsText}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                        <CalendarClock className="h-3.5 w-3.5" />
                        {order.createdText}
                      </p>
                      <p className="mt-1 truncate text-xs text-gray-400">{order.addressText}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-black text-[#2D6A2D]">{order.totalText}</p>
                      <ArrowRight className="ml-auto mt-2 h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                </Link>

                <div className="flex border-t border-[#edf3ea] bg-[#fbfdf9]">
                  <Link href={`/app/orders/${order.id}`} className="flex flex-1 items-center justify-center gap-2 py-3 text-xs font-bold text-[#2D6A2D]">
                    <PackageCheck className="h-4 w-4" />
                    Detalhes
                  </Link>
                  <Link href="/app/order" className="flex flex-1 items-center justify-center gap-2 border-l border-[#edf3ea] py-3 text-xs font-bold text-[#2D6A2D]">
                    <RotateCcw className="h-4 w-4" />
                    Repetir
                  </Link>
                  <a
                    href={
                      whatsappNumber
                        ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá, preciso de ajuda com o pedido #${order.id.slice(0, 8).toUpperCase()}.`)}`
                        : "mailto:suporte@easyclean.lu"
                    }
                    className="flex flex-1 items-center justify-center gap-2 border-l border-[#edf3ea] py-3 text-xs font-bold text-[#2D6A2D]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Ajuda
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
