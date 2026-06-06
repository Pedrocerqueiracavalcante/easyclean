"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type OrderRatingProps = {
  orderId: string;
};

export function OrderRating({ orderId }: OrderRatingProps) {
  const storageKey = `easyclean:rating:${orderId}`;
  const [rating, setRating] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = Number(window.localStorage.getItem(storageKey) || "0");
    if (stored > 0) {
      window.setTimeout(() => {
        setRating(stored);
        setSaved(true);
      }, 0);
    }
  }, [storageKey]);

  function saveRating() {
    if (rating <= 0) return;
    window.localStorage.setItem(storageKey, String(rating));
    setSaved(true);
  }

  return (
    <Card className="border-[#dcebd7]">
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-gray-900">Como foi o serviço?</p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              A tua avaliação ajuda a melhorar a recolha, lavagem e entrega.
            </p>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setRating(value);
                  setSaved(false);
                }}
                className="rounded-xl p-1 text-[#2D6A2D] transition hover:bg-[#eef8e8]"
                aria-label={`Avaliar ${value} estrela${value > 1 ? "s" : ""}`}
              >
                <Star className={`h-7 w-7 ${rating >= value ? "fill-[#6ABF3C]" : "fill-transparent"}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold text-[#2D6A2D]">
            {saved ? "Avaliação guardada. Obrigado." : rating > 0 ? `${rating}/5 selecionado` : "Seleciona uma nota."}
          </p>
          <Button type="button" size="sm" onClick={saveRating} disabled={rating <= 0 || saved}>
            Guardar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
