import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function SupportPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "Adicionar email";
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "Adicionar telefone";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/app/profile" className="text-sm text-gray-500">← Voltar</Link>
        <h1 className="text-lg font-bold text-gray-900">Suporte</h1>
      </div>

      <Card className="p-5">
        <p className="font-semibold text-gray-900">Contacto Easy Clean</p>
        <div className="mt-4 space-y-3 text-sm text-gray-600">
          <p>Email: {email}</p>
          <p>Telefone: {phone}</p>
          {whatsapp ? (
            <a className="inline-flex rounded-xl bg-[#25d366] px-4 py-2 font-semibold text-white" href={`https://wa.me/${whatsapp}`}>
              Abrir WhatsApp
            </a>
          ) : (
            <p className="text-xs text-gray-400">WhatsApp ainda não configurado.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
