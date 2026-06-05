import Link from "next/link";
import { notFound } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDb } from "@/lib/db";
import { getOrderDetail } from "@/lib/order-data";
import { formatCurrency } from "@/lib/utils";
import { updateOrderStatus } from "./actions";

const adminStatuses = [
  { value: "confirmed", label: "Confirmar" },
  { value: "pickup_scheduled", label: "Recolha agendada" },
  { value: "picked_up", label: "Recolhido" },
  { value: "washing", label: "Em lavagem" },
  { value: "ready", label: "Pronto" },
  { value: "delivered", label: "Entregue" },
  { value: "cancelled", label: "Cancelar" },
] as const;

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { env } = await getCloudflareContext({ async: true });
  const detail = await getOrderDetail(getDb(env.DB), id);

  if (!detail) {
    notFound();
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/orders" className="text-sm text-gray-500">← Voltar</Link>
        <h1 className="text-xl font-bold text-gray-900">Pedido #{id.slice(0, 8).toUpperCase()}</h1>
        <Badge variant={detail.badge}>{detail.statusText}</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs font-medium text-gray-500">Total</p>
            <p className="mt-1 text-2xl font-bold text-[#2D6A2D]">{formatCurrency(detail.order.total)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs font-medium text-gray-500">Pagamento</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">{detail.order.paidAt ? "Pago" : "Pendente"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs font-medium text-gray-500">Criado em</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">{detail.createdText}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cliente e recolha</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 text-sm md:grid-cols-2">
            <div>
              <p className="text-xs text-gray-400">Cliente</p>
              <p className="font-semibold text-gray-900">{detail.user?.name ?? "Cliente"}</p>
              <p className="text-gray-500">{detail.user?.email ?? "Sem email"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Morada</p>
              <p className="font-semibold text-gray-900">{detail.addressText}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Serviços</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {detail.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-700">{item.name} · {item.quantity}</span>
                <span className="font-semibold text-gray-900">{item.totalText}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Atualizar estado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {adminStatuses.map((status) => (
              <form key={status.value} action={updateOrderStatus}>
                <input type="hidden" name="orderId" value={id} />
                <input type="hidden" name="status" value={status.value} />
                <button
                  type="submit"
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${detail.order.status === status.value ? "bg-[#2D6A2D] text-white" : "border border-[#e2e8df] bg-white text-gray-600 hover:border-[#2D6A2D] hover:text-[#2D6A2D]"}`}
                >
                  {status.label}
                </button>
              </form>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
