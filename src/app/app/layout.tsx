import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import { Bell, CalendarPlus, Home, Package, Star, User } from "lucide-react";

const navItems = [
  { href: "/app/home", icon: Home, label: "Início" },
  { href: "/app/order", icon: CalendarPlus, label: "Pedir" },
  { href: "/app/orders", icon: Package, label: "Pedidos" },
  { href: "/app/subscription", icon: Star, label: "Plano" },
  { href: "/app/profile", icon: User, label: "Perfil" },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8faf7]">
      <header className="sticky top-0 z-40 border-b border-[#e2e8df] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
          <Link href="/app/home" className="flex items-center">
            <Image
              src="/easyclean-logo.png"
              alt="Easy Clean"
              width={154}
              height={55}
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>
          <Link
            href="/app/notifications"
            aria-label="Notificações"
            className="relative rounded-xl p-2 text-[#2D6A2D] transition-colors hover:bg-[#f8faf7]"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 pb-24">
        {children}
      </main>

      <nav className="safe-area-pb fixed bottom-0 left-0 right-0 z-40 border-t border-[#e2e8df] bg-white">
        <div className="mx-auto flex max-w-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-1 flex-col items-center gap-1 py-3 text-gray-400 transition-colors hover:text-[#2D6A2D]"
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
