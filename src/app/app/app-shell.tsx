"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { Bell, CalendarPlus, Home, Package, Sparkles, Star, User } from "lucide-react";
import { LanguageSelector } from "@/components/language-selector";

const navItems = [
  { href: "/app/home", icon: Home, label: "Início" },
  { href: "/app/order", icon: CalendarPlus, label: "Pedir" },
  { href: "/app/orders", icon: Package, label: "Pedidos" },
  { href: "/app/subscription", icon: Star, label: "Plano" },
  { href: "/app/profile", icon: User, label: "Perfil" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/app/home") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-[#f8faf7]">
      <header className="sticky top-0 z-40 border-b border-[#e2e8df] bg-white/95 shadow-sm shadow-[#1f5d28]/5 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <Link
            href="/app/home"
            className="flex items-center rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6A2D]/30"
          >
            <Image
              src="/easyclean-logo.png"
              alt="Easy Clean"
              width={154}
              height={55}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full bg-[#eef8ea] px-3 py-1.5 text-xs font-bold text-[#2D6A2D] sm:flex">
              <Sparkles className="h-3.5 w-3.5" />
              Conta Easy Clean
            </span>
            <LanguageSelector />
            <Link
              href="/app/notifications"
              aria-label="Notificações"
              className="relative rounded-2xl border border-[#dcebd7] bg-white p-2.5 text-[#2D6A2D] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f3faf0]"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 pb-28">
        {children}
      </main>

      <nav className="safe-area-pb fixed bottom-0 left-0 right-0 z-40 border-t border-[#dcebd7] bg-white/95 shadow-[0_-14px_40px_rgba(31,93,40,0.12)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-2xl px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "flex flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-2 text-gray-400 transition",
                  active ? "bg-[#eef8ea] text-[#2D6A2D]" : "hover:bg-[#f8faf7] hover:text-[#2D6A2D]",
                ].join(" ")}
              >
                <span
                  className={[
                    "grid h-9 w-9 place-items-center rounded-2xl transition",
                    active ? "bg-[#2D6A2D] text-white shadow-lg shadow-[#2D6A2D]/25" : "bg-transparent",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-[11px] font-bold leading-none">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
