"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 39,
    yearlyPrice: 33,
    features: ["10 kg/mês", "2 recolhas/mês", "App & Website", "Suporte por email"],
    bag: false,
    color: "border-[#e2e8df]",
  },
  {
    id: "pro",
    name: "Pro",
    price: 69,
    yearlyPrice: 58,
    features: ["20 kg/mês", "4 recolhas/mês", "Saco Easy Clean incluído", "Suporte prioritário", "Kg extra com desconto"],
    bag: true,
    popular: true,
    color: "border-[#6ABF3C]",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 119,
    yearlyPrice: 99,
    features: ["40 kg/mês", "8 recolhas/mês", "Saco Premium incluído", "Conta empresarial", "Relatórios mensais", "Gestor dedicado"],
    bag: true,
    color: "border-[#e2e8df]",
  },
];

export default function SubscriptionPage() {
  const [yearly, setYearly] = useState(false);
  const [selected, setSelected] = useState("pro");

  async function handleSubscribe() {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId: selected, interval: yearly ? "yearly" : "monthly" }),
    });
    const { url } = await res.json() as { url: string };
    window.location.href = url;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-bold text-gray-900">Planos de Assinatura</h1>
        <p className="text-sm text-gray-500 mt-1">Poupa até 17% com plano anual</p>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-center gap-3">
        <span className={`text-sm font-medium ${!yearly ? "text-gray-900" : "text-gray-400"}`}>Mensal</span>
        <button
          onClick={() => setYearly((y) => !y)}
          className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${yearly ? "bg-[#2D6A2D]" : "bg-gray-200"}`}
        >
          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${yearly ? "translate-x-7" : "translate-x-1"}`} />
        </button>
        <span className={`text-sm font-medium ${yearly ? "text-gray-900" : "text-gray-400"}`}>
          Anual <span className="text-[#6ABF3C] font-bold">−17%</span>
        </span>
      </div>

      {/* Plans */}
      <div className="space-y-4">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`w-full text-left rounded-2xl border-2 p-5 transition-all cursor-pointer ${selected === plan.id ? "border-[#2D6A2D] bg-[#f0f7ec]" : plan.color + " bg-white hover:border-[#2D6A2D]/40"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected === plan.id ? "border-[#2D6A2D] bg-[#2D6A2D]" : "border-gray-300"}`}>
                  {selected === plan.id && <span className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900">{plan.name}</p>
                    {plan.popular && <span className="text-xs bg-[#6ABF3C] text-white px-2 py-0.5 rounded-full font-bold">POPULAR</span>}
                  </div>
                  <ul className="mt-2 space-y-1">
                    {plan.features.slice(0, 3).map((f) => (
                      <li key={f} className="text-xs text-gray-500 flex items-center gap-1.5">
                        <span className="text-[#6ABF3C]">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-bold text-[#2D6A2D]">€{yearly ? plan.yearlyPrice : plan.price}</p>
                <p className="text-xs text-gray-400">/mês</p>
                {yearly && <p className="text-xs text-gray-400 line-through">€{plan.price}</p>}
              </div>
            </div>
          </button>
        ))}
      </div>

      <Button className="w-full" size="lg" onClick={handleSubscribe}>
        ⭐ Subscrever {plans.find((p) => p.id === selected)?.name}
      </Button>

      <div className="text-center space-y-1 text-xs text-gray-400">
        <p>🔒 Pagamento seguro via Stripe</p>
        <p>Cancela a qualquer momento, sem penalizações</p>
      </div>
    </div>
  );
}
