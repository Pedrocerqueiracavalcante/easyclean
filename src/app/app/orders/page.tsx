import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ORDER_STATUS_LABELS } from "@/lib/utils";

const mockOrders = [
  { id: "abc123", status: "washing", date: "2 Jun 2025", items: "8 kg lavagem + ferro", total: 28 },
  { id: "def456", status: "delivered", date: "28 Mai 2025", items: "5 kg lavagem", total: 20 },
  { id: "ghi789", status: "delivered", date: "15 Mai 2025", items: "Saco completo", total: 29 },
  { id: "jkl012", status: "cancelled", date: "3 Mai 2025", items: "3 kg lavagem", total: 12 },
];

const badgeVariant: Record<string, "green" | "blue" | "yellow" | "gray" | "purple" | "red"> = {
  pending: "yellow",
  confirmed: "blue",
  washing: "blue",
  ready: "green",
  delivered: "green",
  cancelled: "gray",
  pickup_scheduled: "purple",
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold text-gray-900">Os meus Pedidos</h1>

      <div className="space-y-3">
        {mockOrders.map((order) => (
          <Link key={order.id} href={`/app/orders/${order.id}`}>
            <Card className="p-4 hover:border-[#6ABF3C] transition-colors active:scale-[0.99]">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono text-gray-400">#{order.id.toUpperCase()}</span>
                    <Badge variant={badgeVariant[order.status] ?? "gray"}>
                      {ORDER_STATUS_LABELS[order.status] ?? order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{order.items}</p>
                  <p className="text-xs text-gray-400 mt-1">{order.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">€{order.total}</p>
                  <p className="text-xs text-gray-400 mt-1">Ver →</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
