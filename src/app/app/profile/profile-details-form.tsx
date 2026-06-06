"use client";

import { useState } from "react";
import { Phone, Save, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ProfileDetailsFormProps = {
  name: string;
  phone?: string | null;
};

export function ProfileDetailsForm({ name, phone }: ProfileDetailsFormProps) {
  const [form, setForm] = useState({
    name,
    phone: phone ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSave() {
    setSaving(true);
    setStatus("");

    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name.trim() || name,
        phone: form.phone.trim() || null,
      }),
    });

    if (!response.ok) {
      setStatus("Não foi possível guardar os dados.");
      setSaving(false);
      return;
    }

    setStatus("Dados atualizados.");
    setSaving(false);
    window.setTimeout(() => window.location.reload(), 700);
  }

  return (
    <Card className="border-[#dce9d7] p-4 shadow-sm">
      <div className="mb-4">
        <p className="text-sm font-black text-gray-950">Dados pessoais</p>
        <p className="mt-1 text-xs text-gray-500">Mantém o contacto atualizado para recolha e entrega.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">Nome</span>
          <span className="flex items-center gap-2 rounded-2xl border border-[#e2e8df] bg-white px-3 py-2.5">
            <UserRound className="h-4 w-4 text-[#2D6A2D]" />
            <input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-gray-900 outline-none"
              placeholder="Nome do cliente"
            />
          </span>
        </label>
        <label className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">Telefone</span>
          <span className="flex items-center gap-2 rounded-2xl border border-[#e2e8df] bg-white px-3 py-2.5">
            <Phone className="h-4 w-4 text-[#2D6A2D]" />
            <input
              value={form.phone}
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-gray-900 outline-none"
              placeholder="+352 621 000 000"
              type="tel"
            />
          </span>
        </label>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-[#2D6A2D]">{status}</p>
        <Button type="button" size="sm" onClick={handleSave} loading={saving}>
          <Save className="h-4 w-4" />
          Guardar
        </Button>
      </div>
    </Card>
  );
}
