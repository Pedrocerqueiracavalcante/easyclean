export const orderServices = [
  { id: "wash", name: "Lavagem", price: 4 },
  { id: "iron", name: "Passagem a ferro", price: 2 },
  { id: "dry", name: "Limpeza a seco", price: 8 },
  { id: "bed", name: "Roupas de cama", price: 6 },
  { id: "shoes", name: "Calçado", price: 5 },
  { id: "bag", name: "Saco completo", price: 29 },
] as const;

export type OrderServiceId = (typeof orderServices)[number]["id"];
export type OrderQuantities = Partial<Record<OrderServiceId | string, number>>;

export function calculateOrderTotal(items: OrderQuantities) {
  return Object.entries(items).reduce((acc, [id, qty]) => {
    const service = orderServices.find((item) => item.id === id);
    const quantity = Number(qty);

    if (!service || !Number.isFinite(quantity) || quantity <= 0) {
      return acc;
    }

    return acc + service.price * quantity;
  }, 0);
}

export function buildOrderCheckoutLineItems(items: OrderQuantities) {
  return Object.entries(items)
    .map(([id, qty]) => {
      const service = orderServices.find((item) => item.id === id);
      const quantity = Number(qty);

      if (!service || !Number.isFinite(quantity) || quantity <= 0) {
        return null;
      }

      return {
        price_data: {
          currency: "eur",
          product_data: { name: service.name },
          unit_amount: Math.round(service.price * 100),
        },
        quantity,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}
