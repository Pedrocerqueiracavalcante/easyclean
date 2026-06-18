import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Droplets,
  PackageCheck,
  Shirt,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/language-selector";
import { getServiceBySlug, servicePages } from "@/lib/service-pages";
import { ProductChoiceCards } from "./product-choice-cards";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const serviceIconBySlug = {
  lavagem: Droplets,
  "passagem-a-ferro": Shirt,
  "limpeza-a-seco": Sparkles,
  "roupas-de-cama": BedDouble,
  calcado: PackageCheck,
  "saco-completo": PackageCheck,
};

const orderServiceBySlug: Record<string, string> = {
  lavagem: "wash",
  "passagem-a-ferro": "iron",
  "limpeza-a-seco": "dry",
  "roupas-de-cama": "bed",
  calcado: "shoes",
  "saco-completo": "bag",
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

  const relatedServices = servicePages.filter((item) => item.slug !== service.slug).slice(0, 3);
  const orderHref = `/app/order?service=${orderServiceBySlug[service.slug] ?? "wash"}`;

  return (
    <main className="min-h-screen bg-white text-[#102316]">
      <nav className="sticky top-0 z-40 border-b border-[#dcebd7] bg-white/95 shadow-sm shadow-[#1f5d28]/5 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center rounded-xl bg-white px-2 py-1 ring-1 ring-[#e2ecd8] transition hover:bg-[#fbfdf9]">
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
            <Link
              href="/#servicos"
              className="inline-flex items-center gap-2 rounded-full border border-[#dcebd7] bg-white px-4 py-2 text-sm font-bold text-[#2D6A2D] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#eef8e8]"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden border-b border-[#edf4ea] bg-[#fbfdf9]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-18"
          style={{ backgroundImage: "url('/easyclean-hero-bg.png')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.92)_50%,rgba(238,248,232,0.76)_100%)]" aria-hidden="true" />
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-[#b9d9ad]" aria-hidden="true" />
        <div className="absolute right-16 top-16 h-36 w-36 rounded-full bg-[#eef8e8] blur-2xl" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-[1fr_320px] md:items-center md:py-14">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dcebd7] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#2D6A2D] shadow-sm">
              <Sparkles className="h-4 w-4 text-[#6ABF3C]" />
              Guia Easy Clean
            </div>
            <h1 className="mb-4 max-w-3xl text-4xl font-black leading-[0.98] text-[#102316] md:text-6xl">{service.title}</h1>
            <p className="max-w-xl text-base leading-7 text-[#5f6f63]">{service.subtitle}</p>
          </div>

          <div className="rounded-[24px] border border-[#dcebd7] bg-white p-5 shadow-xl shadow-[#1f5d28]/8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2D6A2D]">Preço base</p>
            <p className="mt-2 text-3xl font-black text-[#102316]">{service.price}</p>
            <Link href={orderHref} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2D6A2D] px-4 py-3 text-sm font-black text-white transition hover:bg-[#245f2f]">
              Fazer pedido
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="hidden">
              O valor final pode variar conforme quantidade, urgência e tipo de peça.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-8 md:grid-cols-[0.82fr_1.18fr] md:py-12">
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-widest text-[#2D6A2D]">Resumo rápido</p>
          <h2 className="mb-3 text-2xl font-black text-[#102316] md:text-3xl">O cuidado certo para cada tecido</h2>
          <p className="max-w-xl text-sm leading-7 text-[#5f6f63]">{service.description}</p>

          <div className="mt-5 rounded-[24px] border border-[#cde5c4] bg-[#f2faee] p-4">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#2D6A2D]">Ideal para</p>
            <p className="text-sm leading-6 text-[#36583a]">{service.bestFor}</p>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {service.highlights.map((item) => (
              <div key={item} className="rounded-2xl border border-[#dcebd7] bg-white px-4 py-3 text-sm font-black text-[#102316] shadow-sm">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href={orderHref}>
              <Button className="w-full sm:w-auto">Fazer pedido</Button>
            </Link>
            <Link href="/#servicos">
              <Button variant="outline" className="w-full bg-white sm:w-auto">
                Ver outros serviços
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[24px] border border-[#dcebd7] bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef8e8] text-[#2D6A2D]">
                <Droplets className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2D6A2D]">Tecidos</p>
                <h3 className="font-black text-[#102316]">Ver rápido</h3>
              </div>
            </div>

            <div className="grid gap-2">
              {service.fabricGuide.map((item) => (
                <div key={item.fabric} className="rounded-2xl border border-[#e2ecd8] bg-[#fbfdf9] p-3 transition hover:border-[#b9d9ad] hover:shadow-sm">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="font-black text-[#102316]">{item.fabric}</h4>
                    <span className="text-xs font-black uppercase tracking-wider text-[#2D6A2D]">{item.product}</span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm leading-5 text-[#66736a]">{item.care}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-[#dcebd7] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2D6A2D]">Produtos</p>
                <h3 className="mt-1 font-black text-[#102316]">Escolhe e pede</h3>
              </div>
              <span className="rounded-full bg-[#eef8e8] px-3 py-1.5 text-xs font-black text-[#2D6A2D]">
                Direto
              </span>
            </div>
            <ProductChoiceCards products={service.products} orderHref={orderHref} />
          </div>

        </div>
      </section>

      <section className="border-t border-[#edf4ea] bg-[#fbfdf9] px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-sm font-black uppercase tracking-widest text-[#2D6A2D]">Outros serviços</p>
              <h2 className="text-2xl font-black text-[#102316] sm:text-3xl">Ver também</h2>
            </div>
            <Link href="/#servicos" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#2D6A2D] ring-1 ring-[#dcebd7] transition hover:bg-[#eef8e8]">
              Todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
            {relatedServices.map((item) => {
              const RelatedIcon = serviceIconBySlug[item.slug] ?? Sparkles;

              return (
                <Link
                  key={item.slug}
                  href={`/servicos/${item.slug}`}
                  className="group min-w-[82%] snap-start rounded-[24px] border border-[#dcebd7] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-[#b9d9ad] hover:shadow-xl hover:shadow-[#1f5d28]/10 sm:min-w-[44%] md:min-w-0"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef8e8] text-[#2D6A2D] transition group-hover:bg-[#2D6A2D] group-hover:text-white">
                      <RelatedIcon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-[#eef8e8] px-3 py-1.5 text-xs font-black text-[#2D6A2D]">{item.price}</span>
                  </div>
                  <h3 className="text-lg font-black text-[#102316]">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#66736a]">{item.subtitle}</p>
                  <div className="mt-4 flex items-center justify-end border-t border-[#edf4ea] pt-3">
                    <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-[#94a3b8] transition group-hover:text-[#2D6A2D]">
                      Abrir
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[34px] border border-[#cde5c4] bg-[#2D6A2D] p-6 text-white shadow-2xl shadow-[#1f5d28]/18 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-[#dff5d7]">Pedido online</p>
            <h2 className="text-3xl font-black leading-tight md:text-4xl">Pronto para agendar a tua recolha?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/78">
              Cria conta, escolhe os serviços e acompanha a recolha até à entrega.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Link href="/register">
              <Button className="w-full bg-white text-[#2D6A2D] hover:bg-[#f2faee] sm:w-auto">
                Criar conta
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="w-full border-white/40 bg-transparent text-white hover:bg-white/10 sm:w-auto">
                Entrar
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
