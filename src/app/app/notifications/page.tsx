import Link from "next/link";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { desc } from "drizzle-orm";
import { Card } from "@/components/ui/card";
import { getDb } from "@/lib/db";
import { notifications } from "@/lib/db/schema";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const { env } = await getCloudflareContext({ async: true });
  const db = getDb(env.DB);
  const rows = await db.query.notifications.findMany({
    orderBy: desc(notifications.createdAt),
    limit: 30,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/app/home" className="text-sm text-gray-500">← Voltar</Link>
        <h1 className="text-lg font-bold text-gray-900">Notificações</h1>
      </div>

      {rows.length === 0 ? (
        <Card className="p-6 text-center text-sm text-gray-500">
          Ainda não há notificações.
        </Card>
      ) : (
        <div className="space-y-3">
          {rows.map((item) => (
            <Card key={item.id} className="p-4">
              <p className="font-semibold text-gray-900">{item.title}</p>
              <p className="mt-1 text-sm text-gray-600">{item.body}</p>
              <p className="mt-2 text-xs text-gray-400">{formatDateTime(item.createdAt)}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
