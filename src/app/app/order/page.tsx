"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const services = [
  { id: "wash", icon: "🧺", name: "Lavagem", unit: "kg", price: 4, description: "Lavagem e secagem completa" },
  { id: "iron", icon: "👔", name: "Passar a Ferro", unit: "peça", price: 2, description: "Passagem profissional" },
  { id: "dry", icon: "🥼", name: "Limpeza a Seco", unit: "peça", price: 8, description: "Para peças delicadas" },
  { id: "bed", icon: "🛏️", name: "Roupas de Cama", unit: "peça", price: 6, description: "Lençóis e edredons" },
  { id: "shoes", icon: "👟", name: "Calçado", unit: "par", price: 5, description: "Limpeza de sapatos" },
  { id: "bag", icon: "📦", name: "Saco Completo", unit: "saco", price: 29, description: "Saco cheio — preço fixo" },
];

const timeSlots = [
  "08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00",
  "14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00",
];

const days = [
  { label: "Hoje", date: "Seg 2 Jun" },
  { label: "Amanhã", date: "Ter 3 Jun" },
  { label: "", date: "Qua 4 Jun" },
  { label: "", date: "Qui 5 Jun" },
  { label: "", date: "Sex 6 Jun" },
];

type Step = "services" | "schedule" | "confirm";

