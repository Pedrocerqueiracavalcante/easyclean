import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const statusSteps = [
  { key: "confirmed", label: "Pedido Confirmado", icon: "✅" },
  { key: "pickup_scheduled", label: "Recolha Agendada", icon: "📅" },
  { key: "picked_up", label: "Roupa Recolhida", icon: "🚗" },
  { key: "washing", label: "Em Lavagem", icon: "🌀" },
  { key: "ready", label: "Pronta para Entrega", icon: "✨" },
  { key: "delivery_scheduled", label: "Entrega Agendada", icon: "📦" },
  { key: "delivered", label: "Entregue", icon: "🏠" },
];

const currentStatus = "washing";
const currentIndex = statusSteps.findIndex((s) => s.key === currentStatus);

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/app/orders" className="text-sm text-gray-500">← Voltar</Link>
        <h1 className="text-lg font-bold text-gray-900">Pedido #{id.toUpperCase()}</h1>
      </div>

      {/* Status card */}
      <Card>
        <CardContent className="pt-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-700">Estado do pedido</p>
            <Badge variant="blue">Em Lavagem</Badge>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            {statusSteps.map((step, i) => {
              const done = i < currentIndex;
              const active = i === currentIndex;
              const pending = i > currentIndex;
              return (
                <div key={step.key} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${done ? "bg-[#2D6A2D] text-white" : active ? "bg-[#6ABF3C] text-white ring-4 ring-[#6ABF3C]/20" : "bg-[#e2e8df] text-gray-400"}`}>
                    {done ? "✓" : step.icon}
                  </div>
                  <div className={`flex-1 text-sm ${active ? "font-semibold text-gray-900" : pending ? "text-gray-400" : "text-gray-600"}`}>
                    {step.label}
                    {active && (
                      <span className="ml-2 text-xs text-[#6ABF3C] font-normal animate-pulse">Em curso...</span>
                    )}
                  </div>
                  {done && <span className="text-xs text-gray-400">✓</span>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Order info */}
      <Card>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">📍 Endereço</span>
              <span className="font-medium text-gray-800">Rue de la Gare 42</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">🕐 Recolha</span>
              <span className="font-medium text-gray-800">2 Jun · 10:00-12:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">🚚 Entrega prevista</span>
              <span className="font-medium text-gray-800">4 Jun · 14:00-16:00</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items */}
      <Card>
        <CardContent>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Serviços</p>
          <div className="space-y-2">
            {[
              { name: "🧺 Lavagem", qty: "8 kg", price: 32 },
              { name: "👔 Passar a Ferro", qty: "3 peças", price: 6 },
            ].map((item) => (
              <div key={item.name} className="flex justify-between text-sm">
                <span className="text-gray-700">{item.name} · {item.qty}</span>
                <span className="font-medium">€{item.price}</span>
              </div>
            ))}
            <div className="border-t border-[#e2e8df] pt-2 flex justify-between font-bold">
              <span>Total</span><span>€38</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">Problema com o pedido?</p>
        <a href="mailto:suporte@easyclean.lu" className="text-sm text-[#2D6A2D] font-medium hover:underline">
          📧 Contactar suporte
        </a>
      </div>
    </div>
  );
}
