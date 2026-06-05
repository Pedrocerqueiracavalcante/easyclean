"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    label: "Casa",
    street: "",
    number: "",
    floor: "",
    postalCode: "",
    city: "Luxembourg",
  });

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, isDefault: true }),
      });
      if (!res.ok) {
        throw new Error("Erro ao guardar morada.");
      }
      router.push("/app/home");
    } catch {
      setError("Não foi possível guardar a morada. Confirma os dados e tenta novamente.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-lg">
      <div className="text-center mb-8">
        <div className="text-4xl mb-3">📍</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Onde moras?</h1>
        <p className="text-gray-500 text-sm">
          Adiciona o teu endereço para que possamos ir buscar a roupa.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#e2e8df] shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Tipo de endereço
            </label>
            <div className="flex gap-3">
              {["Casa", "Trabalho", "Outro"].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, label }))}
                  className={`flex-1 py-2 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${
                    form.label === label
                      ? "border-[#2D6A2D] bg-[#e8f5e0] text-[#2D6A2D]"
                      : "border-[#e2e8df] text-gray-600 hover:border-[#2D6A2D]"
                  }`}
                >
                  {label === "Casa" ? "🏠" : label === "Trabalho" ? "🏢" : "📍"} {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <Input label="Rua / Avenida" placeholder="Rue de la Gare" value={form.street} onChange={set("street")} required />
            </div>
            <Input label="Número" placeholder="42" value={form.number} onChange={set("number")} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input label="Andar / Apartamento" placeholder="3º Dto (opcional)" value={form.floor} onChange={set("floor")} />
            <Input label="Código Postal" placeholder="1234" value={form.postalCode} onChange={set("postalCode")} required />
          </div>

          <Input label="Cidade" placeholder="Luxembourg" value={form.city} onChange={set("city")} required />

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <div className="pt-2">
            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Confirmar Endereço →
            </Button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6 text-xs text-gray-400">
        <span>🔒 Dados protegidos (GDPR)</span>
        <span>·</span>
        <span>📍 Só usado para recolha/entrega</span>
      </div>
    </div>
  );
}
