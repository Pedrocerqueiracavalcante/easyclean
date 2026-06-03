import Link from "next/link";
import { type ReactNode } from "react";

const navItems = [
  { href: "/admin", icon: "📊", label: "Dashboard" },
  { href: "/admin/orders", icon: "📦", label: "Pedidos" },
  { href: "/admin/clients", icon: "👥", label: "Clientes" },
  { href: "/admin/staff", icon: "👷", label: "Equipa" },
  { href: "/admin/reports", icon: "📈", label: "Relatórios" },
  { href: "/admin/settings", icon: "⚙️", label: "Definições" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8faf7] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-[#e2e8df] flex flex-col fixed h-full z-30 hidden md:flex">
        <div className="p-5 border-b border-[#e2e8df]">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2D6A2D] flex items-center justify-center text-white font-bold text-sm">E</div>
            <div>
              <p className="font-bold text-[#2D6A2D] text-sm">Easy Clean</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-[#f0f7ec] hover:text-[#2D6A2D] transition-colors mb-0.5">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#e2e8df]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#e8f5e0] flex items-center justify-center text-[#2D6A2D] font-bold text-xs">A</div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">Admin</p>
              <p className="text-xs text-gray-400 truncate">admin@easyclean.lu</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 md:ml-56">
        <header className="bg-white border-b border-[#e2e8df] h-14 flex items-center justify-between px-6 sticky top-0 z-20">
          <h1 className="text-sm font-semibold text-gray-900">Painel de Administração</h1>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-600">Ver site →</Link>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
