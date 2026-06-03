import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Droplets,
  Leaf,
  PackageCheck,
  Shirt,
  Sparkles,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { LanguageSelector } from "@/components/language-selector";
import { servicePages } from "@/lib/service-pages";

const services = [
  { icon: Droplets, name: "Lavagem", desc: "Lavagem a fundo com detergentes premium", price: "€4/kg" },
  { icon: Shirt, name: "Passagem a Ferro", desc: "Roupa sem vincos, pronta a usar", price: "€2/peça" },
  { icon: Shirt, name: "Limpeza a Seco", desc: "Para peças delicadas e fatos", price: "€8/peça" },
  { icon: Sparkles, name: "Roupas de Cama", desc: "Lençóis e edredons frescos", price: "€6/peça" },
  { icon: PackageCheck, name: "Calçado", desc: "Limpeza e tratamento de sapatos", price: "€5/par" },
  { icon: Leaf, name: "Saco Completo", desc: "Enchimento máximo, preço fixo", price: "€29/saco" },
];

const steps = [
  { n: "01", title: "Agenda Online", desc: "Escolhe os serviços e o horário de recolha na app ou website.", icon: CalendarDays },
  { n: "02", title: "Recolha em Casa", desc: "Os nossos motoristas vão à tua porta buscar a roupa.", icon: Truck },
  { n: "03", title: "Lavagem Profissional", desc: "A tua roupa é tratada com cuidado na nossa base central.", icon: Droplets },
  { n: "04", title: "Entrega na Porta", desc: "Devolvemos tudo dobrado, passado e perfumado.", icon: PackageCheck },
];

const plans = [
  {
    name: "Basic", price: 39, popular: false,
    features: ["10 kg/mês", "2 recolhas/mês", "App & Website", "Suporte por email"],
  },
  {
    name: "Pro", price: 69, popular: true,
    features: ["20 kg/mês", "4 recolhas/mês", "Saco Easy Clean incluído", "Suporte prioritário", "Kg extra com desconto"],
  },
  {
    name: "Enterprise", price: 119, popular: false,
    features: ["40 kg/mês", "8 recolhas/mês", "Saco Premium incluído", "Conta empresarial", "Relatórios mensais", "Gestor dedicado"],
  },
];

const faqs = [
  {
    question: "Como funciona a recolha?",
    answer: "O cliente agenda a recolha, a equipa vai à morada indicada, recolhe a roupa e leva para tratamento na base.",
  },
  {
    question: "Quanto tempo demora a entrega?",
    answer: "O prazo pode ser ajustado conforme a quantidade e o tipo de serviço. Deixe este texto pronto para definir o prazo real da empresa.",
  },
  {
    question: "Que tipos de roupa podem ser enviados?",
    answer: "Roupa do dia a dia, camisas, peças delicadas, roupas de cama, calçado e sacos completos, conforme os serviços disponíveis.",
  },
  {
    question: "Como o cliente paga?",
    answer: "Pode manter pagamento online, assinatura mensal ou pagamento por encomenda. Ajuste este texto conforme a operação real.",
  },
];

const serviceGallery = [
  { title: "Lavagem semanal", text: "Ideal para roupas do dia a dia e rotina familiar.", icon: Droplets },
  { title: "Camisas e trabalho", text: "Acabamento cuidado para peças sociais.", icon: Shirt },
  { title: "Cama e banho", text: "Lençóis, toalhas e peças maiores tratadas com cuidado.", icon: Sparkles },
  { title: "Recolha ao domicílio", text: "A equipa recolhe e devolve na morada combinada.", icon: Truck },
];

const serviceIconBySlug = {
  lavagem: Droplets,
  "passagem-a-ferro": Shirt,
  "limpeza-a-seco": Shirt,
  "roupas-de-cama": Sparkles,
  calcado: PackageCheck,
  "saco-completo": Leaf,
};

const servedAreas = [
  "Luxembourg City",
  "Esch-sur-Alzette",
  "Differdange",
  "Dudelange",
  "Strassen",
  "Bertrange",
];

const testimonials = [
  {
    name: "Cliente 1",
    detail: "Adicionar zona",
    text: "Adicionar avaliação real do cliente sobre recolha, lavagem e entrega.",
  },
  {
    name: "Cliente 2",
    detail: "Adicionar zona",
    text: "Adicionar comentário sobre rapidez, cuidado com a roupa e atendimento.",
  },
  {
    name: "Cliente 3",
    detail: "Adicionar zona",
    text: "Adicionar testemunho de cliente recorrente ou empresa parceira.",
  },
];

