import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Droplets, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/language-selector";
import { getServiceBySlug, servicePages } from "@/lib/service-pages";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return servicePages.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050806] text-white">
      <nav className="border-b border-white/10 bg-[#071108]/95 shadow-2xl shadow-black/20 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center rounded bg-white px-2 py-1">
            <Image
              src="/easyclean-logo.png"
              alt="Easy Clean"
              width={236}
              height={84}
              priority
              className="h-11 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link href="/#servicos" className="inline-flex items-center gap-2 text-sm font-bold text-white/72 transition-colors hover:text-[#b9f25a]">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center grayscale"
          style={{ backgroundImage: "url('/easyclean-hero-bg.png')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_38%,rgba(185,242,90,0.18),transparent_25rem),linear-gradient(90deg,rgba(5,8,6,0.96)_0%,rgba(5,8,6,0.84)_55%,rgba(5,8,6,0.58)_100%)]" aria-hidden="true" />
        <div className="hero-scan absolute inset-0 opacity-35" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1fr_360px] md:items-center">
          <div className="hero-reveal">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b9f25a]/25 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white/82 backdrop-blur">
              <Sparkles className="h-4 w-4 text-[#b9f25a]" />
              Guia Easy Clean
            </div>
            <h1 className="mb-5 text-5xl font-black leading-[0.92] md:text-7xl">{service.title}</h1>
            <p className="max-w-2xl text-lg leading-8 text-white/72">{service.subtitle}</p>
          </div>

          <div className="hero-float rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#b9f25a]">Preço base</p>
            <p className="mt-3 text-3xl font-bold">{service.price}</p>
            <p className="mt-4 text-sm leading-6 text-white/58">
              O valor final pode variar conforme quantidade, urgência e tipo de peça.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#b9f25a]">Detalhes do serviço</p>
          <h2 className="mb-5 text-3xl font-bold md:text-4xl">O cuidado certo para cada tecido</h2>
          <p className="text-base leading-8 text-white/62">{service.description}</p>

          <div className="mt-6 rounded-lg border border-[#b9f25a]/20 bg-[#b9f25a]/10 p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#b9f25a]">Para que serve</p>
            <p className="text-sm leading-6 text-white/72">{service.bestFor}</p>
          </div>

          <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
            <h3 className="mb-4 font-bold text-white">Inclui</h3>
            <ul className="space-y-3">
              {service.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-white/62">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#b9f25a]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
            <h3 className="mb-4 font-bold text-white">Como tratamos</h3>
            <div className="grid gap-3">
              {service.process.map((step, index) => (
                <div key={step} className="flex gap-3 rounded-lg border border-white/10 bg-[#050806]/70 p-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#b9f25a] text-xs font-bold text-[#071108]">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm text-white/64">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#contacto">
              <Button className="w-full bg-[#b9f25a] text-[#071108] hover:bg-[#a8e64d] sm:w-auto">Pedir orçamento</Button>
            </Link>
            <Link href="/#servicos">
              <Button variant="outline" className="w-full border-white/20 bg-transparent text-white hover:bg-white/10 sm:w-auto">
                Ver outros serviços
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#b9f25a]/12 text-[#b9f25a]">
                <Droplets className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b9f25a]">Tecidos</p>
                <h3 className="font-bold text-white">Material, cuidado e produto indicado</h3>
              </div>
            </div>

            <div className="grid gap-3">
              {service.fabricGuide.map((item) => (
                <div key={item.fabric} className="rounded-lg border border-white/10 bg-[#050806]/70 p-4">
                  <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="font-bold text-white">{item.fabric}</h4>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#b9f25a]">{item.product}</span>
                  </div>
                  <p className="text-sm leading-6 text-white/58">{item.care}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#b9f25a]">Produtos usados</p>
            <div className="flex flex-wrap gap-2">
              {service.products.map((product) => (
                <span key={product} className="rounded-full border border-white/10 bg-[#050806]/70 px-3 py-1 text-xs font-semibold text-white/68">
                  {product}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#b9f25a]">O que evitar</p>
            <ul className="space-y-3">
              {service.avoid.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-white/62">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#b9f25a]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-[#b9f25a]/20 bg-[#b9f25a]/10 p-5">
            <p className="text-sm leading-6 text-white/74">
              Antes de tratar a peça, avaliamos tecido, cor e instruções da etiqueta para escolher o processo mais seguro.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
