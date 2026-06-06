import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  ArrowLeft,
  CalendarClock,
  Check,
  Clock3,
  CreditCard,
  Droplets,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  RotateCcw,
  Shirt,
  Sparkles,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createAuth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { getOrderDetail, shortId, statusLabel } from "@/lib/order-data";
import { formatCurrency } from "@/lib/utils";

const statusSteps = [
  { id: "confirmed", icon: Check },
  { id: "pickup_scheduled", icon: Truck },
  { id: "picked_up", icon: PackageCheck },
  { id: "washing", icon: Droplets },
  { id: "ready", icon: Sparkles },
  { id: "delivery_scheduled", icon: Truck },
  { id: "delivered", icon: Home },
];

function serviceIcon(serviceId: string) {
  if (serviceId === "wash") return Droplets;
  if (serviceId === "iron") return Shirt;
  if (serviceId === "dry") return Sparkles;
  return PackageCheck;
}

export const dynamic = "force-dynamic";

export default async function OrderDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ payment?: string }>;
}) {
  const { id } = await params;
  const query = searchParams ? await searchParams : {};
  const { env } = await getCloudflareContext({ async: true });
  const session = await createAuth(env.DB).api.getSession({ headers: await headers() });
  const detail = await getOrderDetail(getDb(env.DB), id);

  if (!detail || !session?.user?.id || detail.order.userId !== session.user.id) {
    notFound();
  }

  const currentIndex = Math.max(statusSteps.findIndex((step) => step.id === detail.order.status), 0);
  const paid = Boolean(detail.order.paidAt) || query.payment === "success";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá, preciso de ajuda com o pedido #${shortId(id)}.`)}`
    : "mailto:suporte@easyclean.lu";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/app/orders" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-500 ring-1 ring-[#e2e8df]">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2D6A2D]">Pedido</p>
          <h1 className="text-xl font-black text-gray-900">#{shortId(id)}</h1>
        </div>
      </div>

      <div className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${paid ? "border-[#cfe8c8] bg-[#f0f7ec] text-[#2D6A2D]" : "border-yellow-200 bg-yellow-50 text-yellow-700"}`}>
        <div className="flex items-center gap-2">
          {paid ? <Check className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
          {paid ? "Pagamento confirmado. Pedido recebido com sucesso." : "Pagamento pendente."}
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="pt-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-900">Estado do pedido</p>
              <p className="mt-0.5 text-xs text-gray-400">Acompanha o progresso em tempo real.</p>
            </div>
            <Badge variant={detail.badge}>{detail.statusText}</Badge>
          </div>

          <div className="space-y-0">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const done = index < currentIndex;
              const active = index === currentIndex;
              const pending = index > currentIndex;

              return (
                <div key={step.id} className="relative flex gap-3 pb-5 last:pb-0">
                  {index < statusSteps.length - 1 && (
                    <div className={`absolute left-4 top-8 h-full w-0.5 ${done ? "bg-[#2D6A2D]" : "bg-[#e2e8df]"}`} />
                  )}
                  <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${done ? "bg-[#2D6A2D] text-white" : active ? "bg-[#6ABF3C] text-white ring-4 ring-[#6ABF3C]/20" : "bg-[#e2e8df] text-gray-400"}`}>
                    {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm ${active ? "font-bold text-gray-900" : pending ? "font-medium text-gray-400" : "font-medium text-gray-600"}`}>
                      {statusLabel(step.id)}
                    </p>
                    {active ? <p className="mt-0.5 text-xs font-semibold text-[#2D6A2D]">Etapa atual</p> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-start justify-between gap-4 p-4">
            <div>
              <p className="text-sm font-bold text-gray-900">Mapa de acompanhamento</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                A localização é atualizada conforme a equipa muda o estado do pedido.
              </p>
            </div>
            <span className="rounded-full bg-[#eef8e8] px-3 py-1 text-xs font-bold text-[#2D6A2D]">
              {detail.statusText}
            </span>
          </div>
          <div className="relative h-64 bg-[#eef8e8]">
            <iframe
              title="Mapa de acompanhamento do pedido Easy Clean"
              src="https://www.openstreetmap.org/export/embed.html?bbox=6.080%2C49.575%2C6.180%2C49.645&layer=mapnik&marker=49.6116%2C6.1319"
              className="h-full w-full border-0"
              loading="lazy"
            />
            <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/95 p-3 text-xs text-gray-600 shadow-lg shadow-black/10 backdrop-blur">
              <p className="font-bold text-gray-900">Zona operacional Easy Clean</p>
              <p className="mt-0.5">Pedido #{shortId(id)} acompanhado por estado, recolha e entrega.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-2">
        <Link href="/app/order">
          <Button variant="outline" className="w-full">
            <RotateCcw className="h-4 w-4" />
            Repetir
          </Button>
        </Link>
        <a href={whatsappHref} className="col-span-2">
          <Button className="w-full">
            <MessageCircle className="h-4 w-4" />
            Falar com suporte
          </Button>
        </a>
      </div>

      <Card>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <span className="flex items-center gap-2 text-gray-500">
                <MapPin className="h-4 w-4 text-[#2D6A2D]" />
                Morada
              </span>
              <span className="text-right font-medium text-gray-800">{detail.addressText}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="flex items-center gap-2 text-gray-500">
                <CalendarClock className="h-4 w-4 text-[#2D6A2D]" />
                Criado em
              </span>
              <span className="text-right font-medium text-gray-800">{detail.createdText}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="flex items-center gap-2 text-gray-500">
                <Mail className="h-4 w-4 text-[#2D6A2D]" />
                Cliente
              </span>
              <span className="text-right font-medium text-gray-800">{detail.user?.name ?? "Cliente"}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="flex items-center gap-2 text-gray-500">
                <CreditCard className="h-4 w-4 text-[#2D6A2D]" />
                Total
              </span>
              <span className="text-right font-black text-[#2D6A2D]">{detail.totalText}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">Serviços</p>
          <div className="space-y-3">
            {detail.items.length === 0 ? (
              <p className="text-sm text-gray-500">Sem itens registados.</p>
            ) : (
              detail.items.map((item) => {
                const Icon = serviceIcon(item.serviceId);
                return (
                  <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl bg-[#f8faf7] px-3 py-3 text-sm">
                    <span className="flex items-center gap-2 text-gray-700">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#2D6A2D] shadow-sm">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block font-semibold text-gray-900">{item.name}</span>
                        <span className="text-xs text-gray-400">Quantidade: {item.quantity}</span>
                      </span>
                    </span>
                    <span className="font-bold text-gray-900">{item.totalText}</span>
                  </div>
                );
              })
            )}
            <div className="flex justify-between border-t border-[#e2e8df] pt-3 font-bold">
              <span>Total</span>
              <span>{formatCurrency(detail.order.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