export default function OrderPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("services");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [pickupDay, setPickupDay] = useState(0);
  const [pickupSlot, setPickupSlot] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [coupon, setCoupon] = useState("");

  function change(id: string, delta: number) {
    setQuantities((q) => {
      const next = (q[id] ?? 0) + delta;
      if (next <= 0) {
        const rest = { ...q };
        delete rest[id];
        return rest;
      }
      return { ...q, [id]: next };
    });
  }

  const items = services.filter((s) => (quantities[s.id] ?? 0) > 0);
  const subtotal = items.reduce((acc, s) => acc + s.price * (quantities[s.id] ?? 0), 0);
  const hasItems = items.length > 0;

  async function handleConfirm() {
    setLoading(true);
    setPaymentError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: quantities, pickupDay, pickupSlot, notes, coupon }),
      });

      const data = await res.json() as { id?: string; checkoutUrl?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error || "Não foi possível preparar o pagamento.");
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      if (data.id) {
        router.push(`/app/orders/${data.id}`);
        return;
      }

      throw new Error("Não foi possível preparar o pagamento.");
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : "Não foi possível preparar o pagamento.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          {(["services", "schedule", "confirm"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step === s || (i === 0 && step !== "services") || (i === 1 && step === "confirm") ? "bg-[#2D6A2D] text-white" : "bg-[#e2e8df] text-gray-400"}`}>
                {i + 1}
              </div>
              {i < 2 && <div className="flex-1 h-0.5 bg-[#e2e8df]" />}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Serviços</span><span>Horário</span><span>Confirmar</span>
        </div>
      </div>

      {/* Step 1 — Services */}
      {step === "services" && (
        <div className="space-y-4">
          <h1 className="text-lg font-bold text-gray-900">O que precisas?</h1>
          <div className="space-y-3">
            {services.map((s) => {
              const qty = quantities[s.id] ?? 0;
              return (
                <div key={s.id} className={`bg-white rounded-2xl border p-4 flex items-center gap-4 transition-colors ${qty > 0 ? "border-[#6ABF3C]" : "border-[#e2e8df]"}`}>
                  <span className="text-2xl">{s.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.description}</p>
                    <p className="text-xs font-bold text-[#2D6A2D] mt-0.5">€{s.price}/{s.unit}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => change(s.id, -1)} disabled={qty === 0} className="w-8 h-8 rounded-xl border border-[#e2e8df] flex items-center justify-center text-gray-600 hover:border-[#2D6A2D] disabled:opacity-30 cursor-pointer">−</button>
                    <span className="w-6 text-center text-sm font-bold text-gray-900">{qty}</span>
                    <button onClick={() => change(s.id, 1)} className="w-8 h-8 rounded-xl bg-[#2D6A2D] flex items-center justify-center text-white hover:bg-[#1e4d1e] cursor-pointer">+</button>
                  </div>
                </div>
              );
            })}
          </div>

          {hasItems && (
            <div className="fixed bottom-20 left-0 right-0 px-4">
              <div className="max-w-2xl mx-auto">
                <Card className="p-4 flex items-center gap-4 shadow-lg">
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">{items.length} serviço{items.length !== 1 ? "s" : ""}</p>
                    <p className="font-bold text-gray-900">Total: €{subtotal.toFixed(2)}</p>
                  </div>
                  <Button onClick={() => setStep("schedule")}>Continuar →</Button>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 2 — Schedule */}
      {step === "schedule" && (
        <div className="space-y-6">
          <button onClick={() => setStep("services")} className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer">← Voltar</button>
          <h1 className="text-lg font-bold text-gray-900">Quando recolhemos?</h1>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Dia da recolha</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {days.map((d, i) => (
                <button key={i} onClick={() => setPickupDay(i)} className={`flex-shrink-0 px-4 py-3 rounded-xl border text-center cursor-pointer transition-colors ${pickupDay === i ? "border-[#2D6A2D] bg-[#e8f5e0] text-[#2D6A2D]" : "border-[#e2e8df] bg-white text-gray-600"}`}>
                  {d.label && <p className="text-xs font-bold text-[#6ABF3C]">{d.label}</p>}
                  <p className="text-sm font-medium">{d.date}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Horário</p>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <button key={slot} onClick={() => setPickupSlot(slot)} className={`py-3 px-4 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${pickupSlot === slot ? "border-[#2D6A2D] bg-[#e8f5e0] text-[#2D6A2D]" : "border-[#e2e8df] bg-white text-gray-600 hover:border-[#2D6A2D]"}`}>
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Notas (opcional)</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Apartamento 3ºDto, campainha não funciona..."
              className="w-full border border-[#e2e8df] rounded-xl p-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6ABF3C] resize-none"
              rows={3}
            />
          </div>

          <Button className="w-full" disabled={!pickupSlot} onClick={() => setStep("confirm")}>
            Continuar →
          </Button>
        </div>
      )}

      {/* Step 3 — Confirm */}
      {step === "confirm" && (
        <div className="space-y-6">
          <button onClick={() => setStep("schedule")} className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer">← Voltar</button>
          <h1 className="text-lg font-bold text-gray-900">Confirmar Pedido</h1>

          <Card>
            <div className="p-4 border-b border-[#e2e8df]">
              <p className="text-xs text-gray-400 mb-1">📍 Endereço de recolha</p>
              <p className="text-sm font-medium text-gray-800">Rue de la Gare 42, Luxembourg</p>
            </div>
            <div className="p-4 border-b border-[#e2e8df]">
              <p className="text-xs text-gray-400 mb-1">🕐 Recolha</p>
              <p className="text-sm font-medium text-gray-800">{days[pickupDay].date} · {pickupSlot}</p>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-2">🧺 Serviços</p>
              <div className="space-y-2">
                {items.map((s) => (
                  <div key={s.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">{s.icon} {s.name} × {quantities[s.id]} {s.unit}</span>
                    <span className="font-medium text-gray-900">€{(s.price * (quantities[s.id] ?? 0)).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div>
            <div className="flex gap-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Código de desconto"
                className="flex-1 border border-[#e2e8df] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6ABF3C]"
              />
              <Button variant="outline">Aplicar</Button>
            </div>
          </div>

          <div className="bg-[#f8faf7] rounded-2xl p-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span><span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Recolha</span><span className="text-[#2D6A2D] font-medium">Grátis</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Entrega</span><span className="text-[#2D6A2D] font-medium">Grátis</span>
            </div>
            <div className="border-t border-[#e2e8df] pt-2 flex justify-between font-bold text-gray-900">
              <span>Total</span><span>€{subtotal.toFixed(2)}</span>
            </div>
          </div>

          <Button className="w-full" size="lg" onClick={handleConfirm} loading={loading}>
            💳 Confirmar e Pagar
          </Button>

          {paymentError ? (
            <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-xs font-medium text-red-600">
              {paymentError}
            </p>
          ) : null}

          <p className="text-center text-xs text-gray-400">
            Pagamento seguro via Stripe · 🔒 SSL
          </p>
        </div>
      )}
    </div>
  );
}
