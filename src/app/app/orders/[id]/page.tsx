import Link from "next/link";
import { notFound } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getDb } from "@/lib/db";
import { getOrderDetail, statusLabel } from "@/lib/order-data";
import { formatCurrency } from "@/lib/utils";

const statusSteps = [
  "confirmed",
  "pickup_scheduled",
  "picked_up",
  "washing",
  "ready",
  "delivery_scheduled",
  "delivered",
];

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
  const detail = await getOrderDetail(getDb(env.DB), id);

  if (!detail) {
    notFound();
  }

  const currentIndex = Math.max(statusSteps.findIndex((step) => step === detail.order.status), 0);
  const paid = Boolean(detail.order.paidAt) || query.payment === "success";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/app/orders" className="text-sm text-gray-500">← Voltar</Link>
        <h1 className="text-lg font-bold text-gray-900">Pedido #{id.slice(0, 8).toUpperCase()}</h1>
      </div>

      {paid ? (
        <div className="rounded-2xl border border-[#cfe8c8] bg-[#f0f7ec] px-4 py-3 text-sm font-semibold text-[#2D6A2D]">
          Pagamento confirmado. O pedido foi recebido com sucesso.
        </div>
      ) : (
        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-semibold text-yellow-700">
          Pagamento pendente.
        </div>
      )}

      <Card>
        <CardContent className="pt-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">Estado do pedido</p>
            <Badge variant={detail.badge}>{detail.statusText}</Badge>
          </div>

          <div className="space-y-3">
            {statusSteps.map((step, index) => {
              const done = index < currentIndex;
              const active = index === currentIndex;
              const pending = index > currentIndex;

              return (
                <div key={step} className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm ${done ? "bg-[#2D6A2D] text-white" : active ? "bg-[#6ABF3C] text-white ring-4 ring-[#6ABF3C]/20" : "bg-[#e2e8df] text-gray-400"}`}>
                    {done ? "✓" : index + 1}
                  </div>
                  <div className={`flex-1 text-sm ${active ? "font-semibold text-gray-900" : pending ? "text-gray-400" : "text-gray-600"}`}>
                    {statusLabel(step)}
                    {active ? <span className="ml-2 text-xs font-normal text-[#6ABF3C]">Atual</span> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Endereço</span>
              <span className="text-right font-medium text-gray-800">{detail.addressText}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Criado em</span>
              <span className="text-right font-medium text-gray-800">{detail.createdText}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Cliente</span>
              <span className="text-right font-medium text-gray-800">{detail.user?.name ?? "Cliente"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Serviços</p>
          <div className="space-y-2">
            {detail.items.length === 0 ? (
              <p className="text-sm text-gray-500">Sem itens registados.</p>
            ) : (
              detail.items.map((item) => (
                <div key={item.id} className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-700">{item.name} · {item.quantity}</span>
                  <span className="font-medium">{item.totalText}</span>
                </div>
              ))
            )}
            <div className="flex justify-between border-t border-[#e2e8df] pt-2 font-bold">
              <span>Total</span>
              <span>{formatCurrency(detail.order.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="mb-2 text-sm text-gray-500">Problema com o pedido?</p>
        <a href="mailto:suporte@easyclean.lu" className="text-sm font-medium text-[#2D6A2D] hover:underline">
          Contactar suporte
        </a>
      </div>
    </div>
  );
}
