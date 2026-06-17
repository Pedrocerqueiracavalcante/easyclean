"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  Clock,
  CreditCard,
  Footprints,
  MapPin,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  Shirt,
  Sparkles,
  TicketPercent,
  WalletCards,
  WashingMachine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { isPickupSlotAvailable, orderTimeSlots } from "@/lib/order-schedule";

const services = [
  { id: "wash", icon: WashingMachine, name: "Lavagem", unit: "kg", price: 4, badge: "Mais pedido", description: "Lavagem, secagem e dobra completa." },
  { id: "iron", icon: Shirt, name: "Passagem a ferro", unit: "peça", price: 2, badge: "Acabamento", description: "Roupa sem vincos, pronta a usar." },
  { id: "dry", icon: Sparkles, name: "Limpeza a seco", unit: "peça", price: 8, badge: "Delicados", description: "Cuidado para peças delicadas." },
  { id: "bed", icon: BedDouble, name: "Roupas de cama", unit: "peça", price: 6, badge: "Volume", description: "Lençóis, capas e edredons." },
  { id: "shoes", icon: Footprints, name: "Calçado", unit: "par", price: 5, badge: "Por par", description: "Limpeza cuidada de sapatos." },
  { id: "bag", icon: PackageCheck, name: "Saco completo", unit: "saco", price: 29, badge: "Preço fixo", description: "Saco cheio com preço fixo." },
];

type Step = "services" | "schedule" | "confirm";

type Address = {
  id: string;
  userId: string;
  label: string;
  street: string;
  number: string;
  floor?: string | null;
  postalCode: string;
  city: string;
  country: string;
  isDefault?: boolean | null;
};

const stepLabels: Record<Step, string> = {
  services: "Serviços",
  schedule: "Horário",
  confirm: "Confirmar",
};

