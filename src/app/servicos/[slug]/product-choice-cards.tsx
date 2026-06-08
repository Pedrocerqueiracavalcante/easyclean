"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ShoppingBag, Sparkles } from "lucide-react";

type ProductChoice = {
  name: string;
  price: string;
  bestFor: string;
  note: string;
};

type ProductChoiceCardsProps = {
  products: readonly ProductChoice[];
  orderHref: string;
};

export function ProductChoiceCards({ products, orderHref }: ProductChoiceCardsProps) {
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.name ?? "");
  const selected = products.find((product) => product.name === selectedProduct) ?? products[0];
  const selectedHref = selected
    ? `${orderHref}&produto=${encodeURIComponent(selected.name)}`
    : orderHref;

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {products.map((product) => {
          const isSelected = selectedProduct === product.name;

          return (
            <button
              key={product.name}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedProduct(product.name)}
              className={`group rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-[#6ABF3C] focus:ring-offset-2 ${
                isSelected
                  ? "border-[#2D6A2D] bg-[#f2faee] shadow-lg shadow-[#1f5d28]/10 ring-2 ring-[#dcebd7]"
                  : "border-[#dcebd7] bg-white hover:-translate-y-0.5 hover:border-[#b9d9ad] hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition ${
                      isSelected ? "bg-[#2D6A2D] text-white" : "bg-[#eef8e8] text-[#2D6A2D] group-hover:bg-[#e2f4db]"
                    }`}
                  >
                    {isSelected ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-black leading-snug text-[#102316]">{product.name}</h4>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#2D6A2D]">{product.bestFor}</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-white px-3 py-1 text-sm font-black text-[#2D6A2D] ring-1 ring-[#dcebd7]">
                  {product.price}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#5f6f63]">{product.note}</p>
              <div className="mt-3 flex items-center justify-between border-t border-[#e2ecd8] pt-3">
                <span className="text-xs font-bold text-[#66736a]">Produto recomendado</span>
                <span className={`text-xs font-black uppercase tracking-widest ${isSelected ? "text-[#2D6A2D]" : "text-[#94a3b8]"}`}>
                  {isSelected ? "Escolhido" : "Escolher"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {selected ? (
        <div className="rounded-[24px] border border-[#cde5c4] bg-[#102316] p-4 text-white shadow-xl shadow-[#102316]/10">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#6ABF3C] text-[#102316]">
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#baf28e]">Selecionado</p>
              <h4 className="mt-1 font-black">{selected.name}</h4>
              <p className="mt-1 text-sm leading-6 text-white/72">{selected.bestFor}</p>
            </div>
          </div>
          <Link
            href={selectedHref}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#2D6A2D] transition hover:bg-[#f2faee]"
          >
            Pedir com este produto
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
