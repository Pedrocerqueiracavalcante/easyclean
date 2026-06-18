"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ShoppingBag } from "lucide-react";

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
    <div className="space-y-3">
      <div className="grid gap-2.5">
        {products.map((product) => {
          const isSelected = selectedProduct === product.name;

          return (
            <button
              key={product.name}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedProduct(product.name)}
              className={`group rounded-[22px] border p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-[#6ABF3C] focus:ring-offset-2 ${
                isSelected
                  ? "border-[#2D6A2D] bg-[#f2faee] shadow-md shadow-[#1f5d28]/8 ring-1 ring-[#b9d9ad]"
                  : "border-[#dcebd7] bg-white hover:-translate-y-0.5 hover:border-[#b9d9ad] hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition ${
                      isSelected ? "bg-[#2D6A2D] text-white" : "bg-[#eef8e8] text-[#2D6A2D] group-hover:bg-[#e2f4db]"
                    }`}
                  >
                    {isSelected ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-black leading-snug text-[#102316]">{product.name}</h4>
                    <p className="mt-1 line-clamp-1 text-sm text-[#5f6f63]">{product.bestFor}</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-white px-3 py-1 text-sm font-black text-[#2D6A2D] ring-1 ring-[#dcebd7]">
                  {product.price}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#edf4ea] pt-3">
                <p className="line-clamp-1 text-xs leading-5 text-[#5f6f63]">{product.note}</p>
                <span className={`shrink-0 text-[11px] font-black uppercase tracking-widest ${isSelected ? "text-[#2D6A2D]" : "text-[#94a3b8]"}`}>
                  {isSelected ? "Selecionado" : "Escolher"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {selected ? (
        <div className="rounded-[22px] border border-[#cde5c4] bg-[#f7fbf4] p-3 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2D6A2D]">Selecionado</p>
              <h4 className="truncate font-black text-[#102316]">{selected.name}</h4>
            </div>
            <span className="shrink-0 rounded-full bg-white px-3 py-1 text-sm font-black text-[#2D6A2D] ring-1 ring-[#dcebd7]">
              {selected.price}
            </span>
          </div>
          <p className="mb-3 line-clamp-1 text-sm text-[#5f6f63]">{selected.bestFor}</p>
          <Link
            href={selectedHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2D6A2D] px-4 py-3 text-sm font-black text-white shadow-lg shadow-[#2d6a2d]/15 transition hover:bg-[#245f2f]"
          >
            Pedir com este produto
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
