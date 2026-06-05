"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const [paused, setPaused] = useState(false);

  function scrollServices(direction: "left" | "right") {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const amount = Math.min(360, carousel.clientWidth * 0.85);
    const nextLeft = direction === "left" ? carousel.scrollLeft - amount : carousel.scrollLeft + amount;
    const maxLeft = carousel.scrollWidth - carousel.clientWidth;

    carousel.scrollTo({
      left: direction === "right" && nextLeft >= maxLeft - 8 ? 0 : Math.max(0, nextLeft),
      behavior: "smooth",
    });
  }

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      scrollServices("right");
    }, 3600);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="relative -mx-4 px-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <button
        type="button"
        aria-label="Voltar serviços"
        className="absolute left-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#dbe8d4] bg-white text-[#2d6a2d] shadow-xl shadow-[#2d6a2d]/15 transition-all hover:scale-105 hover:bg-[#eef8e8] md:flex"
        onClick={() => scrollServices("left")}
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      <div
        ref={carouselRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-12"
      >
        {servicePages.map((service) => {
          const Icon = serviceIconBySlug[service.slug];

          return (
            <Link
              key={service.slug}
              href={`/servicos/${service.slug}`}
              className="group relative min-w-[270px] snap-start overflow-hidden rounded-xl border border-[#dbe8d4] bg-white p-6 shadow-md shadow-[#2d6a2d]/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#6abf3c] hover:shadow-xl hover:shadow-[#2d6a2d]/10 sm:min-w-[320px] lg:min-w-[350px]"
            >
              <div className="absolute right-4 top-4 h-16 w-16 rounded-full bg-[#eef8e8] opacity-60 transition-transform duration-300 group-hover:scale-125" aria-hidden="true" />
              <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6abf3c] to-[#2d6a2d] text-white shadow-lg shadow-[#2d6a2d]/20 ring-4 ring-[#eef8e8]">
                <Icon className="h-8 w-8 stroke-[2.4]" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-[#102316]">{service.title}</h3>
              <p className="mb-5 min-h-[48px] text-sm leading-6 text-[#64748b]">{service.subtitle}</p>
              <div className="flex items-center justify-between gap-3 border-t border-[#e2e8df] pt-4">
                <span className="rounded-full bg-[#eef8e8] px-3 py-1.5 text-sm font-bold text-[#2d6a2d]">{service.price}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] transition-colors group-hover:text-[#2d6a2d]">
                  Ver guia
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Avançar serviços"
        className="absolute right-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#dbe8d4] bg-[#2d6a2d] text-white shadow-xl shadow-[#2d6a2d]/20 transition-all hover:scale-105 hover:bg-[#245f2f] md:flex"
        onClick={() => scrollServices("right")}
      >
        <ArrowRight className="h-6 w-6" />
      </button>
    </div>
  );
}
