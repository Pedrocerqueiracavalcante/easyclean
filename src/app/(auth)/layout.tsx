import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Clock, Home, ShieldCheck } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7faf5]">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="relative hidden overflow-hidden bg-[#173f20] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(181,255,120,0.22),transparent_34%),linear-gradient(145deg,#173f20_0%,#2D6A2D_58%,#63b83b_100%)]" />
          <div className="absolute -right-16 top-16 h-56 w-56 rounded-full border border-white/15" />
          <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <Link href="/" className="inline-flex w-fit items-center rounded-2xl bg-white px-4 py-3 shadow-lg shadow-black/10">
              <Image
                src="/easyclean-logo.png"
                alt="Easy Clean"
                width={150}
                height={54}
                priority
                className="h-10 w-auto object-contain"
              />
            </Link>

            <div className="mt-20 max-w-md">
              <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#dff5d7]">
                Lavandaria ao domicílio
              </p>
              <h1 className="text-5xl font-black leading-[1.02] tracking-tight">
                A tua roupa cuidada sem sair de casa.
              </h1>
              <p className="mt-5 text-base leading-7 text-white/78">
                Agenda recolha, acompanha o pedido e recebe tudo pronto com uma experiência simples e organizada.
              </p>
            </div>
          </div>

          <div className="relative grid gap-3">
            {[
              { icon: Home, text: "Recolha e entrega em casa" },
              { icon: Clock, text: "Pedidos acompanhados em tempo real" },
              { icon: ShieldCheck, text: "Conta segura para clientes" },
              { icon: CheckCircle2, text: "Processo claro do início ao fim" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-center gap-3 rounded-2xl bg-white/12 px-4 py-3 text-sm font-semibold text-white backdrop-blur">
                  <Icon className="h-5 w-5 text-[#c8ff8a]" />
                  {item.text}
                </div>
              );
            })}
          </div>
        </aside>

        <main className="flex min-h-screen flex-col">
          <div className="flex items-center justify-between p-5 lg:hidden">
            <Link href="/" className="inline-flex w-fit items-center rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-[#dbe8d4]">
              <Image
                src="/easyclean-logo.png"
                alt="Easy Clean"
                width={150}
                height={54}
                priority
                className="h-9 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center px-4 py-8 lg:px-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