function formatEuro(value: number) {
  return new Intl.NumberFormat("fr-LU", { style: "currency", currency: "EUR" }).format(value);
}

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
  const [couponMessage, setCouponMessage] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get("service");
    const product = params.get("produto");

    if (serviceId && services.some((service) => service.id === serviceId)) {
      window.setTimeout(() => {
        setQuantities((current) => (current[serviceId] ? current : { ...current, [serviceId]: 1 }));
      }, 0);
    }

    if (product) {
      window.setTimeout(() => {
        setNotes((current) => current || `Produto recomendado escolhido: ${product}`);
      }, 0);
    }
  }, []);

  const days = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("pt-PT", { weekday: "short", day: "numeric", month: "numeric" });

    return Array.from({ length: 5 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);

      return {
        label: index === 0 ? "Hoje" : index === 1 ? "Amanhã" : "",
        date: formatter.format(date).replace(".", ""),
      };
    });
  }, []);

  const selectedAddress = addresses.find((address) => address.isDefault) ?? addresses[0];
  const selectedAddressText = selectedAddress
    ? `${selectedAddress.street} ${selectedAddress.number}, ${selectedAddress.city}`
    : "Adiciona uma morada antes de pagar.";

  const items = services.filter((service) => (quantities[service.id] ?? 0) > 0);
  const subtotal = items.reduce((acc, service) => acc + service.price * (quantities[service.id] ?? 0), 0);
  const couponCode = coupon.trim().toUpperCase();
  const discount = couponCode === "PRIMEIRA10" && subtotal > 0 ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const total = Math.max(0, Math.round((subtotal - discount) * 100) / 100);
  const hasItems = items.length > 0;
  const availableSlots = useMemo(
    () => orderTimeSlots.filter((slot) => isPickupSlotAvailable(slot, pickupDay, now)),
    [pickupDay, now],
  );
  const pickupSlotIsValid = Boolean(pickupSlot && isPickupSlotAvailable(pickupSlot, pickupDay, now));

  useEffect(() => {
    fetch("/api/addresses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAddresses(data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  function change(id: string, delta: number) {
    setQuantities((current) => {
      const next = (current[id] ?? 0) + delta;
      if (next <= 0) {
        const rest = { ...current };
        delete rest[id];
        return rest;
      }
      return { ...current, [id]: next };
    });
  }

  function applyCoupon() {
    if (!coupon.trim()) {
      setCouponMessage("Insere um código para aplicar.");
      return;
    }

    if (couponCode === "PRIMEIRA10") {
      setCouponMessage("Cupão PRIMEIRA10 aplicado: 10% de desconto.");
      return;
    }

    setCouponMessage("Cupão não encontrado.");
  }

  async function handleConfirm() {
    setLoading(true);
    setPaymentError("");

    if (!selectedAddress) {
      setPaymentError("Adiciona uma morada antes de confirmar o pedido.");
      setLoading(false);
      return;
    }

    if (!pickupSlotIsValid) {
      setPaymentError("Escolhe um horário disponível para continuar.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: quantities,
          pickupDay,
          pickupSlot,
          notes,
          coupon,
          addressId: selectedAddress.id,
        }),
      });

      const data = (await res.json()) as { id?: string; checkoutUrl?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error || "Não foi possível preparar o pagamento.");
      }

      if (data.checkoutUrl) {
        window.location.assign(data.checkoutUrl);
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
    <div className="notranslate space-y-6 pb-24">
      <div>
        <div className="mb-2 flex items-center gap-2">
          {(["services", "schedule", "confirm"] as Step[]).map((currentStep, index) => {
            const active = step === currentStep || (index === 0 && step !== "services") || (index === 1 && step === "confirm");
            return (
              <div key={currentStep} className="flex flex-1 items-center gap-2">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${active ? "bg-[#2D6A2D] text-white" : "bg-[#e2e8df] text-gray-400"}`}>
                  {active && step !== currentStep ? <Check className="h-3.5 w-3.5" /> : index + 1}
                </div>
                {index < 2 && <div className="h-0.5 flex-1 bg-[#e2e8df]" />}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs font-semibold text-gray-400">
          {(["services", "schedule", "confirm"] as Step[]).map((currentStep) => (
            <span key={currentStep}>{stepLabels[currentStep]}</span>
          ))}
        </div>
      </div>

      {hasItems ? (
        <Card className="sticky top-20 z-20 border-[#cde5c4] bg-white/95 p-4 shadow-lg shadow-[#2d6a2d]/10 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-black text-gray-900">
                {items.map((item) => `${quantities[item.id]}x ${item.name}`).join(" · ")}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                {pickupSlot ? `${days[pickupDay].date} · ${pickupSlot}` : "Escolhe o horário"} · {formatEuro(total)}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-[#eef8e8] px-3 py-1 text-sm font-black text-[#2D6A2D]">{formatEuro(total)}</span>
          </div>
        </Card>
      ) : null}

      {step === "services" && (
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2D6A2D]">Serviços</p>
              <h1 className="mt-1 text-2xl font-black tracking-tight text-gray-950">O que precisas?</h1>
            </div>
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#2D6A2D] ring-1 ring-[#dcebd7]">
              {formatEuro(total)}
            </span>
          </div>

          <div className="space-y-3">
            {services.map((service) => {
              const quantity = quantities[service.id] ?? 0;
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className={`group relative overflow-hidden rounded-[30px] border bg-white p-4 shadow-sm transition-all ${
                    quantity > 0
                      ? "border-[#2D6A2D] bg-[#fbfff8] shadow-xl shadow-[#2d6a2d]/12 ring-2 ring-[#e8f5e0]"
                      : "border-[#dfeadd] hover:-translate-y-0.5 hover:border-[#b9d9ad] hover:shadow-xl hover:shadow-[#2d6a2d]/10"
                  }`}
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#eef8e8] opacity-70 transition group-hover:scale-110" />
                  <div className="relative flex items-center gap-3">
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[24px] border transition-all sm:h-[72px] sm:w-[72px] ${
                        quantity > 0
                          ? "border-[#2D6A2D] bg-[#2D6A2D] text-white shadow-lg shadow-[#2d6a2d]/25"
                          : "border-[#dcebd7] bg-[#eef8e8] text-[#2D6A2D] group-hover:bg-white"
                      }`}
                    >
                      <Icon className="h-7 w-7 stroke-[2.4] sm:h-8 sm:w-8" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[15px] font-black leading-tight text-gray-950">{service.name}</p>
                        <span className="rounded-full bg-[#f2faee] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#2D6A2D] ring-1 ring-[#dcebd7]">
                          {service.badge}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">{service.description}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <p className="inline-flex rounded-full bg-[#102316] px-3 py-1 text-sm font-black text-white">
                          {formatEuro(service.price)}/{service.unit}
                        </p>
                        {quantity > 0 ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f5e0] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#2D6A2D]">
                            <Check className="h-3 w-3" />
                            selecionado
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-center gap-2 rounded-[22px] border border-[#edf4ea] bg-white/90 p-1.5 shadow-sm">
                      <button
                        type="button"
                        aria-label={`Remover ${service.name}`}
                        onClick={() => change(service.id, -1)}
                        disabled={quantity === 0}
                        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#e2e8df] bg-white text-gray-500 transition-colors hover:border-[#2D6A2D] hover:text-[#2D6A2D] disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-8 text-center text-lg font-black leading-none text-gray-950">{quantity}</span>
                      <button
                        type="button"
                        aria-label={`Adicionar ${service.name}`}
                        onClick={() => change(service.id, 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2D6A2D] text-white shadow-lg shadow-[#2d6a2d]/25 transition-colors hover:bg-[#1e4d1e]"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {hasItems ? (
            <Button className="h-12 w-full rounded-2xl text-base font-black shadow-lg shadow-[#2d6a2d]/18" onClick={() => setStep("schedule")}>
              Continuar
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      )}

      {step === "schedule" && (
        <div className="space-y-6">
          <button onClick={() => setStep("services")} className="flex items-center gap-1 text-sm font-medium text-gray-500">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          <div>
            <h1 className="text-xl font-black text-gray-900">Quando recolhemos?</h1>
            <p className="mt-1 text-sm text-gray-500">Escolhe o melhor dia e horário.</p>
          </div>

          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <CalendarDays className="h-4 w-4 text-[#2D6A2D]" />
              Dia da recolha
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setPickupDay(index);
                    setPickupSlot("");
                  }}
                  className={`shrink-0 rounded-xl border px-4 py-3 text-center transition-colors ${pickupDay === index ? "border-[#2D6A2D] bg-[#e8f5e0] text-[#2D6A2D]" : "border-[#e2e8df] bg-white text-gray-600"}`}
                >
                  {day.label && <p className="text-xs font-bold text-[#6ABF3C]">{day.label}</p>}
                  <p className="text-sm font-medium">{day.date}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Clock className="h-4 w-4 text-[#2D6A2D]" />
              Horário
            </p>
            {pickupDay === 0 ? (
              <p className="mb-3 rounded-2xl bg-[#f8faf7] px-4 py-3 text-xs leading-5 text-gray-500">
                Para hoje, só mostramos horários com pelo menos 1 hora de antecedência.
              </p>
            ) : null}
            <div className="grid grid-cols-2 gap-2">
              {orderTimeSlots.map((slot) => {
                const available = isPickupSlotAvailable(slot, pickupDay, now);
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => available && setPickupSlot(slot)}
                    disabled={!available}
                    className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${pickupSlot === slot && available ? "border-[#2D6A2D] bg-[#e8f5e0] text-[#2D6A2D]" : available ? "border-[#e2e8df] bg-white text-gray-600 hover:border-[#2D6A2D]" : "cursor-not-allowed border-[#e2e8df] bg-gray-50 text-gray-300"}`}
                  >
                    <span>{slot}</span>
                    {!available ? <span className="mt-1 block text-[10px] font-bold uppercase">Indisponível</span> : null}
                  </button>
                );
              })}
            </div>
            {availableSlots.length === 0 ? (
              <p className="mt-3 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-700">
                Já não há horários disponíveis para hoje. Escolhe amanhã ou outro dia.
              </p>
            ) : null}
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-gray-700">Notas opcionais</p>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Ex: apartamento 3Dto, campainha não funciona..."
              className="w-full resize-none rounded-xl border border-[#e2e8df] p-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6ABF3C]"
              rows={3}
            />
          </div>

          <Button className="w-full" disabled={!pickupSlotIsValid} onClick={() => setStep("confirm")}>
            Continuar
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {step === "confirm" && (
        <div className="space-y-6">
          <button onClick={() => setStep("schedule")} className="flex items-center gap-1 text-sm font-medium text-gray-500">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          <h1 className="text-xl font-black text-gray-900">Confirmar pedido</h1>

          <Card>
            <div className="border-b border-[#e2e8df] p-4">
              <p className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-400">
                <MapPin className="h-4 w-4 text-[#2D6A2D]" />
                Endereço de recolha
              </p>
              <p className="text-sm font-medium text-gray-800">{selectedAddressText}</p>
            </div>
            <div className="border-b border-[#e2e8df] p-4">
              <p className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-400">
                <Clock className="h-4 w-4 text-[#2D6A2D]" />
                Recolha
              </p>
              <p className="text-sm font-medium text-gray-800">{days[pickupDay].date} · {pickupSlot}</p>
            </div>
            <div className="p-4">
              <p className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-400">
                <PackageCheck className="h-4 w-4 text-[#2D6A2D]" />
                Serviços
              </p>
              <div className="space-y-2">
                {items.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div key={service.id} className="flex justify-between gap-3 text-sm">
                      <span className="flex items-center gap-2 text-gray-700">
                        <Icon className="h-4 w-4 text-[#2D6A2D]" />
                        {service.name} x {quantities[service.id]} {service.unit}
                      </span>
                      <span className="font-medium text-gray-900">{formatEuro(service.price * (quantities[service.id] ?? 0))}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <TicketPercent className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                <input
                  value={coupon}
                  onChange={(event) => setCoupon(event.target.value)}
                  placeholder="Código de desconto"
                  className="w-full rounded-xl border border-[#e2e8df] py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#6ABF3C]"
                />
              </div>
              <Button type="button" variant="outline" onClick={applyCoupon}>Aplicar</Button>
            </div>
            <p className="text-xs text-gray-500">Cupão de primeira compra: <span className="font-bold text-[#2D6A2D]">PRIMEIRA10</span></p>
            {couponMessage ? <p className="text-xs font-semibold text-[#2D6A2D]">{couponMessage}</p> : null}
          </div>

          <div className="space-y-2 rounded-2xl bg-[#f8faf7] p-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span><span>{formatEuro(subtotal)}</span>
            </div>
            {discount > 0 ? (
              <div className="flex justify-between text-sm text-[#2D6A2D]">
                <span>Desconto PRIMEIRA10</span><span>-{formatEuro(discount)}</span>
              </div>
            ) : null}
            <div className="flex justify-between text-sm text-gray-600">
              <span>Recolha</span><span className="font-medium text-[#2D6A2D]">Grátis</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Entrega</span><span className="font-medium text-[#2D6A2D]">Grátis</span>
            </div>
            <div className="flex justify-between border-t border-[#e2e8df] pt-2 font-bold text-gray-900">
              <span>Total</span><span>{formatEuro(total)}</span>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[#2D6A2D] bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f5e0] text-[#2D6A2D]">
                <CreditCard className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">Pagamento com cartão</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Vais ser enviado para o Stripe para pagar com cartão de crédito ou débito em segurança.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-gray-500">
                  <span className="rounded-full bg-[#f8faf7] px-2.5 py-1">Visa</span>
                  <span className="rounded-full bg-[#f8faf7] px-2.5 py-1">Mastercard</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#f8faf7] px-2.5 py-1">
                    <ShieldCheck className="h-3 w-3" />
                    3D Secure
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full" size="lg" onClick={handleConfirm} loading={loading}>
            <WalletCards className="h-4 w-4" />
            Confirmar e pagar
          </Button>

          {paymentError ? (
            <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-xs font-medium text-red-600">
              {paymentError}
            </p>
          ) : null}

          <p className="flex items-center justify-center gap-1 text-center text-xs text-gray-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            Pagamento seguro via Stripe
          </p>
        </div>
      )}
    </div>
  );
}
