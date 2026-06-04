"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, Droplets, Leaf, PackageCheck, Shirt, Sparkles } from "lucide-react";
import { servicePages } from "@/lib/service-pages";

const serviceIconBySlug = {
  lavagem: Droplets,
  "passagem-a-ferro": Shirt,
  "limpeza-a-seco": Shirt,
  "roupas-de-cama": Sparkles,
  calcado: PackageCheck,
  "saco-completo": Leaf,
};

export function ServicesCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollServices(direction: "left" | "right") {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      <div className="mb-5 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Voltar serviços"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dbe8d4] bg-white text-[#2d6a2d] shadow-sm transition-colors hover:bg-[#eef8e8]"
          onClick={() => scrollServices("left")}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Avançar serviços"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dbe8d4] bg-[#2d6a2d] text-white shadow-sm transition-colors hover:bg-[#245f2f]"
          onClick={() => scrollServices("right")}
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={carouselRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {servicePages.map((service) => {
          const Icon = serviceIconBySlug[service.slug];

          return (
            <Link
              key={service.slug}
              href={`/servicos/${service.slug}`}
              className="group relative min-w-[260px] snap-start overflow-hidden rounded-lg border border-[#dbe8d4] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6abf3c] hover:shadow-lg hover:shadow-[#2d6a2d]/10 sm:min-w-[310px] lg:min-w-[340px]"
            >
              <div className="absolute right-4 top-4 h-16 w-16 rounded-full bg-[#eef8e8] opacity-60 transition-transform duration-300 group-hover:scale-125" aria-hidden="true" />
              <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6abf3c] to-[#2d6a2d] text-white shadow-lg shadow-[#2d6a2d]/20 ring-4 ring-[#eef8e8]">
                <Icon className="h-8 w-8 stroke-[2.4]" />
              </div>
              <h3 className="mb-2 font-semibold text-[#102316]">{service.title}</h3>
              <p className="mb-4 min-h-[72px] text-sm leading-6 text-[#64748b]">{service.subtitle}</p>
              <div className="flex items-center justify-between gap-3 border-t border-[#e2e8df] pt-4">
                <span className="text-sm font-bold text-[#2d6a2d]">{service.price}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] transition-colors group-hover:text-[#2d6a2d]">
                  Ver guia
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
