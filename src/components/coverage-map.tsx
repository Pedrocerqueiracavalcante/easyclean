"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, MapPin, Navigation, Search, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const areas = [
  { name: "Luxembourg Ville", eta: "Hoje ou amanhã", x: "50%", y: "43%", status: "active" },
  { name: "Kirchberg", eta: "Hoje ou amanhã", x: "59%", y: "34%", status: "active" },
  { name: "Limpertsberg", eta: "Hoje ou amanhã", x: "47%", y: "32%", status: "active" },
  { name: "Belair", eta: "Hoje ou amanhã", x: "39%", y: "45%", status: "active" },
  { name: "Gasperich", eta: "24h a 48h", x: "53%", y: "61%", status: "active" },
  { name: "Bonnevoie", eta: "24h a 48h", x: "60%", y: "53%", status: "active" },
  { name: "Hollerich", eta: "24h a 48h", x: "42%", y: "56%", status: "active" },
  { name: "Strassen", eta: "Sob confirmação", x: "30%", y: "38%", status: "confirm" },
  { name: "Bertrange", eta: "Sob confirmação", x: "25%", y: "51%", status: "confirm" },
  { name: "Hesperange", eta: "Sob confirmação", x: "62%", y: "70%", status: "confirm" },
] as const;

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
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-[#2D6A2D]">Mapa inteligente</p>
            <h2 className="text-3xl font-black leading-tight text-[#102316] md:text-4xl">
              Veja se recolhemos na tua zona
            </h2>
          </div>
          <p className="text-base leading-7 text-[#64748b]">
            Um sistema simples para o cliente confirmar cobertura antes de criar conta. As zonas podem ser ajustadas conforme a operação crescer.
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
                      Ainda não temos essa zona na lista. Confirma pelo WhatsApp antes de agendar.
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
          </div>

          <div className="relative min-h-[430px] overflow-hidden rounded-[32px] border border-[#dcebd7] bg-white p-5 shadow-xl shadow-[#1f5d28]/8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(106,191,60,0.18),transparent_18rem),linear-gradient(135deg,#ffffff_0%,#f2faee_100%)]" />
            <div className="absolute left-8 top-8 rounded-full border border-[#dcebd7] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#2D6A2D] shadow-sm">
              Luxembourg
            </div>

            <div className="relative h-full min-h-[390px] rounded-[26px] border border-[#e2ecd8] bg-white/65">
              <div className="absolute left-[18%] top-[18%] h-[62%] w-[64%] rounded-[45%] border-2 border-dashed border-[#b9d9ad] bg-[#f7fbf4]/80" />
              <div className="absolute left-[28%] top-[25%] h-[46%] w-[46%] rounded-[42%] border border-[#dcebd7] bg-white/60" />
              <div className="absolute left-[39%] top-[34%] h-[28%] w-[26%] rounded-[40%] bg-[#eef8e8]" />

              {areas.map((area) => (
                <div
                  key={area.name}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: area.x, top: area.y }}
                >
                  <div
                    className={[
                      "flex h-10 w-10 items-center justify-center rounded-full border-4 border-white shadow-lg transition group-hover:scale-110",
                      area.status === "active" ? "bg-[#2D6A2D] text-white" : "bg-[#dff5d7] text-[#2D6A2D]",
                    ].join(" ")}
                  >
                    {area.status === "active" ? <Truck className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                  </div>
                  <div className="pointer-events-none absolute left-1/2 top-12 hidden w-40 -translate-x-1/2 rounded-2xl border border-[#dcebd7] bg-white p-3 text-center shadow-xl group-hover:block">
                    <p className="text-xs font-black text-[#102316]">{area.name}</p>
                    <p className="mt-1 text-[11px] text-[#64748b]">{area.eta}</p>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-4 left-4 right-4 grid gap-2 rounded-[22px] border border-[#dcebd7] bg-white/90 p-3 text-xs text-[#64748b] shadow-sm sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#2D6A2D]" />
                  Recolha ativa
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#dff5d7] ring-1 ring-[#2D6A2D]/30" />
                  Sob confirmação
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
