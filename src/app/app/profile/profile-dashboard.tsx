"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  CalendarPlus,
  ChevronRight,
  CreditCard,
  Globe2,
  Headphones,
  Languages,
  LogOut,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Star,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { signOut, useSession } from "@/lib/auth-client";
import { ProfilePhotoUploader } from "./profile-photo-uploader";

const menuItems = [
  { href: "/app/profile/addresses", icon: MapPin, label: "As minhas moradas", desc: "Casas, apartamentos e pontos de recolha" },
  { href: "/app/subscription", icon: Star, label: "Plano de assinatura", desc: "Mensalidades e beneficios" },
  { href: "/app/profile/notifications", icon: Bell, label: "Notificacoes", desc: "Avisos de recolha e entrega" },
  { href: "/app/profile/language", icon: Languages, label: "Idioma", desc: "Portugues e outras opcoes" },
  { href: "/app/profile/support", icon: Headphones, label: "Suporte", desc: "Fala com a Easy Clean" },
];

const quickActions = [
  { href: "/app/order", icon: CalendarPlus, label: "Novo pedido", desc: "Agendar recolha" },
  { href: "/app/orders", icon: PackageCheck, label: "Acompanhar", desc: "Ver estado" },
  { href: "/app/profile/addresses", icon: MapPin, label: "Moradas", desc: "Editar locais" },
];

type Order = {
  id: string;
};

export function ProfileDashboard() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [orderCount, setOrderCount] = useState(0);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/login");
    }
  }, [isPending, router, session?.user]);

  useEffect(() => {
    if (!session?.user?.id) return;

    fetch(`/api/orders?userId=${encodeURIComponent(session.user.id)}`)
      .then((res) => res.json())
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          setOrderCount((data as Order[]).length);
        }
      })
      .catch(() => setOrderCount(0));
  }, [session?.user?.id]);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    router.replace("/login");
  }

  if (isPending || !session?.user) {
    return (
      <div className="space-y-4">
        <div className="h-36 animate-pulse rounded-[30px] bg-[#e8f5e0]" />
        <div className="grid grid-cols-3 gap-3">
          <div className="h-24 animate-pulse rounded-2xl bg-white" />
          <div className="h-24 animate-pulse rounded-2xl bg-white" />
          <div className="h-24 animate-pulse rounded-2xl bg-white" />
        </div>
      </div>
    );
  }

  const displayName = session.user.name ?? "Cliente Easy Clean";
  const displayEmail = session.user.email ?? "Adiciona os teus dados no registo";
  const hasPhoto = Boolean(session.user.image);

  return (
    <div className="space-y-5">
      <ProfilePhotoUploader name={displayName} email={displayEmail} image={session.user.image} />

      <section className="grid gap-3 sm:grid-cols-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-[22px] border border-[#dce9d7] bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#b9d9ad] hover:shadow-md"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2D6A2D] text-white shadow-lg shadow-[#2d6a2d]/20 transition-transform group-hover:scale-105">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-black text-gray-950">{action.label}</p>
              <p className="mt-1 text-xs text-gray-500">{action.desc}</p>
            </Link>
          );
        })}
      </section>

      <div className="grid grid-cols-3 gap-3">
        {[
          { value: String(orderCount), label: "Pedidos", icon: PackageCheck },
          { value: "0 kg", label: "Lavados", icon: Sparkles },
          { value: "Livre", label: "Plano", icon: Star },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-[#e2e8df] bg-white p-4 text-center shadow-sm">
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef8e8] text-[#2D6A2D]">
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-lg font-black text-[#2D6A2D]">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <section className="rounded-[28px] border border-[#dce9d7] bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black text-gray-950">Resumo da conta</p>
            <p className="text-xs text-gray-500">Dados importantes do teu perfil</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef8e8] text-[#2D6A2D]">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#f8faf7] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">Email</p>
            <p className="mt-1 truncate text-sm font-bold text-gray-900">{displayEmail}</p>
          </div>
          <div className="rounded-2xl bg-[#f8faf7] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">Perfil</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-bold text-gray-900">
              <ShieldCheck className="h-4 w-4 text-[#2D6A2D]" />
              {hasPhoto ? "Foto adicionada" : "Foto pendente"}
            </p>
          </div>
          <div className="rounded-2xl bg-[#f8faf7] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">Pagamento</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-bold text-gray-900">
              <WalletCards className="h-4 w-4 text-[#2D6A2D]" />
              Cartao pronto para pedidos
            </p>
          </div>
          <div className="rounded-2xl bg-[#f8faf7] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">Seguranca</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-bold text-gray-900">
              <CreditCard className="h-4 w-4 text-[#2D6A2D]" />
              Conta protegida
            </p>
          </div>
        </div>
      </section>

      <Card className="overflow-hidden border-[#dce9d7] shadow-sm">
        <CardContent className="p-0">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-[#f8faf7] ${index < menuItems.length - 1 ? "border-b border-[#e2e8df]" : ""}`}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef8e8] text-[#2D6A2D] transition-colors group-hover:bg-[#2D6A2D] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-gray-900">{item.label}</p>
                    <p className="truncate text-xs text-gray-400">{item.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#2D6A2D]" />
                </div>
              </Link>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/app/profile/language">
          <Button variant="outline" className="w-full">
            <Globe2 className="h-4 w-4" />
            Alterar idioma
          </Button>
        </Link>
        <Button
          type="button"
          variant="outline"
          className="w-full border-red-200 text-red-500 hover:bg-red-50"
          loading={signingOut}
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          Terminar sessao
        </Button>
      </div>

      <p className="text-center text-xs text-gray-400">Easy Clean v1.0 · Luxembourg</p>
    </div>
  );
}
