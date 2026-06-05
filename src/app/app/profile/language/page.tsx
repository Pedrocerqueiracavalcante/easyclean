import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function LanguagePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/app/profile" className="text-sm text-gray-500">← Voltar</Link>
        <h1 className="text-lg font-bold text-gray-900">Idioma</h1>
      </div>

      <Card className="p-5 text-sm text-gray-600">
        O idioma da página inicial pode ser alterado pelo seletor de bandeiras no topo do site.
      </Card>
    </div>
  );
}
