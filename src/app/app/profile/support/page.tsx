import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function SupportPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "Adicionar email";
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "Adicionar telefone";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/app/profile" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-500 ring-1 ring-[#e2e8df]">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2D6A2D]">Ajuda</p>
          <h1 className="text-xl font-black text-gray-900">Suporte</h1>
        </div>
      </div>

      <Card className="p-5">
        <p className="font-bold text-gray-900">Contacto Easy Clean</p>
        <p className="mt-1 text-sm text-gray-500">Escolhe o canal mais prático para falar connosco.</p>
        <div className="mt-5 space-y-3 text-sm">
          <a href={`mailto:${email}`} className="flex items-center gap-3 rounded-2xl border border-[#e2e8df] p-4 transition-colors hover:border-[#6ABF3C]">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef8e8] text-[#2D6A2D]">
              <Mail className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold text-gray-900">Email</span>
              <span className="block truncate text-gray-500">{email}</span>
            </span>
          </a>
          <a href={`tel:${phone}`} className="flex items-center gap-3 rounded-2xl border border-[#e2e8df] p-4 transition-colors hover:border-[#6ABF3C]">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef8e8] text-[#2D6A2D]">
              <Phone className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold text-gray-900">Telefone</span>
              <span className="block truncate text-gray-500">{phone}</span>
            </span>
          </a>
          {whatsapp ? (
            <a href={`https://wa.me/${whatsapp}`} className="flex items-center gap-3 rounded-2xl bg-[#25d366] p-4 font-semibold text-white shadow-sm">
              <MessageCircle className="h-5 w-5" />
              Abrir WhatsApp
            </a>
          ) : (
            <p className="rounded-2xl bg-[#f8faf7] px-4 py-3 text-xs text-gray-400">WhatsApp ainda não configurado.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
