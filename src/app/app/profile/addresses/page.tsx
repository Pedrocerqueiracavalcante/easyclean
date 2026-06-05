import Link from "next/link";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { desc } from "drizzle-orm";
import { ArrowLeft, CheckCircle2, Home, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getDb } from "@/lib/db";
import { addresses } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export default async function ProfileAddressesPage() {
  const { env } = await getCloudflareContext({ async: true });
  const db = getDb(env.DB);
  const rows = await db.query.addresses.findMany({
    orderBy: desc(addresses.createdAt),
    limit: 20,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/app/profile" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-500 ring-1 ring-[#e2e8df]">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2D6A2D]">Moradas</p>
          <h1 className="text-xl font-black text-gray-900">As minhas moradas</h1>
        </div>
      </div>

      {rows.length === 0 ? (
        <Card className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef8e8] text-[#2D6A2D]">
            <MapPin className="h-7 w-7" />
          </div>
          <p className="font-bold text-gray-900">Nenhuma morada guardada</p>
          <p className="mt-1 text-sm leading-6 text-gray-500">Adiciona uma morada para fazer pedidos com recolha.</p>
          <Link href="/onboarding" className="mt-4 inline-flex">
            <Button>
              <Plus className="h-4 w-4" />
              Adicionar morada
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {rows.map((address) => (
            <Card key={address.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef8e8] text-[#2D6A2D]">
                  <Home className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold text-gray-900">{address.label}</p>
                    {address.isDefault ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f5e0] px-2.5 py-1 text-xs font-semibold text-[#2D6A2D]">
                        <CheckCircle2 className="h-3 w-3" />
                        Principal
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {address.street} {address.number}{address.floor ? `, ${address.floor}` : ""}
                  </p>
                  <p className="text-sm text-gray-500">{address.postalCode} {address.city}</p>
                </div>
              </div>
            </Card>
          ))}
          <Link href="/onboarding" className="block">
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4" />
              Adicionar nova morada
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