const socialLinks = [
  { label: "Instagram", href: "#", image: "/instagram-oficial.png" },
  { label: "Facebook", href: "#", image: "/facebook-oficial.png" },
  { label: "LinkedIn", href: "#", image: "/social-linkedin.png" },
];

const contactInfo = {
  location: "Luxembourg",
  email: "Adicionar email",
  phone: "Adicionar telefone",
  hours: "Segunda a sábado · 08h às 19h",
  whatsappNumber: "",
  whatsappMessage: "Olá, gostaria de agendar uma recolha com a Easy Clean.",
};

export default function LandingPage() {
  const whatsappUrl = contactInfo.whatsappNumber
    ? `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(contactInfo.whatsappMessage)}`
    : "#contacto";

  return (
    <div className="min-h-screen bg-white">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a Easy Clean pelo WhatsApp"
        className="fixed bottom-5 right-5 z-[60] flex h-16 w-16 items-center justify-center rounded-full bg-[#38b952] p-2 shadow-2xl shadow-black/30 ring-4 ring-white transition-transform hover:scale-105 md:bottom-8 md:right-8"
      >
        <Image src="/whatsapp-clean.png" alt="" width={64} height={64} className="h-full w-full rounded-full object-cover" />
      </a>

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#071108]/95 text-white shadow-2xl shadow-black/20 backdrop-blur">
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
          <div className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#como-funciona" className="inline-flex items-center gap-1 text-white/82 transition-colors hover:text-[#b9f25a]">
              Como Funciona <ChevronDown className="h-3.5 w-3.5" />
            </a>
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1 text-white/82 transition-colors marker:hidden hover:text-[#b9f25a] [&::-webkit-details-marker]:hidden">
                Serviços <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="absolute left-0 top-full z-50 mt-4 w-72 overflow-hidden rounded-lg border border-[#dbe8d4] bg-white text-[#2d6a2d] opacity-0 shadow-2xl transition-all group-open:opacity-100">
                <div className="bg-[#2d6a2d] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white">
                  Nossos Serviços
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
            <a href="#planos" className="text-white/82 transition-colors hover:text-[#b9f25a]">Planos</a>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <LanguageSelector />
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-transform hover:scale-105"
              >
                <Image
                  src={social.image}
                  alt=""
                  width={36}
                  height={36}
                  className="h-8 w-8 rounded-full object-contain"
                />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSelector />
            <Link href="/login"><Button variant="ghost" size="sm">Entrar</Button></Link>
            <Link href="/register"><Button size="sm">Começar</Button></Link>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#050806] text-white">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center grayscale"
          style={{ backgroundImage: "url('/easyclean-hero-bg.png')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(185,242,90,0.2),transparent_24rem),linear-gradient(90deg,rgba(5,8,6,0.96)_0%,rgba(5,8,6,0.82)_48%,rgba(5,8,6,0.45)_100%)]" aria-hidden="true" />
        <div className="hero-scan absolute inset-0 opacity-55" aria-hidden="true" />
        <div className="hero-glow absolute -bottom-32 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-[#b9f25a]/28 blur-3xl" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />

        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center px-4 py-16 md:grid-cols-[1fr_430px] md:gap-14">
          <div className="hero-reveal max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#b9f25a]/25 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white/82 backdrop-blur">
              <Sparkles className="h-4 w-4 text-[#b9f25a]" />
              Lavandaria ao domicílio em {contactInfo.location}
            </div>
            <h1 className="mb-6 max-w-3xl text-5xl font-black leading-[0.92] text-white md:text-7xl">
              Roupa limpa.
              <span className="block font-serif italic text-[#b9f25a]">Recolhida.</span>
              Entregue.
            </h1>
            <p className="mb-8 max-w-xl text-base leading-7 text-white/72 md:text-lg">
              Lavagem, passagem e entrega ao domicílio com um processo simples, rápido e profissional.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="w-full border border-[#b9f25a]/40 bg-[#b9f25a] text-[#071108] shadow-[0_0_34px_rgba(185,242,90,0.28)] hover:bg-[#a8e64d] sm:w-auto">
                  Agendar Recolha
                </Button>
              </Link>
              <a href={whatsappUrl} target={contactInfo.whatsappNumber ? "_blank" : undefined} rel={contactInfo.whatsappNumber ? "noopener noreferrer" : undefined}>
                <Button size="lg" className="w-full border border-white/16 bg-white/10 text-white backdrop-blur hover:bg-white/18 sm:w-auto">
                  Agendar pelo WhatsApp
                </Button>
              </a>
              <a href="#servicos">
                <Button variant="outline" size="lg" className="w-full border-white/22 bg-transparent text-white hover:bg-white/12 sm:w-auto">
                  Ver serviços
                </Button>
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-5 border-t border-white/10 pt-6 text-xs font-bold uppercase tracking-[0.18em] text-white/58">
              <span><strong className="text-[#b9f25a]">01</strong> Agenda</span>
              <span><strong className="text-[#b9f25a]">02</strong> Recolha</span>
              <span><strong className="text-[#b9f25a]">03</strong> Entrega</span>
            </div>
          </div>

          <div className="hero-float relative mt-12 rounded-lg border border-white/12 bg-[#081109]/72 p-4 shadow-2xl shadow-black/45 backdrop-blur-xl md:mt-0">
            <div className="absolute -inset-8 -z-10 rounded-full border border-[#b9f25a]/18 opacity-70" />
            <div className="absolute -inset-16 -z-10 rounded-full border border-white/8 opacity-50" />
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-[0.28em] text-[#b9f25a]">Serviços</span>
              <Droplets className="h-6 w-6 text-[#b9f25a]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {services.slice(0, 4).map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.name} className="group rounded-lg border border-white/10 bg-white/[0.07] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#b9f25a]/40 hover:bg-[#b9f25a]/10">
                    <Icon className="mb-3 h-6 w-6 text-[#b9f25a]" />
                    <p className="text-sm font-bold">{service.name}</p>
                    <p className="mt-1 text-xs text-white/55">{service.price}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="relative overflow-hidden bg-[#050806] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(185,242,90,0.12),transparent_26rem)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Como Funciona?</h2>
          <p className="mx-auto max-w-lg text-white/58">Em apenas 4 passos tens a roupa lavada e entregue em casa.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.n} className="rounded-lg border border-white/10 bg-white/[0.06] p-5 text-center backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#b9f25a]/40 hover:bg-[#b9f25a]/10">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg border border-[#b9f25a]/30 bg-[#b9f25a]/10 text-[#b9f25a]">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="text-xs font-bold tracking-widest text-[#b9f25a]">{step.n}</span>
                <h3 className="mb-2 mt-1 font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-white/56">{step.desc}</p>
              </div>
            );
          })}
        </div>
        </div>
      </section>

      <section id="servicos" className="relative overflow-hidden bg-[#071108] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(185,242,90,0.14),transparent_28rem),radial-gradient(circle_at_85%_30%,rgba(45,106,45,0.24),transparent_24rem)]" />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#b9f25a]">Lavagem</p>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Serviços de lavandaria</h2>
            <p className="text-white/58">Escolha o cuidado ideal para cada tipo de roupa.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {servicePages.map((s) => {
              const Icon = serviceIconBySlug[s.slug];
              return (
                <Link key={s.slug} href={`/servicos/${s.slug}`} className="group rounded-lg border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#b9f25a]/40 hover:bg-[#b9f25a]/10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#b9f25a]/12 text-[#b9f25a]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 font-semibold text-white">{s.title}</h3>
                  <p className="mb-4 text-sm text-white/56">{s.subtitle}</p>
                  <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <span className="text-sm font-bold text-[#b9f25a]">{s.price}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/42 transition-colors group-hover:text-[#b9f25a]">
                      Ver guia
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="galeria-servicos" className="bg-[#050806] py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#b9f25a]">Galeria de serviços</p>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Serviços mais pedidos</h2>
            <p className="text-white/58">Pedidos comuns, organizados de forma simples.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {serviceGallery.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#b9f25a]/40">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-[#b9f25a]/12 text-[#b9f25a]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/56">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="areas" className="bg-[#050806] py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#b9f25a]">Áreas atendidas</p>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Verifique se recolhemos na sua zona</h2>
              <p className="text-white/58">
                Atendimento em Luxembourg e regiões próximas.
              </p>
            </div>
            <a href={whatsappUrl} target={contactInfo.whatsappNumber ? "_blank" : undefined} rel={contactInfo.whatsappNumber ? "noopener noreferrer" : undefined}>
              <Button className="bg-[#b9f25a] text-[#071108] hover:bg-[#a8e64d]">Confirmar pelo WhatsApp</Button>
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {servedAreas.map((area) => (
              <div key={area} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                <Truck className="h-5 w-5 text-[#b9f25a]" />
                <span className="text-sm font-semibold text-white/72">{area}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-white/50">
            Não encontrou a sua zona? Fale connosco para confirmar disponibilidade.
          </p>
        </div>
      </section>

      <section id="planos" className="bg-[#071108] py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Planos Mensais</h2>
          <p className="text-white/58">Poupa com assinatura. Cancela quando quiseres.</p>
        </div>
        <div className="grid items-start gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative flex flex-col rounded-lg border p-8 backdrop-blur transition-all duration-300 hover:-translate-y-1 ${plan.popular ? "border-[#b9f25a]/50 bg-[#b9f25a]/12 text-white shadow-2xl shadow-[#b9f25a]/10 md:scale-105" : "border-white/10 bg-white/[0.06]"}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-[#b9f25a] px-4 py-1.5 text-xs font-bold text-[#071108]">MAIS POPULAR</span>
                </div>
              )}
              <h3 className="mb-2 text-xl font-bold text-white">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#b9f25a]">€{plan.price}</span>
                <span className="ml-1 text-sm text-white/45">/mês</span>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/66">
                    <Check className="h-4 w-4 text-[#b9f25a]" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/register">
                <Button className="w-full" variant={plan.popular ? "secondary" : "outline"}>
                  Escolher {plan.name}
                </Button>
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-white/45">
          Preferes pagar por encomenda?{" "}
          <Link href="/register" className="font-medium text-[#b9f25a] underline">Sem problema.</Link>
        </p>
        </div>
      </section>

      <section id="avaliacoes" className="bg-[#050806] py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#b9f25a]">Avaliações</p>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">O que os clientes dizem</h2>
            <p className="mx-auto max-w-2xl text-white/58">
              Comentários curtos para mostrar confiança no serviço.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-lg border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
                <div className="mb-4 flex gap-1 text-[#b9f25a]" aria-hidden="true">
                  {"★★★★★"}
                </div>
                <p className="mb-6 text-sm leading-6 text-white/58">{testimonial.text}</p>
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#b9f25a]">{testimonial.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#071108] py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#b9f25a]">FAQ</p>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Dúvidas frequentes</h2>
            <p className="text-white/58">
              Respostas rápidas para ajudar o cliente a entender a recolha, lavagem, entrega e pagamento antes de agendar.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((item) => (
              <div key={item.question} className="rounded-lg border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
                <h3 className="mb-3 font-bold text-[#b9f25a]">{item.question}</h3>
                <p className="text-sm leading-6 text-white/58">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="relative overflow-hidden bg-[#050806] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(185,242,90,0.14),transparent_28rem)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-8">
            <div className="mb-8 text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#b9f25a]">Contacto</p>
              <h2 className="text-3xl font-bold md:text-4xl">Entre em contacto connosco</h2>
            </div>
            <ContactForm
              email={contactInfo.email}
              whatsappNumber={contactInfo.whatsappNumber}
              whatsappMessage={contactInfo.whatsappMessage}
            />
          </div>
        </div>
      </section>

      <footer className="bg-[#030604] py-12 text-white/48">
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
            <p className="text-sm">Lavandaria ao domicílio em Luxembourg. Recolha, tratamento e entrega com cuidado.</p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-white">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#como-funciona" className="transition-colors hover:text-white">Como funciona</a></li>
              <li><a href="#areas" className="transition-colors hover:text-white">Áreas atendidas</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-white">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#faq" className="transition-colors hover:text-white">FAQ</a></li>
              <li><a href="#contacto" className="transition-colors hover:text-white">Contacto</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Privacidade</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-white">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>{contactInfo.email}</li>
              <li>{contactInfo.phone}</li>
              <li>{contactInfo.location}</li>
              <li>{contactInfo.hours}</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-8 text-center text-xs">
          © {new Date().getFullYear()} Easy Clean. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
