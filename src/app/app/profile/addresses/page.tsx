import Link from "next/link";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { desc } from "drizzle-orm";
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
        <Link href="/app/profile" className="text-sm text-gray-500">← Voltar</Link>
        <h1 className="text-lg font-bold text-gray-900">Os meus Endereços</h1>
      </div>

      {rows.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="font-semibold text-gray-900">Nenhuma morada guardada.</p>
          <p className="mt-1 text-sm text-gray-500">Adiciona uma morada para fazer pedidos.</p>
          <Link href="/onboarding" className="mt-4 inline-flex">
            <Button>Adicionar morada</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {rows.map((address) => (
            <Card key={address.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900">{address.label}</p>
                  <p className="mt-1 text-sm text-gray-600">
                    {address.street} {address.number}{address.floor ? `, ${address.floor}` : ""}
                  </p>
                  <p className="text-sm text-gray-500">{address.postalCode} {address.city}</p>
                </div>
                {address.isDefault ? (
                  <span className="rounded-full bg-[#e8f5e0] px-2.5 py-1 text-xs font-semibold text-[#2D6A2D]">
                    Principal
                  </span>
                ) : null}
              </div>
            </Card>
          ))}
          <Link href="/onboarding" className="block">
            <Button variant="outline" className="w-full">Adicionar nova morada</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
