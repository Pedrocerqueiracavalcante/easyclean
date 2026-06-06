"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, ExternalLink, MapPin, Navigation, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const areas = [
  { name: "Luxembourg Ville", eta: "Hoje ou amanhã", status: "active" },
  { name: "Kirchberg", eta: "Hoje ou amanhã", status: "active" },
  { name: "Limpertsberg", eta: "Hoje ou amanhã", status: "active" },
  { name: "Belair", eta: "Hoje ou amanhã", status: "active" },
  { name: "Gasperich", eta: "24h a 48h", status: "active" },
  { name: "Bonnevoie", eta: "24h a 48h", status: "active" },
  { name: "Hollerich", eta: "24h a 48h", status: "active" },
  { name: "Strassen", eta: "Sob confirmação", status: "confirm" },
  { name: "Bertrange", eta: "Sob confirmação", status: "confirm" },
  { name: "Hesperange", eta: "Sob confirmação", status: "confirm" },
] as const;

const openStreetMapUrl =
  "https://www.openstreetmap.org/export/embed.html?bbox=6.0630%2C49.5630%2C6.2150%2C49.6600&layer=mapnik&marker=49.6116%2C6.1319";

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function CoverageMap() {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalize(query);

  const matchedArea = useMemo(() => {
    if (!normalizedQuery) return null;
    return areas.find((area) => normalize(area.name).includes(normalizedQuery)) ?? null;
  }, [normalizedQuery]);

  const showUnknown = normalizedQuery.length > 2 && !matchedArea;

  return (
    <section id="areas" className="bg-[#f7fbf4] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-[#2D6A2D]">Maps</p>
            <h2 className="text-3xl font-black leading-tight text-[#102316] md:text-4xl">
              Veja se recolhemos na tua zona
            </h2>
          </div>
          <p className="text-base leading-7 text-[#64748b]">
            Um sistema simples para confirmar cobertura antes de criar conta. O mapa mostra a região de Luxembourg e a lista indica as zonas de recolha.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[32px] border border-[#dcebd7] bg-white p-5 shadow-xl shadow-[#1f5d28]/8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef8e8] text-[#2D6A2D]">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-black text-[#102316]">Pesquisar localidade</h3>
                <p className="text-sm text-[#64748b]">Exemplo: Kirchberg, Belair, Gasperich</p>
              </div>
            </div>

            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Escreve a tua zona"
                className="h-14 w-full rounded-2xl border border-[#dcebd7] bg-[#fbfdf9] pl-12 pr-4 text-sm font-semibold text-[#102316] outline-none transition focus:border-[#2D6A2D] focus:bg-white focus:ring-4 focus:ring-[#2D6A2D]/10"
              />
            </label>

            <div className="mt-5 rounded-[24px] border border-[#dcebd7] bg-[#fbfdf9] p-4">
              {matchedArea ? (
                <div className="flex gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-[#2D6A2D]" />
                  <div>
                    <p className="font-black text-[#102316]">{matchedArea.name}</p>
                    <p className="mt-1 text-sm leading-6 text-[#64748b]">
                      Zona atendida. Previsão: <span className="font-bold text-[#2D6A2D]">{matchedArea.eta}</span>.
                    </p>
                  </div>
                </div>
              ) : showUnknown ? (
                <div className="flex gap-3">
                  <Clock className="mt-0.5 h-6 w-6 shrink-0 text-[#B8860B]" />
                  <div>
                    <p className="font-black text-[#102316]">Confirmar disponibilidade</p>
                    <p className="mt-1 text-sm leading-6 text-[#64748b]">
                      Ainda não temos essa zona na lista. Confirma pelo contacto antes de agendar.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Navigation className="mt-0.5 h-6 w-6 shrink-0 text-[#2D6A2D]" />
                  <div>
                    <p className="font-black text-[#102316]">Começa pela tua localidade</p>
                    <p className="mt-1 text-sm leading-6 text-[#64748b]">
                      O resultado aparece automaticamente enquanto escreves.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link href="/register">
                <Button className="w-full">
                  Criar conta
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#contacto">
                <Button variant="outline" className="w-full bg-white">
                  Confirmar contacto
                </Button>
              </a>
            </div>

            <div className="mt-5 grid gap-2 rounded-[24px] border border-[#dcebd7] bg-white p-3 sm:grid-cols-2">
              {areas.map((area) => (
                <div key={area.name} className="flex items-center justify-between gap-3 rounded-2xl bg-[#fbfdf9] px-3 py-2">
                  <span className="flex items-center gap-2 text-xs font-bold text-[#102316]">
                    <span
                      className={[
                        "h-2.5 w-2.5 rounded-full",
                        area.status === "active" ? "bg-[#2D6A2D]" : "bg-[#dff5d7] ring-1 ring-[#2D6A2D]/30",
                      ].join(" ")}
                    />
                    {area.name}
                  </span>
                  <span className="text-[11px] font-semibold text-[#64748b]">{area.eta}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-[#dcebd7] bg-white shadow-xl shadow-[#1f5d28]/8">
            <div className="flex items-center justify-between gap-3 border-b border-[#dcebd7] bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef8e8] text-[#2D6A2D]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-black text-[#102316]">Mapa de Luxembourg</p>
                  <p className="text-xs text-[#64748b]">OpenStreetMap</p>
                </div>
              </div>
              <a
                href="https://www.openstreetmap.org/#map=12/49.6116/6.1319"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#dcebd7] bg-white px-3 py-2 text-xs font-black text-[#2D6A2D] transition hover:bg-[#eef8e8]"
              >
                Abrir
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="relative h-[430px] bg-[#eef8e8]">
              <iframe
                title="Mapa das áreas atendidas Easy Clean em Luxembourg"
                src={openStreetMapUrl}
                className="h-full w-full border-0"
                loading="lazy"
              />
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 rounded-[22px] border border-[#dcebd7] bg-white/92 p-3 text-xs text-[#64748b] shadow-sm backdrop-blur">
                <div className="flex flex-wrap gap-4">
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#2D6A2D]" />
                    Recolha ativa
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#dff5d7] ring-1 ring-[#2D6A2D]/30" />
                    Sob confirmação
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
