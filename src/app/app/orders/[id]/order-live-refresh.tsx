"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Radio } from "lucide-react";

export function OrderLiveRefresh() {
  const router = useRouter();
  const [lastSync, setLastSync] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLastSync(new Date());
      router.refresh();
    }, 30_000);

    return () => window.clearInterval(timer);
  }, [router]);

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-[#dcebd7] bg-white px-4 py-3 text-xs font-semibold text-[#2D6A2D] shadow-sm">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6ABF3C] opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#2D6A2D]" />
      </span>
      <Radio className="h-4 w-4" />
      <span className="flex-1">Acompanhamento automático ativo</span>
      <span className="text-gray-400">{lastSync.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}</span>
    </div>
  );
}
