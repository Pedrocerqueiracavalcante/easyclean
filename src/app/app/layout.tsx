import Link from "next/link";
import { type ReactNode } from "react";

const navItems = [
  { href: "/app/home", icon: "🏠", label: "Início" },
  { href: "/app/order", icon: "🧺", label: "Pedir" },
  { href: "/app/orders", icon: "📦", label: "Pedidos" },
  { href: "/app/subscription", icon: "⭐", label: "Plano" },
  { href: "/app/profile", icon: "👤", label: "Perfil" },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8faf7] flex flex-col">
      {/* Top header */}
      <header className="bg-white border-b border-[#e2e8df] sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/app/home" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#2D6A2D] flex items-center justify-center text-white font-bold text-xs">E</div>
            <span className="font-bold text-[#2D6A2D]">Easy Clean</span>
          </Link>
          <Link href="/app/notifications" className="relative p-2 rounded-xl hover:bg-[#f8faf7] transition-colors">
            <span className="text-lg">🔔</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </Link>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 pb-24">
        {children}
      </main>

      {/* Bottom nav (mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e2e8df] z-40 safe-area-pb">
        <div className="max-w-2xl mx-auto flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center gap-0.5 py-3 text-gray-400 hover:text-[#2D6A2D] transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
