"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";

type ProductChoice = {
  name: string;
  price: string;
  bestFor: string;
  note: string;
};

type ProductChoiceCardsProps = {
  products: readonly ProductChoice[];
};

export function ProductChoiceCards({ products }: ProductChoiceCardsProps) {
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.name ?? "");

  return (
    <div className="grid gap-3">
      {products.map((product) => {
        const selected = selectedProduct === product.name;

        return (
          <button
            key={product.name}
            type="button"
            onClick={() => setSelectedProduct(product.name)}
            className={`group rounded-2xl border p-4 text-left transition ${
              selected
                ? "border-[#2D6A2D] bg-[#f2faee] shadow-lg shadow-[#1f5d28]/10 ring-2 ring-[#dcebd7]"
                : "border-[#dcebd7] bg-white hover:-translate-y-0.5 hover:border-[#b9d9ad] hover:shadow-md"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition ${
                    selected ? "bg-[#2D6A2D] text-white" : "bg-[#eef8e8] text-[#2D6A2D] group-hover:bg-[#e2f4db]"
                  }`}
                >
                  {selected ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
                </span>
                <div>
                  <h4 className="font-black text-[#102316]">{product.name}</h4>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#2D6A2D]">{product.bestFor}</p>
                </div>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-[#2D6A2D] ring-1 ring-[#dcebd7]">
                {product.price}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#5f6f63]">{product.note}</p>
            <div className="mt-3 flex items-center justify-between border-t border-[#e2ecd8] pt-3">
              <span className="text-xs font-bold text-[#66736a]">Produto recomendado</span>
              <span className={`text-xs font-black uppercase tracking-widest ${selected ? "text-[#2D6A2D]" : "text-[#94a3b8]"}`}>
                {selected ? "Escolhido" : "Escolher"}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
