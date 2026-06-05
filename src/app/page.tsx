import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  ChevronDown,
  Droplets,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/language-selector";
import { MobileInstallPrompt } from "@/components/mobile-install-prompt";
import { ServicesCarousel } from "@/components/services-carousel";
import { servicePages } from "@/lib/service-pages";

const steps = [
  { n: "01", title: "Cria conta", desc: "Guarda os teus dados.", icon: CalendarDays },
  { n: "02", title: "Agenda", desc: "Escolhe dia e horário.", icon: Truck },
  { n: "03", title: "Lavamos", desc: "Tratamos a roupa.", icon: Droplets },
  { n: "04", title: "Entregamos", desc: "Tudo pronto em casa.", icon: PackageCheck },
];

const contactInfo = {
  location: "Luxembourg",
  email: "Adicionar email",
  phone: "Adicionar telefone",
  hours: "Segunda a sábado · 08h às 19h",
  whatsappNumber: "",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#102316]">
      <nav className="sticky top-0 z-50 border-b border-[#e2e8df] bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/easyclean-logo.png"
              alt="Easy Clean"
              width={236}
              height={84}
              priority
              className="h-11 w-auto object-contain"
            />
          </Link>

          <div className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#como-funciona" className="inline-flex items-center gap-1 text-[#245f2f] transition-colors hover:text-[#6abf3c]">
              Como funciona <ChevronDown className="h-3.5 w-3.5" />
            </a>
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1 text-[#245f2f] transition-colors marker:hidden hover:text-[#6abf3c] [&::-webkit-details-marker]:hidden">
                Serviços <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="absolute left-0 top-full z-50 mt-4 w-72 overflow-hidden rounded-lg border border-[#dbe8d4] bg-white text-[#2d6a2d] opacity-0 shadow-2xl transition-all group-open:opacity-100">
                <div className="bg-[#2d6a2d] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white">
                  Nossos serviços
                </div>
                <div className="divide-y divide-[#e8f5e0]">
                  {servicePages.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/servicos/${service.slug}`}
                      className="block px-5 py-3 text-sm font-semibold transition-colors hover:bg-[#e8f5e0] hover:text-[#1f5d28]"
                    >
                      {service.menuTitle}
                    </Link>
                  ))}
                </div>
              </div>
            </details>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="text-[#245f2f] hover:bg-[#eef8e8]">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-[#2d6a2d] text-white hover:bg-[#245f2f]">
                Criar conta
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/easyclean-hero-bg.png')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/42" aria-hidden="true" />
        <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.84)_43%,rgba(255,255,255,0.28)_100%)]" aria-hidden="true" />

        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center px-4 py-16 md:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-5xl font-black leading-[0.95] tracking-tight text-[#102316] md:text-7xl">
              Roupa limpa,
              <span className="block text-[#2d6a2d]">sem perder tempo.</span>
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-8 text-[#475569]">
              Cria a tua conta, agenda a recolha e acompanha tudo pelo app da Easy Clean.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="w-full bg-[#2d6a2d] px-8 text-white shadow-lg shadow-[#2d6a2d]/20 hover:bg-[#245f2f] sm:w-auto">
                  Criar conta agora
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full border-[#2d6a2d] bg-white text-[#2d6a2d] hover:bg-[#eef8e8] sm:w-auto">
                  Já tenho conta
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-[#475569]">
              <span className="rounded-full bg-white/90 px-4 py-2 shadow-sm ring-1 ring-[#dbe8d4]">Recolha em casa</span>
              <span className="rounded-full bg-white/90 px-4 py-2 shadow-sm ring-1 ring-[#dbe8d4]">Serviços por pedido</span>
              <span className="rounded-full bg-white/90 px-4 py-2 shadow-sm ring-1 ring-[#dbe8d4]">Acompanhamento online</span>
            </div>

            <MobileInstallPrompt />
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-[#f7fbf4] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#102316] md:text-4xl">Como funciona?</h2>
            <p className="mx-auto max-w-lg text-[#64748b]">
              Um processo simples para o cliente entender rápido e começar pelo cadastro.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.n} className="rounded-lg border border-[#dbe8d4] bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6abf3c] hover:shadow-lg hover:shadow-[#2d6a2d]/10">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6abf3c] to-[#2d6a2d] text-white shadow-lg shadow-[#2d6a2d]/20 ring-4 ring-[#eef8e8]">
                    <Icon className="h-8 w-8 stroke-[2.4]" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-[#6abf3c]">{step.n}</span>
                  <h3 className="mb-2 mt-1 font-semibold text-[#102316]">{step.title}</h3>
                  <p className="text-sm leading-6 text-[#64748b]">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="servicos" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#2d6a2d]">Serviços</p>
            <h2 className="mb-4 text-3xl font-bold text-[#102316] md:text-4xl">Serviços de lavandaria</h2>
            <p className="mx-auto max-w-xl text-[#64748b]">
              O cliente pode conhecer os serviços aqui e depois entrar ou criar conta para fazer o pedido.
            </p>
          </div>

          <ServicesCarousel />

          <div className="mt-12 text-center">
            <Link href="/register">
              <Button size="lg" className="bg-[#2d6a2d] px-8 text-white hover:bg-[#245f2f]">
                Criar conta para pedir
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer id="contacto" className="bg-[#071108] py-12 text-white/56">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-4">
          <div>
            <div className="mb-4 inline-flex rounded bg-white p-2">
              <Image
                src="/easyclean-logo.png"
                alt="Easy Clean"
                width={190}
                height={68}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-sm">Recolha, tratamento e entrega com cuidado.</p>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#como-funciona" className="transition-colors hover:text-white">Como funciona</a></li>
              <li><a href="#servicos" className="transition-colors hover:text-white">Serviços</a></li>
              <li><Link href="/register" className="transition-colors hover:text-white">Criar conta</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="transition-colors hover:text-white">Entrar</Link></li>
              <li><Link href="/register" className="transition-colors hover:text-white">Registar</Link></li>
              <li><a href="#" className="transition-colors hover:text-white">Privacidade</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#b9f25a]" />
                <span>{contactInfo.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#b9f25a]" />
                <span>{contactInfo.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#b9f25a]" />
                <span>{contactInfo.location}</span>
              </li>
              <li>{contactInfo.hours}</li>
            </ul>
            <a
              href={
                contactInfo.whatsappNumber
                  ? `https://wa.me/${contactInfo.whatsappNumber}`
                  : "#contacto"
              }
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-8 text-center text-xs">
          © {new Date().getFullYear()} Easy Clean. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
